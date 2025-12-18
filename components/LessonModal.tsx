
import React, { useState } from 'react';
import { Lesson, LessonType } from '../types';
import { X, Save, Trash2, Calendar, Book, Layout } from 'lucide-react';
import { DEFAULT_MAX_POINTS } from '../constants';

interface LessonModalProps {
  lesson: Lesson | null;
  defaultDate?: string;
  onClose: () => void;
  onSave: (data: Partial<Lesson>) => void;
  onDelete?: (id: string) => void;
}

const LessonModal: React.FC<LessonModalProps> = ({ lesson, defaultDate, onClose, onSave, onDelete }) => {
  const [date, setDate] = useState(lesson?.date || defaultDate || new Date().toISOString().split('T')[0]);
  const [topic, setTopic] = useState(lesson?.topic || '');
  const [homework, setHomework] = useState(lesson?.homework || '');
  const [type, setType] = useState<LessonType>(lesson?.type || LessonType.NORMAL);
  const [maxPoints, setMaxPoints] = useState<number>(lesson?.maxPoints || DEFAULT_MAX_POINTS[LessonType.NORMAL]);

  const handleTypeChange = (newType: LessonType) => {
    setType(newType);
    // Меняем макс. балл только если это новый урок
    if (!lesson) {
      setMaxPoints(DEFAULT_MAX_POINTS[newType]);
    }
  };

  const handleSave = () => {
    // Гарантируем, что maxPoints - это число, а не NaN
    const finalMaxPoints = isNaN(maxPoints) || maxPoints <= 0 ? 10 : maxPoints;
    onSave({ 
      date, 
      topic: topic.trim(), 
      homework: homework.trim(), 
      type, 
      maxPoints: finalMaxPoints 
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-white rounded-[2rem] w-full max-w-xl shadow-2xl relative animate-in fade-in slide-in-from-bottom-4 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-indigo-600 p-3 rounded-2xl text-white">
              <Calendar size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800">{lesson ? 'Редактировать урок' : 'Новый урок'}</h2>
              <p className="text-slate-500 font-medium">Заполните данные о занятии</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Дата</label>
                <div className="relative">
                   <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all border"
                  />
                  <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Макс. балл</label>
                <input 
                  type="number" 
                  value={isNaN(maxPoints) ? '' : maxPoints} 
                  onChange={(e) => setMaxPoints(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 bg-slate-50 border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all border font-bold"
                  placeholder="10, 15, 20..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Тип урока</label>
              <div className="flex flex-wrap gap-2">
                {Object.values(LessonType).map((t) => (
                  <button
                    key={t}
                    onClick={() => handleTypeChange(t)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border-2 ${
                      type === t 
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100 scale-105' 
                        : 'bg-white border-slate-100 text-slate-500 hover:border-indigo-100 hover:text-indigo-600'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Тема урока</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={topic} 
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all border font-medium"
                  placeholder="Напр: Теорема Пифагора"
                />
                <Book size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Домашнее задание</label>
              <textarea 
                value={homework} 
                onChange={(e) => setHomework(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all border min-h-[100px]"
                placeholder="Что задать на дом?"
              />
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between gap-4">
            {lesson && onDelete && (
              <button 
                onClick={() => onDelete(lesson.id)}
                className="p-4 text-red-500 hover:bg-red-50 rounded-2xl transition-all border border-red-100"
              >
                <Trash2 size={24} />
              </button>
            )}
            <div className="flex-1 flex gap-3">
              <button 
                onClick={onClose}
                className="flex-1 px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
              >
                Отмена
              </button>
              <button 
                onClick={handleSave}
                className="flex-[2] px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2"
              >
                <Save size={20} />
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonModal;
