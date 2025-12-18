
import React, { useState } from 'react';
import { Subject, Class, Quarter } from '../types';
import { Plus, Trash2, Database, Code, Zap, CheckCircle, AlertCircle } from 'lucide-react';

interface SettingsPageProps {
  classes: Class[];
  subjects: Subject[];
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
  quarters: Quarter[];
  setQuarters: React.Dispatch<React.SetStateAction<Quarter[]>>;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ classes, subjects, setSubjects, quarters, setQuarters }) => {
  const [newSubjectName, setNewSubjectName] = useState('');
  const [activeTab, setActiveTab] = useState<'general' | 'sql'>('general');
  const [isInitializing, setIsInitializing] = useState(false);
  const [initStatus, setInitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [newQuarter, setNewQuarter] = useState({ name: '', subjectId: subjects[0]?.id || '', startDate: '', endDate: '' });

  const handleInitDB = async () => {
    if (!confirm('Это создаст необходимые таблицы в Neon. Продолжить?')) return;
    
    setIsInitializing(true);
    setInitStatus('idle');
    try {
      const response = await fetch('/api/setup', { method: 'POST' });
      if (response.ok) {
        setInitStatus('success');
        alert('База данных готова к работе!');
      } else {
        setInitStatus('error');
        const err = await response.json();
        alert(`Ошибка: ${err.message}`);
      }
    } catch (e) {
      setInitStatus('error');
      alert('Не удалось связаться с сервером');
    } finally {
      setIsInitializing(false);
    }
  };

  const sqlCode = `-- Таблицы для Neon DB
CREATE TYPE attendance_status AS ENUM ('Present', 'Absent', 'Excused');
CREATE TYPE lesson_type AS ENUM ('Урок', 'СОР', 'СОЧ', 'Проект', 'Экзамен', 'Тест', 'Классная работа', 'Домашняя работа', 'Самостоятельная работа', 'Практическая работа');

CREATE TABLE subjects (id TEXT PRIMARY KEY, name VARCHAR(100) NOT NULL UNIQUE);
CREATE TABLE classes (id TEXT PRIMARY KEY, name VARCHAR(20) NOT NULL UNIQUE);
CREATE TABLE students (id TEXT PRIMARY KEY, first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100) NOT NULL, student_id VARCHAR(50) UNIQUE, class_id TEXT REFERENCES classes(id) ON DELETE CASCADE);
CREATE TABLE lessons (id TEXT PRIMARY KEY, subject_id TEXT REFERENCES subjects(id), class_id TEXT REFERENCES classes(id), date DATE NOT NULL, type lesson_type DEFAULT 'Урок', topic TEXT, homework TEXT, max_points INTEGER DEFAULT 10);
CREATE TABLE grades (id TEXT PRIMARY KEY, lesson_id TEXT REFERENCES lessons(id) ON DELETE CASCADE, student_id TEXT REFERENCES students(id) ON DELETE CASCADE, points INTEGER, attendance attendance_status DEFAULT 'Present', attendance_note TEXT, comment TEXT, UNIQUE(lesson_id, student_id));
CREATE TABLE boards (id TEXT PRIMARY KEY, name TEXT NOT NULL, data TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`;

  const handleAddSubject = () => {
    if (!newSubjectName.trim()) return;
    setSubjects(prev => [...prev, { id: Math.random().toString(36).substr(2, 9), name: newSubjectName }]);
    setNewSubjectName('');
  };

  const handleAddQuarter = () => {
    if (!newQuarter.name || !newQuarter.subjectId || !newQuarter.startDate || !newQuarter.endDate) return;
    setQuarters(prev => [...prev, { id: Math.random().toString(36).substr(2, 9), ...newQuarter }]);
    setNewQuarter({ name: '', subjectId: subjects[0]?.id || '', startDate: '', endDate: '' });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 mb-4 inline-flex">
        <button 
          onClick={() => setActiveTab('general')}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'general' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <Database size={16} /> Общие
        </button>
        <button 
          onClick={() => setActiveTab('sql')}
          className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'sql' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <Code size={16} /> SQL Дамп / Настройка
        </button>
      </div>

      {activeTab === 'general' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-300">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
               📚 Предметы
            </h2>
            <div className="flex gap-2 mb-6">
              <input 
                className="flex-1 p-3 bg-slate-50 border rounded-xl outline-none"
                placeholder="Напр: Физика"
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
              />
              <button onClick={handleAddSubject} className="p-3 bg-indigo-600 text-white rounded-xl"><Plus size={20} /></button>
            </div>
            <div className="space-y-2">
              {subjects.map(s => (
                <div key={s.id} className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center">
                  <span className="font-bold text-slate-700">{s.name}</span>
                  <button onClick={() => setSubjects(prev => prev.filter(x => x.id !== s.id))} className="text-red-400 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
               📅 Четверти
            </h2>
            <div className="space-y-4 mb-6">
              <input 
                className="w-full p-3 bg-slate-50 border rounded-xl outline-none" 
                placeholder="Название (1 Четверть)"
                value={newQuarter.name}
                onChange={(e) => setNewQuarter({...newQuarter, name: e.target.value})}
              />
              <select 
                className="w-full p-3 bg-slate-50 border rounded-xl outline-none"
                value={newQuarter.subjectId}
                onChange={(e) => setNewQuarter({...newQuarter, subjectId: e.target.value})}
              >
                {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              <div className="flex gap-2">
                <input type="date" className="flex-1 p-3 bg-slate-50 border rounded-xl text-xs" value={newQuarter.startDate} onChange={e => setNewQuarter({...newQuarter, startDate: e.target.value})} />
                <input type="date" className="flex-1 p-3 bg-slate-50 border rounded-xl text-xs" value={newQuarter.endDate} onChange={e => setNewQuarter({...newQuarter, endDate: e.target.value})} />
              </div>
              <button onClick={handleAddQuarter} className="w-full p-3 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2">
                <Plus size={18} /> Создать четверть
              </button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {quarters.map(q => (
                <div key={q.id} className="p-4 bg-slate-50 rounded-2xl">
                  <div className="flex justify-between">
                    <span className="font-black text-slate-800">{q.name}</span>
                    <button onClick={() => setQuarters(prev => prev.filter(x => x.id !== q.id))} className="text-red-400"><Trash2 size={16} /></button>
                  </div>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                    {q.startDate} — {q.endDate}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border-4 border-indigo-500/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-600 p-4 rounded-3xl text-white">
                  <Zap size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-800">Быстрая настройка Neon</h2>
                  <p className="text-slate-500 font-medium">Создать все таблицы одним нажатием</p>
                </div>
              </div>
              <button 
                onClick={handleInitDB}
                disabled={isInitializing}
                className={`px-10 py-5 rounded-[2rem] font-black text-lg transition-all flex items-center gap-3 shadow-2xl ${
                  isInitializing ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 shadow-indigo-200'
                }`}
              >
                {isInitializing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                    Настройка...
                  </>
                ) : (
                  <>
                    <Zap size={22} />
                    Настроить базу данных в Neon
                  </>
                )}
              </button>
            </div>
            
            {initStatus === 'success' && (
               <div className="mt-6 p-4 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center gap-3 font-bold border border-emerald-100">
                 <CheckCircle size={20} /> Таблицы созданы! Приложение готово к работе.
               </div>
            )}
            {initStatus === 'error' && (
               <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-2xl flex items-center gap-3 font-bold border border-red-100">
                 <AlertCircle size={20} /> Ошибка при создании таблиц. Проверьте DATABASE_URL.
               </div>
            )}
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Code size={20} className="text-indigo-400" /> SQL Дамп (для ручного ввода)
              </h2>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(sqlCode);
                  alert('SQL скопирован в буфер обмена');
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all"
              >
                Копировать код
              </button>
            </div>
            <pre className="text-indigo-300 font-mono text-sm leading-relaxed overflow-x-auto p-6 bg-black/30 rounded-2xl border border-white/10">
              {sqlCode}
            </pre>
            <div className="mt-6 p-4 bg-indigo-900/40 rounded-xl border border-indigo-500/30">
              <p className="text-xs text-indigo-100 font-medium">
                💡 Если кнопка автоматической настройки не сработала, скопируйте этот код и выполните его в разделе <b>SQL Editor</b> консоли Neon Tech.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
