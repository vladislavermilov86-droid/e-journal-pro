
import React, { useState, useRef, useEffect } from 'react';
import { AttendanceStatus, GradeCell, Lesson } from '../types';
import { getGradeColor } from '../constants';
import { MessageSquare, AlertCircle } from 'lucide-react';

interface GradeCellProps {
  grade?: GradeCell;
  lesson: Lesson;
  onUpdate: (points: number | null, attendance: AttendanceStatus, note?: string, comment?: string) => void;
}

const GradeCellComponent: React.FC<GradeCellProps> = ({ grade, lesson, onUpdate }) => {
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [tempValue, setTempValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (grade) {
      if (grade.attendance === AttendanceStatus.ABSENT) setTempValue('Н');
      else if (grade.attendance === AttendanceStatus.EXCUSED) setTempValue('П');
      else if (grade.points !== null) setTempValue(grade.points.toString());
      else if (grade.attendanceNote) setTempValue('Б');
      else setTempValue('');
    } else {
      setTempValue('');
    }
  }, [grade]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    
    if (val === 'Н' || val === 'П' || val === 'Б') {
      setTempValue(val);
      setShowReasonModal(true);
      return;
    }

    const num = parseInt(val);
    if (!isNaN(num)) {
      if (num >= 0 && num <= lesson.maxPoints) {
        setTempValue(num.toString());
        onUpdate(num, AttendanceStatus.PRESENT, '', '');
      }
    } else if (val === '') {
      setTempValue('');
      onUpdate(null, AttendanceStatus.PRESENT, '', '');
    }
  };

  const handleReasonSubmit = (note: string) => {
    let status = AttendanceStatus.PRESENT;
    let points = grade?.points ?? null;

    if (tempValue === 'Н') {
      status = AttendanceStatus.ABSENT;
      points = null;
    } else if (tempValue === 'П') {
      status = AttendanceStatus.EXCUSED;
      points = null;
    } else if (tempValue === 'Б') {
      status = AttendanceStatus.PRESENT;
    }

    onUpdate(points, status, note, grade?.comment);
    setShowReasonModal(false);
  };

  // Получаем базовый стиль для баллов
  const cellStyle = getGradeColor(grade?.points ?? null, lesson.maxPoints, lesson.type);
  
  // Определяем финальный стиль на основе статуса (Н, П, Б)
  const finalStyle = grade?.attendance === AttendanceStatus.ABSENT 
    ? 'bg-red-600 text-white border-transparent' // Н - красная
    : grade?.attendance === AttendanceStatus.EXCUSED 
    ? 'bg-blue-500 text-white border-transparent' // П - голубая (синяя)
    : (grade?.attendanceNote && !grade?.points) 
    ? 'bg-purple-600 text-white border-transparent' // Б - фиолетовая
    : cellStyle;

  return (
    <td className="border-b border-r border-slate-100 p-0 text-center relative journal-row">
      <div className="flex items-center justify-center h-full">
        <input
          ref={inputRef}
          type="text"
          value={tempValue}
          onChange={handleInputChange}
          onClick={() => {
            if (tempValue === 'Н' || tempValue === 'П' || tempValue === 'Б') {
              setShowReasonModal(true);
            }
          }}
          placeholder=""
          className={`w-11 h-11 text-center text-base font-black rounded-xl border-2 transition-all outline-none focus:ring-4 focus:ring-indigo-100 cursor-pointer ${finalStyle}`}
        />
        
        {grade?.attendanceNote && (
          <div className="absolute top-2 right-2 pointer-events-none">
            <div className="w-2 h-2 bg-white rounded-full border border-black/10"></div>
          </div>
        )}
      </div>

      {showReasonModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] p-6 w-full max-w-[340px] shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 mb-5">
              <div className={`p-3 rounded-2xl ${tempValue === 'Н' ? 'bg-red-100 text-red-600' : tempValue === 'П' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                {tempValue === 'Н' ? <AlertCircle size={22} /> : <MessageSquare size={22} />}
              </div>
              <h3 className="text-lg font-black text-slate-800">
                {tempValue === 'Н' ? 'Отсутствие' : tempValue === 'П' ? 'Уважительная' : 'Примечание'}
              </h3>
            </div>
            
            <textarea
              autoFocus
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-400 focus:bg-white outline-none h-28 text-sm font-medium transition-all resize-none shadow-inner"
              placeholder="Причина или комментарий..."
              defaultValue={grade?.attendanceNote}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleReasonSubmit(e.currentTarget.value);
                }
              }}
            />
            
            <div className="mt-5 flex gap-3">
              <button onClick={() => setShowReasonModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-500 rounded-xl font-bold text-xs hover:bg-slate-200 transition-colors">Отмена</button>
              <button onClick={() => {
                const area = document.querySelector('textarea');
                handleReasonSubmit((area as HTMLTextAreaElement)?.value || '');
              }} className="flex-[2] py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-colors">Сохранить</button>
            </div>
          </div>
        </div>
      )}
    </td>
  );
};

export default GradeCellComponent;
