
import React, { useState, useEffect } from 'react';
import { Subject, Class, Quarter } from '../types';
import { Plus, Trash2, Database, Code, Zap, CheckCircle, AlertCircle, RefreshCw, FileText } from 'lucide-react';
import { initialClasses, initialStudents, initialSubjects, initialLessons, initialGrades, initialQuarters } from '../mockData';

interface SettingsPageProps {
  classes: Class[];
  subjects: Subject[];
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
  quarters: Quarter[];
  setQuarters: React.Dispatch<React.SetStateAction<Quarter[]>>;
  onDataRefresh?: () => Promise<void>;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ classes, subjects, setSubjects, quarters, setQuarters, onDataRefresh }) => {
  const [newSubjectName, setNewSubjectName] = useState('');
  const [activeTab, setActiveTab] = useState<'general' | 'sql'>('general');
  const [isInitializing, setIsInitializing] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [dbInfo, setDbInfo] = useState<{ connected: boolean; message: string }>({ connected: false, message: 'Проверка...' });
  const [newQuarter, setNewQuarter] = useState({ name: '', subjectId: subjects[0]?.id || '', startDate: '', endDate: '' });

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const res = await fetch('/api/classes');
      if (res.ok) {
        setDbInfo({ connected: true, message: 'Соединение с Neon установлено' });
      } else {
        const err = await res.json().catch(() => ({ message: 'Ошибка сервера' }));
        setDbInfo({ connected: false, message: `Ошибка: ${err.message || 'База не инициализирована'}` });
      }
    } catch (e) {
      setDbInfo({ connected: false, message: 'Нет связи с API' });
    }
  };

  const handleInitDB = async () => {
    if (!confirm('Это создаст необходимые таблицы в Neon. Продолжить?')) return;
    
    setIsInitializing(true);
    try {
      const response = await fetch('/api/setup', { method: 'POST' });
      const data = await response.json();
      
      if (response.ok) {
        await checkConnection();
        alert('База данных успешно настроена!');
      } else {
        alert(`Ошибка инициализации: ${data.message}\n\nДетали: ${data.error || 'не указаны'}`);
      }
    } catch (e) {
      alert('Не удалось выполнить запрос к API Setup');
    } finally {
      setIsInitializing(false);
    }
  };

  const handleSeedData = async () => {
    if (!confirm('Это загрузит демонстрационные данные (9В класс, оценки за 1-2 четверть) в вашу базу данных. Это может занять некоторое время. Продолжить?')) return;
    
    setIsSeeding(true);
    try {
      const apiRequest = async (endpoint: string, body: any) => {
        return fetch(`/api/${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
      };

      // Последовательно загружаем всё
      for (const c of initialClasses) await apiRequest('classes', c);
      for (const s of initialSubjects) await apiRequest('subjects', s);
      for (const q of initialQuarters) await apiRequest('quarters', q);
      for (const st of initialStudents) await apiRequest('students', st);
      for (const l of initialLessons) await apiRequest('lessons', l);
      
      // Оценки загружаем пачками для скорости
      const chunks = [];
      for (let i = 0; i < initialGrades.length; i += 10) {
        chunks.push(initialGrades.slice(i, i + 10));
      }
      for (const chunk of chunks) {
        await Promise.all(chunk.map(g => apiRequest('grades', g)));
      }

      alert('Демо-данные успешно импортированы!');
      if (onDataRefresh) await onDataRefresh();
    } catch (e) {
      console.error(e);
      alert('Ошибка при импорте данных. Проверьте консоль.');
    } finally {
      setIsSeeding(false);
    }
  };

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
          <Code size={16} /> База данных
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
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-3xl text-white ${dbInfo.connected ? 'bg-emerald-500' : 'bg-red-500'}`}>
                  {dbInfo.connected ? <CheckCircle size={32} /> : <AlertCircle size={32} />}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-800">Статус Neon DB</h2>
                  <p className={`font-medium ${dbInfo.connected ? 'text-emerald-600' : 'text-red-500'}`}>
                    {dbInfo.message}
                  </p>
                </div>
              </div>
              <button 
                onClick={checkConnection}
                className="p-4 bg-slate-100 text-slate-500 rounded-2xl hover:bg-slate-200 transition-all"
              >
                <RefreshCw size={20} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border-4 border-indigo-500/20">
              <div className="flex flex-col items-start gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-indigo-600 p-4 rounded-3xl text-white">
                    <Zap size={32} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-800">Настройка таблиц</h2>
                    <p className="text-slate-500 text-xs font-medium">Создать структуру в базе Neon</p>
                  </div>
                </div>
                <button 
                  onClick={handleInitDB}
                  disabled={isInitializing}
                  className={`w-full py-4 rounded-[1.5rem] font-black transition-all flex items-center justify-center gap-3 shadow-xl ${
                    isInitializing ? 'bg-slate-200 text-slate-400' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {isInitializing ? <RefreshCw className="animate-spin" size={20} /> : <Zap size={20} />}
                  Настроить базу
                </button>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
              <div className="flex flex-col items-start gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-500 p-4 rounded-3xl text-white">
                    <FileText size={32} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-800">Демо-данные</h2>
                    <p className="text-slate-500 text-xs font-medium">Импорт примера (9В класс)</p>
                  </div>
                </div>
                <button 
                  onClick={handleSeedData}
                  disabled={isSeeding || !dbInfo.connected}
                  className={`w-full py-4 rounded-[1.5rem] font-black transition-all flex items-center justify-center gap-3 shadow-xl ${
                    isSeeding || !dbInfo.connected ? 'bg-slate-100 text-slate-300' : 'bg-emerald-500 text-white hover:bg-emerald-600'
                  }`}
                >
                  {isSeeding ? <RefreshCw className="animate-spin" size={20} /> : <FileText size={20} />}
                  Загрузить демо
                </button>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-slate-500 bg-slate-50 p-4 rounded-2xl text-center">
            <b>Важно:</b> Сначала нажмите "Настроить базу", а затем, если хотите увидеть готовый пример, нажмите "Загрузить демо".
          </p>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
