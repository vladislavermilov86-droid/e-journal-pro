
import React, { useState } from 'react';
import { Subject, Class, Quarter } from '../types';
import { Plus, Trash2, Database, Code } from 'lucide-react';

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
  const [newQuarter, setNewQuarter] = useState({ name: '', subjectId: subjects[0]?.id || '', startDate: '', endDate: '' });

  const sqlCode = `-- Таблицы для Neon DB
CREATE TYPE attendance_status AS ENUM ('Present', 'Absent', 'Excused');
CREATE TYPE lesson_type AS ENUM ('Урок', 'СОР', 'СОЧ', 'Проект', 'Экзамен', 'Тест', 'Классная работа', 'Домашняя работа', 'Самостоятельная работа', 'Практическая работа');

CREATE TABLE subjects (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name VARCHAR(100) NOT NULL UNIQUE);
CREATE TABLE classes (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), name VARCHAR(20) NOT NULL UNIQUE);
CREATE TABLE students (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100) NOT NULL, student_id VARCHAR(50) UNIQUE, class_id UUID REFERENCES classes(id) ON DELETE CASCADE);
CREATE TABLE lessons (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), subject_id UUID REFERENCES subjects(id), class_id UUID REFERENCES classes(id), date DATE NOT NULL, type lesson_type DEFAULT 'Урок', topic TEXT, homework TEXT, max_points INTEGER DEFAULT 10);
CREATE TABLE grades (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE, student_id UUID REFERENCES students(id) ON DELETE CASCADE, points INTEGER, attendance attendance_status DEFAULT 'Present', attendance_note TEXT, comment TEXT, UNIQUE(lesson_id, student_id));`;

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
          <Code size={16} /> SQL Дамп
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
        <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Code size={20} className="text-indigo-400" /> Базовая структура БД
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
              💡 Используйте этот код в консоли <b>Neon Tech</b> для создания таблиц. После создания таблиц ваше приложение сможет выполнять реальные SQL-запросы через API.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
