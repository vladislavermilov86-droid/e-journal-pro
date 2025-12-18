
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
  const [activeTab, setActiveTab] = useState<'general' | 'sql'>('general');
  const [isInitializing, setIsInitializing] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [dbInfo, setDbInfo] = useState<{ connected: boolean; message: string }>({ connected: false, message: 'Проверка...' });

  useEffect(() => { checkConnection(); }, []);

  const checkConnection = async () => {
    try {
      const res = await fetch('/api/classes');
      if (res.ok) setDbInfo({ connected: true, message: 'Соединение с Neon установлено' });
      else setDbInfo({ connected: false, message: 'База не инициализирована' });
    } catch (e) { setDbInfo({ connected: false, message: 'Ошибка соединения' }); }
  };

  const handleInitDB = async () => {
    setIsInitializing(true);
    try {
      const res = await fetch('/api/setup', { method: 'POST' });
      if (res.ok) {
        await checkConnection();
        alert('Таблицы созданы!');
      } else alert('Ошибка при создании таблиц');
    } catch (e) { alert('Ошибка сети'); }
    finally { setIsInitializing(false); }
  };

  const handleSeedData = async () => {
    if (!confirm('Внимание! Это действие скопирует все демонстрационные данные в вашу базу Neon. После этого они будут доступны всегда, даже после перезагрузки. Продолжить?')) return;
    
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
        alert('Данные успешно сохранены в облако!');
        if (onDataRefresh) await onDataRefresh();
      } else {
        const err = await res.json();
        alert(`Ошибка импорта: ${err.message}`);
      }
    } catch (e) {
      alert('Ошибка при отправке данных в базу');
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 mb-4 inline-flex">
        <button onClick={() => setActiveTab('general')} className={`px-6 py-2.5 rounded-xl font-bold text-sm ${activeTab === 'general' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500'}`}>Общие</button>
        <button onClick={() => setActiveTab('sql')} className={`px-6 py-2.5 rounded-xl font-bold text-sm ${activeTab === 'sql' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500'}`}>База данных</button>
      </div>

      {activeTab === 'sql' ? (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-3xl text-white ${dbInfo.connected ? 'bg-emerald-500' : 'bg-red-500'}`}>
                {dbInfo.connected ? <CheckCircle size={32} /> : <AlertCircle size={32} />}
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-800">Статус Neon DB</h2>
                <p className={`font-medium ${dbInfo.connected ? 'text-emerald-600' : 'text-red-500'}`}>{dbInfo.message}</p>
              </div>
              <button onClick={checkConnection} className="ml-auto p-4 bg-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600"><RefreshCw size={20} /></button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-indigo-600 p-4 rounded-3xl text-white shadow-lg shadow-indigo-100"><Zap size={32} /></div>
                  <h3 className="text-xl font-black text-slate-800">1. Схема</h3>
                </div>
                <button onClick={handleInitDB} disabled={isInitializing} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-100">
                  {isInitializing ? <RefreshCw className="animate-spin" /> : <Zap size={20} />}
                  Настроить базу
                </button>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-500 p-4 rounded-3xl text-white shadow-lg shadow-emerald-100"><FileText size={32} /></div>
                  <h3 className="text-xl font-black text-slate-800">2. Импорт</h3>
                </div>
                <button onClick={handleSeedData} disabled={isSeeding || !dbInfo.connected} className={`w-full py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-xl transition-all ${isSeeding || !dbInfo.connected ? 'bg-slate-100 text-slate-300' : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-100'}`}>
                  {isSeeding ? <RefreshCw className="animate-spin" /> : <FileText size={20} />}
                  Загрузить демо
                </button>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50/50 p-6 rounded-[2rem] border border-indigo-100 text-center">
             <p className="text-sm text-indigo-700 font-medium">После нажатия <b>"Загрузить демо"</b> данные будут отправлены в облако Neon одним пакетом. Это гарантирует их сохранность при каждом заходе на сайт.</p>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 text-center text-slate-400 font-bold py-20">
          Настройки предметов и четвертей доступны после подключения базы данных.
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
