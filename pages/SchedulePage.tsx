
import React, { useState } from 'react';
import { Calendar, Plus, RefreshCw, Clock, ArrowRight } from 'lucide-react';
import { Subject, Class, ScheduleRule, Lesson, LessonType } from '../types';
import { DEFAULT_MAX_POINTS } from '../constants';

interface SchedulePageProps {
  subjects: Subject[];
  classes: Class[];
  lessons: Lesson[];
  rules: ScheduleRule[];
  setLessons: React.Dispatch<React.SetStateAction<Lesson[]>>;
  setRules: React.Dispatch<React.SetStateAction<ScheduleRule[]>>;
}

const SchedulePage: React.FC<SchedulePageProps> = ({ 
  subjects, classes, lessons, rules, setLessons, setRules 
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id || '');
  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || '');
  const [selectedDays, setSelectedDays] = useState<number[]>([2, 4, 6]); // Tue, Thu, Sat
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState('');

  const daysLabels = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  const toggleDay = (day: number) => {
    setSelectedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day].sort()
    );
  };

  const generateLessons = () => {
    if (!selectedSubjectId || !selectedClassId || !startDate || !endDate) {
      alert('Заполните все поля!');
      return;
    }

    const newLessons: Lesson[] = [];
    const current = new Date(startDate);
    const end = new Date(endDate);

    while (current <= end) {
      if (selectedDays.includes(current.getDay())) {
        newLessons.push({
          id: Math.random().toString(36).substr(2, 9),
          subjectId: selectedSubjectId,
          classId: selectedClassId,
          date: current.toISOString().split('T')[0],
          type: LessonType.NORMAL,
          topic: 'Запланированная тема',
          homework: '',
          maxPoints: DEFAULT_MAX_POINTS[LessonType.NORMAL]
        });
      }
      current.setDate(current.getDate() + 1);
    }

    setLessons(prev => [...prev, ...newLessons]);
    alert(`Сгенерировано уроков: ${newLessons.length}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
        <div className="flex items-center gap-4 mb-10">
          <div className="bg-indigo-600 p-4 rounded-3xl text-white shadow-lg shadow-indigo-100">
            <Calendar size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-800">Авторасписание</h1>
            <p className="text-slate-500 font-medium">Создайте сетку уроков на период</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Предмет</label>
              <select 
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none border transition-all"
              >
                {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Класс</label>
              <select 
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none border transition-all"
              >
                {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Дни недели</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5, 6].map(day => (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all border-2 ${
                      selectedDays.includes(day)
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100'
                        : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                    }`}
                  >
                    {daysLabels[day]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Период действия</label>
              <div className="flex items-center gap-3">
                <input 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none border transition-all"
                />
                <ArrowRight className="text-slate-300" />
                <input 
                  type="date" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none border transition-all"
                />
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
               <h3 className="font-bold text-slate-700 flex items-center gap-2 mb-2">
                 <Clock size={18} className="text-indigo-500" />
                 Совет
               </h3>
               <p className="text-sm text-slate-500 leading-relaxed">
                 Приложение автоматически пропустит праздничные дни, если вы их укажете вручную позже. Генерация создаст обычные уроки по 10 баллов.
               </p>
            </div>
          </div>
        </div>

        <button 
          onClick={generateLessons}
          className="w-full mt-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-xl hover:bg-indigo-700 transform hover:scale-[1.02] transition-all shadow-2xl shadow-indigo-100 flex items-center justify-center gap-3"
        >
          <RefreshCw size={24} />
          Сгенерировать сетку уроков
        </button>
      </div>
      
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Список активных правил</h2>
        <div className="text-center py-10 text-slate-400 font-medium">
          Нет сохраненных правил. Используйте форму выше для разовой генерации.
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
