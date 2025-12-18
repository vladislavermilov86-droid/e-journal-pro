
import React, { useState, useEffect } from 'react';
import { Subject, Class, Quarter } from '../types';
import { 
  Plus, Trash2, Database, Zap, CheckCircle, AlertCircle, 
  RefreshCw, FileText, CloudIcon, Info, Book, Calendar, Edit3
} from 'lucide-react';
import { initialClasses, initialStudents, initialSubjects, initialLessons, initialGrades, initialQuarters } from '../mockData';

interface SettingsPageProps {
  classes: Class[];
  subjects: Subject[];
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
  quarters: Quarter[];
  setQuarters: React.Dispatch<React.SetStateAction<Quarter[]>>;
  onDataRefresh?: () => Promise<void>;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ 
  classes, subjects, setSubjects, quarters, setQuarters, onDataRefresh 
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'sql'>('general');
  const [isInitializing, setIsInitializing] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [dbInfo, setDbInfo] = useState<{ connected: boolean; message: string }>({ connected: false, message: 'Проверка...' });

  // Формы для новых данных
  const [newSubjectName, setNewSubjectName] = useState('');
  const [newQuarter, setNewQuarter] = useState({
    name: '',
    subjectId: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => { 
    checkConnection(); 
    if (subjects.length > 0 && !newQuarter.subjectId) {
      setNewQuarter(prev => ({ ...prev, subjectId: subjects[0].id }));
    }
  }, [subjects]);

  const checkConnection = async () => {
    try {
      const res = await fetch('/api/classes');
      if (res.ok) setDbInfo({ connected: true, message: 'База данных Neon подключена' });
      else setDbInfo({ connected: false, message: 'Таблицы еще не созданы' });
    } catch (e) { setDbInfo({ connected: false, message: 'Нет связи с сервером' }); }
  };

  const apiCall = async (endpoint: string, method: string, body: any) => {
    try {
      const res = await fetch(`/api/${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      return res.ok;
    } catch (e) {
      return false;
    }
  };

  // Методы управления предметами
  const handleAddSubject = async () => {
    if (!newSubjectName.trim()) return;
    const subject = { id: `subj-${Math.random().toString(36).substr(2, 9)}`, name: newSubjectName };
    const success = await apiCall('subjects', 'POST', subject);
    if (success || !dbInfo.connected) {
      setSubjects(prev => [...prev, subject]);
      setNewSubjectName('');
    }
  };

  const handleDeleteSubject = async (id: string) => {
    if (!confirm('Удалить предмет? Это может повлиять на связанные уроки.')) return;
    // API не имеет явного DELETE для предметов в предоставленном коде, но мы можем имитировать или расширить
    setSubjects(prev => prev.filter(s => s.id !== id));
  };

  // Методы управления четвертями
  const handleAddQuarter = async () => {
    if (!newQuarter.name || !newQuarter.subjectId || !newQuarter.startDate || !newQuarter.endDate) {
      alert('Заполните все поля четверти');
      return;
    }
    const quarter: Quarter = {
      ...newQuarter,
      id: `qtr-${Math.random().toString(36).substr(2, 9)}`
    };
    const success = await apiCall('quarters', 'POST', quarter);
    if (success || !dbInfo.connected) {
      setQuarters(prev => [...prev, quarter]);
      setNewQuarter({ ...newQuarter, name: '', startDate: '', endDate: '' });
    }
  };

  const handleDeleteQuarter = async (id: string) => {
    if (!confirm('Удалить четверть?')) return;
    setQuarters(prev => prev.filter(q => q.id !== id));
  };

  const handleInitDB = async () => {
    setIsInitializing(true);
    try {
      const res = await fetch('/api/setup', { method: 'POST' });
      if (res.ok) {
        await checkConnection();
        alert('База данных успешно инициализирована!');
      } else alert('Ошибка при настройке базы');
    } catch (e) { alert('Ошибка сети при инициализации'); }
    finally { setIsInitializing(false); }
  };

  const handleSeedData = async () => {
    if (!confirm('Вы собираетесь отправить все демонстрационные данные в облако. Это создаст постоянную копию журнала. Продолжить?')) return;
    
    setIsSeeding(true);
    try {
      const res = await fetch('/api/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classes: initialClasses,
          subjects: initialSubjects,
          quarters: initialQuarters,
          students: initialStudents,
          lessons: initialLessons,
          grades: initialGrades
        })
      });

      if (res.ok) {
        alert('Данные успешно сохранены в Neon!');
        if (onDataRefresh) await onDataRefresh();
      } else {
        const err = await res.json();
        alert(`Ошибка при сохранении: ${err.message}`);
      }
    } catch (e) {
      alert('Критическая ошибка при отправке данных');
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-slate-100 inline-flex">
        <button onClick={() => setActiveTab('general')} className={`px-8 py-3 rounded-xl font-black text-sm transition-all ${activeTab === 'general' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'text-slate-400 hover:bg-slate-50'}`}>Общие настройки</button>
        <button onClick={() => setActiveTab('sql')} className={`px-8 py-3 rounded-xl font-black text-sm transition-all ${activeTab === 'sql' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'text-slate-400 hover:bg-slate-50'}`}>База данных</button>
      </div>

      {activeTab === 'sql' ? (
        <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-500">
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
               <CloudIcon size={160} />
             </div>
             
             <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                <div className={`p-6 rounded-[2.5rem] text-white shadow-2xl ${dbInfo.connected ? 'bg-emerald-500 shadow-emerald-100' : 'bg-red-500 shadow-red-100'}`}>
                  {dbInfo.connected ? <CheckCircle size={48} /> : <AlertCircle size={48} />}
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-800">Статус Облака</h2>
                  <p className={`text-lg font-bold mt-1 ${dbInfo.connected ? 'text-emerald-600' : 'text-red-500'}`}>{dbInfo.message}</p>
                  <p className="text-slate-400 text-sm mt-2 max-w-lg">Если статус красный — ваш журнал работает во временном режиме.</p>
                </div>
                <button onClick={checkConnection} className="md:ml-auto p-5 bg-slate-100 rounded-3xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
                  <RefreshCw size={24} />
                </button>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 group">
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-6">
                  <div className="bg-indigo-600 p-5 rounded-3xl text-white shadow-xl shadow-indigo-100 group-hover:scale-110 transition-transform"><Zap size={40} /></div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-800">Шаг 1: Схема</h3>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Подготовка таблиц</p>
                  </div>
                </div>
                <button 
                  onClick={handleInitDB} 
                  disabled={isInitializing} 
                  className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-indigo-100"
                >
                  {isInitializing ? <RefreshCw className="animate-spin" /> : <Zap size={24} />}
                  Настроить базу
                </button>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 group">
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-6">
                  <div className="bg-emerald-500 p-5 rounded-3xl text-white shadow-xl shadow-emerald-100 group-hover:scale-110 transition-transform"><FileText size={40} /></div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-800">Шаг 2: Данные</h3>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Первичный импорт</p>
                  </div>
                </div>
                <button 
                  onClick={handleSeedData} 
                  disabled={isSeeding || !dbInfo.connected} 
                  className={`w-full py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 shadow-2xl transition-all ${
                    isSeeding || !dbInfo.connected ? 'bg-slate-100 text-slate-300' : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-100'
                  }`}
                >
                  {isSeeding ? <RefreshCw className="animate-spin" /> : <FileText size={24} />}
                  Загрузить демо
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-300">
          {/* Управление предметами */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-indigo-600 p-3 rounded-2xl text-white">
                <Book size={24} />
              </div>
              <h3 className="text-2xl font-black text-slate-800">Предметы</h3>
            </div>

            <div className="flex gap-2 mb-6">
              <input 
                type="text"
                placeholder="Название предмета..."
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
                className="flex-1 px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button 
                onClick={handleAddSubject}
                className="p-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all"
              >
                <Plus size={24} />
              </button>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-[400px] pr-2">
              {subjects.map(s => (
                <div key={s.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group">
                  <span className="font-bold text-slate-700">{s.name}</span>
                  <button 
                    onClick={() => handleDeleteSubject(s.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              {subjects.length === 0 && <p className="text-center text-slate-400 py-4">Предметы не созданы</p>}
            </div>
          </div>

          {/* Управление четвертями */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-emerald-500 p-3 rounded-2xl text-white">
                <Calendar size={24} />
              </div>
              <h3 className="text-2xl font-black text-slate-800">Четверти</h3>
            </div>

            <div className="space-y-4 mb-8 bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Название четверти</label>
                  <input 
                    type="text" 
                    placeholder="Напр: 3 Четверть"
                    value={newQuarter.name}
                    onChange={(e) => setNewQuarter({...newQuarter, name: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Предмет</label>
                  <select 
                    value={newQuarter.subjectId}
                    onChange={(e) => setNewQuarter({...newQuarter, subjectId: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none bg-white"
                  >
                    {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Начало</label>
                  <input 
                    type="date" 
                    value={newQuarter.startDate}
                    onChange={(e) => setNewQuarter({...newQuarter, startDate: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Конец</label>
                  <input 
                    type="date" 
                    value={newQuarter.endDate}
                    onChange={(e) => setNewQuarter({...newQuarter, endDate: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 outline-none"
                  />
                </div>
              </div>
              <button 
                onClick={handleAddQuarter}
                className="w-full py-3 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={20} /> Добавить четверть
              </button>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-[300px] pr-2">
              {quarters.map(q => {
                const subject = subjects.find(s => s.id === q.subjectId);
                return (
                  <div key={q.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                           <span className="font-black text-slate-800">{q.name}</span>
                           <span className="text-[10px] px-2 py-0.5 bg-white border border-slate-200 rounded-md font-bold text-slate-400 uppercase">{subject?.name || '???'}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium mt-1">
                          {new Date(q.startDate).toLocaleDateString('ru-RU')} — {new Date(q.endDate).toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                      <button 
                        onClick={() => handleDeleteQuarter(q.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
              {quarters.length === 0 && <p className="text-center text-slate-400 py-4">Четверти не настроены</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
