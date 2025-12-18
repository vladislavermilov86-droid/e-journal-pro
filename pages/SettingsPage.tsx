
import React, { useState, useEffect } from 'react';
import { Subject, Class, Quarter } from '../types';
// Add Info to the lucide-react imports
import { Plus, Trash2, Database, Code, Zap, CheckCircle, AlertCircle, RefreshCw, FileText, CloudIcon, Info } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'general' | 'sql'>('sql');
  const [isInitializing, setIsInitializing] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [dbInfo, setDbInfo] = useState<{ connected: boolean; message: string }>({ connected: false, message: 'Проверка...' });

  useEffect(() => { checkConnection(); }, []);

  const checkConnection = async () => {
    try {
      const res = await fetch('/api/classes');
      if (res.ok) setDbInfo({ connected: true, message: 'База данных Neon подключена' });
      else setDbInfo({ connected: false, message: 'Таблицы еще не созданы' });
    } catch (e) { setDbInfo({ connected: false, message: 'Нет связи с сервером' }); }
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
    if (!confirm('Вы собираетесь отправить все демонстрационные данные в облако. Это создаст постоянную копию журнала, которая будет доступна всегда. Продолжить?')) return;
    
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
        alert('Данные успешно сохранены в Neon! Теперь журнал будет загружаться автоматически.');
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
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-slate-100 inline-flex">
        <button onClick={() => setActiveTab('sql')} className={`px-8 py-3 rounded-xl font-black text-sm transition-all ${activeTab === 'sql' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'text-slate-400 hover:bg-slate-50'}`}>База данных</button>
        <button onClick={() => setActiveTab('general')} className={`px-8 py-3 rounded-xl font-black text-sm transition-all ${activeTab === 'general' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'text-slate-400 hover:bg-slate-50'}`}>Настройки</button>
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
                  <p className="text-slate-400 text-sm mt-2 max-w-lg">Если статус красный — ваш журнал работает во временном режиме. Данные не сохранятся после закрытия браузера.</p>
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
                  className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-indigo-100 active:scale-95"
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
                  className={`w-full py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 shadow-2xl transition-all active:scale-95 ${
                    isSeeding || !dbInfo.connected ? 'bg-slate-100 text-slate-300' : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-100'
                  }`}
                >
                  {isSeeding ? <RefreshCw className="animate-spin" /> : <FileText size={24} />}
                  Загрузить демо
                </button>
              </div>
            </div>
          </div>

          <div className="bg-indigo-900 p-10 rounded-[3rem] text-white shadow-2xl shadow-indigo-200">
             <h4 className="text-xl font-black mb-4 flex items-center gap-2">
               <Info size={24} className="text-indigo-400" />
               Важное примечание
             </h4>
             <p className="text-indigo-100 leading-relaxed font-medium">
               После успешного выполнения обоих шагов ваш журнал станет полностью облачным. Любое число, поставленное в журнале, любая тема урока будут мгновенно записываться в базу Neon. Вы сможете заходить с любого устройства — ваши данные всегда будут на месте.
             </p>
          </div>
        </div>
      ) : (
        <div className="bg-white p-20 rounded-[3rem] border border-slate-100 text-center animate-in fade-in duration-300">
          <Database size={64} className="mx-auto text-slate-200 mb-6" />
          <h3 className="text-2xl font-black text-slate-800">Настройки управления</h3>
          <p className="text-slate-400 mt-2 max-w-sm mx-auto font-medium">Эти параметры станут доступны после того, как вы подключите базу данных во вкладке выше.</p>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
