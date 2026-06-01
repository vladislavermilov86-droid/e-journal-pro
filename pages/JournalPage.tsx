
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Send, Users, FileSpreadsheet, Calendar
} from 'lucide-react';
import { Class, Subject, Student, Lesson, GradeCell, Quarter, AttendanceStatus, LessonType } from '../types.ts';
import { QuarterMark } from '../App.tsx';
import { LESSON_TYPE_COLORS, getQuarterMarkColor, getPercentageColor } from '../constants.ts';
import GradeCellComponent from '../components/GradeCell.tsx';
import SignatureCell from '../components/SignatureCell.tsx';
import LessonModal from '../components/LessonModal.tsx';

interface JournalPageProps {
  classes: Class[];
  subjects: Subject[];
  students: Student[];
  lessons: Lesson[];
  grades: GradeCell[];
  quarters: Quarter[];
  quarterMarks: QuarterMark[];
  setLessons: React.Dispatch<React.SetStateAction<Lesson[]>>;
  setGrades: React.Dispatch<React.SetStateAction<GradeCell[]>>;
  setQuarterMarks: React.Dispatch<React.SetStateAction<QuarterMark[]>>;
  onGradeUpdate?: (grade: GradeCell) => Promise<void>;
  onQuarterMarkUpdate?: (mark: QuarterMark) => Promise<void>;
  onLessonSave?: (lesson: Lesson, isDelete?: boolean) => Promise<void>;
}

const JournalPage: React.FC<JournalPageProps> = ({ 
  classes, subjects, students, lessons, grades, quarters, quarterMarks, 
  setLessons, setGrades, setQuarterMarks,
  onGradeUpdate, onQuarterMarkUpdate, onLessonSave
}) => {
  const navigate = useNavigate();
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [selectedQuarterId, setSelectedQuarterId] = useState<string>('');
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });

  // Инициализация класса и предмета при загрузке
  useEffect(() => {
    if (!selectedClassId && classes.length > 0) {
      setSelectedClassId(classes[0].id);
    }
    if (!selectedSubjectId && subjects.length > 0) {
      setSelectedSubjectId(subjects[0].id);
    }
  }, [classes, subjects, selectedClassId, selectedSubjectId]);

  // Строгая логика переключения четверти при смене предмета
  useEffect(() => {
    // Находим все четверти для текущего выбранного предмета
    const relevantQuarters = quarters.filter(q => q.subjectId === selectedSubjectId);
    
    // Проверяем, валидна ли текущая выбранная четверть для этого предмета
    const isCurrentQuarterValid = relevantQuarters.some(q => q.id === selectedQuarterId);

    if (!isCurrentQuarterValid) {
      if (relevantQuarters.length > 0) {
        // Если есть четверти для этого предмета, выбираем первую (или текущую по дате, если усложнить)
        setSelectedQuarterId(relevantQuarters[0].id);
      } else {
        // Если четвертей нет, сбрасываем выбор
        setSelectedQuarterId('');
      }
    }
  }, [selectedSubjectId, quarters, selectedQuarterId]);

  // Глобальные слушатели для надежного панорамирования
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isPanning || !scrollContainerRef.current) return;
      
      const dx = e.clientX - panStartRef.current.x;
      const dy = e.clientY - panStartRef.current.y;

      scrollContainerRef.current.scrollLeft = panStartRef.current.scrollLeft - dx;
      scrollContainerRef.current.scrollTop = panStartRef.current.scrollTop - dy;
    };

    const handleGlobalMouseUp = (e: MouseEvent) => {
      if (e.button === 2 || isPanning) {
        setIsPanning(false);
      }
    };

    if (isPanning) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isPanning]);

  const filteredStudents = useMemo(() => 
    students.filter(s => s.classId === selectedClassId), 
    [students, selectedClassId]
  );

  const activeQuarter = useMemo(() => 
    quarters.find(q => q.id === selectedQuarterId),
    [quarters, selectedQuarterId]
  );

  const filteredLessons = useMemo(() => {
    let list = lessons.filter(l => l.classId === selectedClassId && l.subjectId === selectedSubjectId);
    if (activeQuarter) {
      list = list.filter(l => l.date >= activeQuarter.startDate && l.date <= activeQuarter.endDate);
    }
    return list.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [lessons, selectedClassId, selectedSubjectId, activeQuarter]);

  const handleUpdateGrade = async (lessonId: string, studentId: string, points: number | null, attendance: AttendanceStatus, attendanceNote?: string, comment?: string, signature?: string | null) => {
    const existingIdx = grades.findIndex(g => g.lessonId === lessonId && g.studentId === studentId);
    
    // Preserve existing signature if not specifically overwritten
    let finalSignature = signature;
    if (signature === undefined && existingIdx !== -1) {
      finalSignature = grades[existingIdx].signature || null;
    }

    const newGrade: GradeCell = {
      id: existingIdx !== -1 ? grades[existingIdx].id : `g-${lessonId}-${studentId}`,
      lessonId,
      studentId,
      points,
      attendance,
      attendanceNote,
      comment,
      signature: finalSignature || undefined
    };
    
    setGrades(prev => {
      if (existingIdx !== -1) {
        const next = [...prev];
        next[existingIdx] = newGrade;
        return next;
      }
      return [...prev, newGrade];
    });

    if (onGradeUpdate) {
      await onGradeUpdate(newGrade);
    }
  };

  const handleUpdateQuarterMark = async (studentId: string, mark: string, isExam: boolean = false) => {
    if (!selectedQuarterId) return;
    
    const markValue = parseInt(mark) || null;
    const existingIdx = quarterMarks.findIndex(qm => qm.quarterId === selectedQuarterId && qm.studentId === studentId);
    const existingMark = existingIdx !== -1 ? quarterMarks[existingIdx] : null;
    
    const newMark: QuarterMark = {
      id: existingMark ? existingMark.id : `qm-${selectedQuarterId}-${studentId}`,
      quarterId: selectedQuarterId,
      studentId,
      mark: isExam ? (existingMark?.mark ?? null) : markValue,
      examMark: isExam ? markValue : (existingMark?.examMark ?? null)
    };

    setQuarterMarks(prev => {
      if (existingIdx !== -1) {
        const next = [...prev];
        next[existingIdx] = newMark;
        return next;
      }
      return [...prev, newMark];
    });

    if (onQuarterMarkUpdate) {
      await onQuarterMarkUpdate(newMark);
    }
  };

  const handleUpdateLessonSignature = async (lesson: Lesson, signature: string | null) => {
    const updatedLesson = { ...lesson, signature: signature || undefined };
    setLessons(prev => prev.map(l => l.id === lesson.id ? updatedLesson : l));
    if (onLessonSave) {
      await onLessonSave(updatedLesson, false);
    }
  };

  const calculateFinalStats = (studentId: string) => {
    // Если четверть не выбрана (например, для нового предмета их еще нет), возвращаем нули
    if (!selectedQuarterId) {
      return { foPercent: 0, summativePercent: 0, totalPercent: 0, manualMark: null };
    }

    const studentGrades = grades.filter(g => g.studentId === studentId);
    const quarterLessonIds = filteredLessons.map(l => l.id);
    const quarterGrades = studentGrades.filter(g => quarterLessonIds.includes(g.lessonId));

    let summativePoints = 0;
    const summativeLessons = filteredLessons.filter(l => l.type === LessonType.SOR || l.type === LessonType.SOCH);
    summativeLessons.forEach(l => {
      const g = quarterGrades.find(grade => grade?.lessonId === l.id);
      if (g && g.points !== null && g.attendance === AttendanceStatus.PRESENT) {
        summativePoints += g.points;
      }
    });

    const formativeLessons = filteredLessons.filter(l => 
      l.type !== LessonType.SOR && l.type !== LessonType.SOCH
    );
    
    const foGradesWithPoints = formativeLessons
      .map(l => quarterGrades.find(g => g?.lessonId === l.id))
      .filter(g => g && g.points !== null && g.attendance === AttendanceStatus.PRESENT);

    let foContribution = 0;
    if (foGradesWithPoints.length >= 4) {
      const sumFO = foGradesWithPoints.reduce((acc, g) => acc + (g?.points ?? 0), 0);
      const avgFO = sumFO / foGradesWithPoints.length;
      foContribution = Math.round(avgFO); 
    }

    const totalPercent = Math.min(100, summativePoints + foContribution);
    
    // Ищем оценку конкретно для ТЕКУЩЕЙ выбранной четверти
    const qm = quarterMarks.find(qm => qm.studentId === studentId && qm.quarterId === selectedQuarterId);
    const manualMark = qm?.mark;
    const examMark = qm?.examMark;

    return { foPercent: foContribution, summativePercent: summativePoints, totalPercent, manualMark, examMark };
  };

  const exportToExcel = () => {
    const XLSX = (window as any).XLSX;
    if (!XLSX) return;
    try {
      const data = filteredStudents.map((student, idx) => {
        const row: any = { '#': idx + 1, 'Ученик': `${student.lastName} ${student.firstName}` };
        filteredLessons.forEach(lesson => {
          const g = grades.find(gr => gr.lessonId === lesson.id && gr.studentId === student.id);
          const dateStr = new Date(lesson.date).toLocaleDateString('ru-RU');
          let val = '';
          if (g) {
            if (g.attendance === AttendanceStatus.ABSENT) val = 'Н';
            else if (g.attendance === AttendanceStatus.EXCUSED) val = 'П';
            else if (g.points !== null) val = g.points.toString();
          }
          row[dateStr] = val;
        });
        const stats = calculateFinalStats(student.id);
        row['Итог %'] = `${stats.totalPercent}%`;
        row['Оценка'] = stats.manualMark || '';
        if (filteredLessons.some(l => l.type === LessonType.EXAM)) {
          row['Итог экзамена'] = stats.examMark || '';
        }
        return row;
      });
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Журнал");
      XLSX.writeFile(wb, `Journal_${selectedClassId}_${selectedSubjectId}.xlsx`);
    } catch (err) { console.error(err); }
  };

  const handleSaveLesson = async (lessonData: Partial<Lesson>) => {
    let targetLesson: Lesson;
    if (editingLesson) {
      targetLesson = { ...editingLesson, ...lessonData } as Lesson;
      setLessons(prev => prev.map(l => l.id === editingLesson.id ? targetLesson : l));
    } else {
      targetLesson = {
        id: Math.random().toString(36).substr(2, 9),
        classId: selectedClassId,
        subjectId: selectedSubjectId,
        date: lessonData.date || new Date().toISOString().split('T')[0],
        topic: lessonData.topic || '',
        homework: lessonData.homework || '',
        type: (lessonData.type as LessonType) || LessonType.NORMAL,
        maxPoints: lessonData.maxPoints || 10
      };
      setLessons(prev => [...prev, targetLesson]);
    }

    if (onLessonSave) {
      await onLessonSave(targetLesson);
    }
    setIsLessonModalOpen(false);
  };

  const handleDeleteLesson = async (id: string) => {
    const lesson = lessons.find(l => l.id === id);
    if (lesson && onLessonSave) {
      setLessons(prev => prev.filter(l => l.id !== id));
      await onLessonSave(lesson, true);
    }
    setIsLessonModalOpen(false);
  };

  const getSmartDefaultDate = () => {
    if (!activeQuarter) return new Date().toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];
    if (today >= activeQuarter.startDate && today <= activeQuarter.endDate) return today;
    return activeQuarter.endDate;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 2) { // Правая кнопка
      e.preventDefault();
      if (scrollContainerRef.current) {
        setIsPanning(true);
        panStartRef.current = {
          x: e.clientX,
          y: e.clientY,
          scrollLeft: scrollContainerRef.current.scrollLeft,
          scrollTop: scrollContainerRef.current.scrollTop
        };
      }
    }
  };

  const regularLessons = useMemo(() => filteredLessons.filter(l => l.type !== LessonType.EXAM), [filteredLessons]);
  const examLessons = useMemo(() => filteredLessons.filter(l => l.type === LessonType.EXAM), [filteredLessons]);
  const hasExam = examLessons.length > 0;

  return (
    <div className={`space-y-4 h-full flex flex-col overflow-hidden ${isPanning ? 'panning-active' : ''}`}>
      <div className="flex flex-wrap justify-between items-center gap-4 bg-white p-4 rounded-3xl shadow-sm border border-slate-100 shrink-0">
        <div className="flex items-center gap-4">
          <div className="space-y-0.5">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Класс</label>
            <select value={selectedClassId} onChange={(e) => setSelectedClassId(e.target.value)} className="bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-black text-slate-700 outline-none hover:bg-slate-100 transition-colors cursor-pointer">
              {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="space-y-0.5">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Предмет</label>
            <select value={selectedSubjectId} onChange={(e) => setSelectedSubjectId(e.target.value)} className="bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-black text-slate-700 outline-none hover:bg-slate-100 transition-colors cursor-pointer">
              {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div className="space-y-0.5">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Четверть</label>
            <select value={selectedQuarterId} onChange={(e) => setSelectedQuarterId(e.target.value)} className="bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-black text-slate-700 outline-none hover:bg-slate-100 transition-colors cursor-pointer">
              {quarters.filter(q => q.subjectId === selectedSubjectId).length === 0 && <option value="">Нет четвертей</option>}
              {quarters.filter(q => q.subjectId === selectedSubjectId).map(q => <option key={q.id} value={q.id}>{q.name}</option>)}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={exportToExcel} className="p-2 bg-slate-50 text-slate-500 hover:text-green-600 rounded-xl transition-all border border-slate-100">
            <FileSpreadsheet size={18} />
          </button>
          <button onClick={() => { setEditingLesson(null); setIsLessonModalOpen(true); }} className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center gap-2">
            <Plus size={16} />
            Новый урок
          </button>
        </div>
      </div>

      <div 
        className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden flex-1 relative"
        onContextMenu={(e) => e.preventDefault()}
      >
        <div 
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          className={`w-full h-full overflow-auto panning-container ${isPanning ? '' : 'scroll-smooth'}`}
        >
          {filteredLessons.length > 0 || filteredStudents.length > 0 ? (
            <table 
              className="border-collapse table-fixed" 
              style={{ width: `${220 + 90 + 100 + (regularLessons.length * 120) + (examLessons.length * 120) + (hasExam ? 100 : 0)}px` }}
            >
              <thead>
                <tr className="bg-slate-50/70 journal-header-row">
                  <th className="sticky left-0 z-30 bg-white border-b-2 border-r-2 border-slate-100 p-4 text-left w-[220px] min-w-[220px] max-w-[220px] shadow-[8px_0_12px_-8px_rgba(0,0,0,0.05)]">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Ученики</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase">Всего: {filteredStudents.length}</span>
                    </div>
                  </th>
                  {regularLessons.map(lesson => (
                    <th key={lesson.id} onClick={() => { setEditingLesson(lesson); setIsLessonModalOpen(true); }} className={`border-b-2 border-r border-slate-100 p-3 text-left w-[120px] min-w-[120px] max-w-[120px] cursor-pointer hover:bg-white transition-all group ${LESSON_TYPE_COLORS[lesson.type]}`}>
                      <div className="flex flex-col gap-1.5 h-full overflow-hidden w-full">
                        <div className="flex justify-between items-center w-full">
                          <span className="text-sm font-black text-slate-800 shrink-0">{new Date(lesson.date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })}</span>
                          <span className="text-[8px] font-black bg-white/80 px-1.5 py-0.5 rounded border border-slate-200 truncate ml-1">{lesson.type}</span>
                        </div>
                        <div className="text-[9px] font-medium italic text-slate-500 line-clamp-2 leading-tight h-6 w-full overflow-hidden">{lesson.topic || '...'}</div>
                        <div className="text-[8px] text-slate-400 font-bold bg-white/40 p-1 rounded-md border border-slate-200/50 mt-auto truncate w-full block" title={lesson.homework || ''}>ДЗ: {lesson.homework || '—'}</div>
                      </div>
                    </th>
                  ))}
                  <th className="bg-slate-900 border-b-2 border-black p-4 w-[100px] min-w-[100px] max-w-[100px] text-center shadow-[-8px_0_12px_-8px_rgba(0,0,0,0.2)]">
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/40 block">Итог %</span>
                  </th>
                  <th className="bg-indigo-600 border-b-2 border-indigo-700 p-4 w-[90px] min-w-[90px] max-w-[90px] text-center">
                    <span className="text-[9px] font-black uppercase tracking-widest text-white block">Балл</span>
                  </th>
                  {examLessons.map(lesson => (
                    <th key={lesson.id} className={`border-b-2 border-r border-slate-100 p-1 min-w-[120px] w-[120px] max-w-[120px] ${LESSON_TYPE_COLORS[lesson.type]} border-b-red-500 relative group`}>
                      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => { setEditingLesson(lesson); setIsLessonModalOpen(true); }} className="p-1 bg-white rounded shadow text-slate-500 hover:text-indigo-600">✎</button>
                      </div>
                      <div className="flex flex-col gap-1 h-full overflow-hidden w-full items-center justify-start p-1">
                        <span className="text-xs font-black text-red-600 uppercase tracking-widest text-center mt-1">{lesson.type}</span>
                        <div className="text-[9px] font-bold bg-white/60 text-red-500 px-1 py-0.5 rounded border border-red-200 truncate w-full text-center block mb-1" title={lesson.topic || ''}>{lesson.topic || 'Без темы'}</div>
                        <div className="mt-auto w-full h-[40px]">
                           <SignatureCell 
                             signature={lesson.signature}
                             onSave={(sig) => handleUpdateLessonSignature(lesson, sig)}
                           />
                        </div>
                      </div>
                    </th>
                  ))}
                  {hasExam && (
                    <th className="bg-amber-50 border-b-2 border-amber-200 p-4 w-[100px] min-w-[100px] max-w-[100px] text-center">
                      <span className="text-[9px] font-black uppercase tracking-widest text-amber-700 block">Итог экзамена</span>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(student => {
                  const stats = calculateFinalStats(student.id);
                  return (
                    <tr key={student.id} className="hover:bg-slate-50/50 transition-colors journal-row group">
                      <td className="sticky left-0 z-20 bg-white border-b border-r-2 border-slate-100 px-4 py-0 shadow-[8px_0_12px_-8px_rgba(0,0,0,0.05)] w-[220px] min-w-[220px] max-w-[220px]">
                        <div className="flex items-center gap-3 h-full">
                          <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shrink-0">
                            <Users size={14} />
                          </div>
                          <div className="flex flex-col justify-center min-w-0">
                            <span className="text-[13px] font-black text-slate-800 truncate">{student.lastName}</span>
                            <span className="text-[10px] font-bold text-slate-400 truncate -mt-1">{student.firstName}</span>
                          </div>
                          <button 
                            onClick={() => navigate('/messages', { state: { targetId: student.id, type: 'student' } })}
                            className="ml-auto opacity-0 group-hover:opacity-100 text-indigo-500 hover:scale-110 transition-all p-1 rounded-lg shrink-0 cursor-pointer"
                          >
                            <Send size={12} />
                          </button>
                        </div>
                      </td>
                      {regularLessons.map(lesson => {
                        const grade = grades.find(g => g.lessonId === lesson.id && g.studentId === student.id);
                        return (
                          <GradeCellComponent 
                            key={`${student.id}-${lesson.id}`}
                            grade={grade}
                            lesson={lesson}
                            onUpdate={(p, a, n, c) => handleUpdateGrade(lesson.id, student.id, p, a, n, c)}
                          />
                        );
                      })}
                      <td className="bg-slate-50 border-b border-slate-100 p-0 text-center shadow-[-8px_0_12px_-8px_rgba(0,0,0,0.02)] h-full w-[100px] min-w-[100px] max-w-[100px]">
                        <div className="flex items-center justify-center h-full">
                          <span className={`text-base font-black tracking-tight ${getPercentageColor(stats.totalPercent)}`}>
                            {stats.totalPercent}%
                          </span>
                        </div>
                      </td>
                      <td className="bg-indigo-50/30 border-b border-r border-slate-100 p-0 text-center h-full w-[90px] min-w-[90px] max-w-[90px]">
                        <div className="flex items-center justify-center h-full">
                          <input 
                            type="text" 
                            value={stats.manualMark || ''} 
                            onChange={(e) => handleUpdateQuarterMark(student.id, e.target.value)}
                            placeholder=""
                            disabled={!selectedQuarterId}
                            className={`w-9 h-9 text-center text-base font-black rounded-lg border-2 outline-none transition-all ${!selectedQuarterId ? 'bg-slate-100 text-slate-300 border-transparent' : getQuarterMarkColor(stats.manualMark)}`}
                          />
                        </div>
                      </td>
                      {examLessons.map(lesson => {
                        const grade = grades.find(g => g.lessonId === lesson.id && g.studentId === student.id);
                        return (
                          <GradeCellComponent 
                            key={`${student.id}-${lesson.id}`}
                            grade={grade}
                            lesson={lesson}
                            onUpdate={(p, a, n, c) => handleUpdateGrade(lesson.id, student.id, p, a, n, c)}
                          />
                        );
                      })}
                      {hasExam && (
                        <td className="bg-amber-50/50 border-b border-r border-amber-100 p-0 text-center h-full w-[100px] min-w-[100px] max-w-[100px]">
                          <div className="flex items-center justify-center h-full">
                            <input 
                              type="text" 
                              value={stats.examMark || ''} 
                              onChange={(e) => handleUpdateQuarterMark(student.id, e.target.value, true)}
                              placeholder=""
                              disabled={!selectedQuarterId}
                              className={`w-9 h-9 text-center text-base font-black rounded-lg border-2 outline-none transition-all focus:bg-white focus:border-amber-400 ${!selectedQuarterId ? 'bg-slate-100 text-slate-300 border-transparent' : getQuarterMarkColor(stats.examMark)}`}
                            />
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 py-20">
               <Calendar size={48} className="mb-4 opacity-10" />
               <p className="font-bold">Уроки не найдены</p>
            </div>
          )}
        </div>
      </div>

      {isLessonModalOpen && (
        <LessonModal 
          lesson={editingLesson}
          defaultDate={getSmartDefaultDate()}
          onClose={() => setIsLessonModalOpen(false)}
          onSave={handleSaveLesson}
          onDelete={handleDeleteLesson}
        />
      )}
    </div>
  );
};

export default JournalPage;
