
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { 
  Users, BookOpen, Calendar, Mail, Settings, LogOut, 
  BarChart2, CloudIcon, RefreshCw, AlertTriangle, Database, Info
} from 'lucide-react';
import { 
  Class, Student, Subject, Lesson, GradeCell, Message, 
  Quarter, ScheduleRule 
} from './types';
import { 
  initialClasses, initialStudents, initialSubjects, 
  initialLessons, initialGrades, initialQuarters 
} from './mockData';
import JournalPage from './pages/JournalPage';
import ClassesPage from './pages/ClassesPage';
import SchedulePage from './pages/SchedulePage';
import MessagesPage from './pages/MessagesPage';
import StatsPage from './pages/StatsPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';

const apiRequest = async (endpoint: string, method: string = 'GET', body?: any) => {
  try {
    const response = await fetch(`/api/${endpoint}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    return response.ok ? await response.json() : null;
  } catch (error) {
    return null;
  }
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [mode, setMode] = useState<'real' | 'demo' | 'error'>('real');
  
  const [classes, setClasses] = useState<Class[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [grades, setGrades] = useState<GradeCell[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [quarters, setQuarters] = useState<Quarter[]>([]);
  const [scheduleRules, setScheduleRules] = useState<ScheduleRule[]>([]);

  const loadAllData = useCallback(async () => {
    setIsSyncing(true);
    try {
      const resClasses = await apiRequest('classes');
      
      if (resClasses === null) {
        setMode('error');
        setClasses(initialClasses);
        setStudents(initialStudents);
        setSubjects(initialSubjects);
        setLessons(initialLessons);
        setGrades(initialGrades);
        setQuarters(initialQuarters);
      } else if (resClasses.length === 0) {
        setMode('demo');
        setClasses(initialClasses);
        setStudents(initialStudents);
        setSubjects(initialSubjects);
        setLessons(initialLessons);
        setGrades(initialGrades);
        setQuarters(initialQuarters);
      } else {
        setMode('real');
        const [st, sb, ls, gr, qt] = await Promise.all([
          apiRequest('students'),
          apiRequest('subjects'),
          apiRequest('lessons'),
          apiRequest('grades'),
          apiRequest('quarters')
        ]);
        setClasses(resClasses);
        setStudents(st || []);
        setSubjects(sb || []);
        setLessons(ls || []);
        setGrades(gr || []);
        setQuarters(qt || []);
      }
    } catch (e) {
      setMode('error');
    } finally {
      setIsSyncing(false);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) loadAllData();
    else setIsLoading(false);
  }, [isAuthenticated, loadAllData]);

  const syncGrade = async (grade: GradeCell) => {
    if (mode !== 'real') return;
    await apiRequest('grades', 'POST', grade);
  };

  const syncLesson = async (lesson: Lesson, isDelete: boolean = false) => {
    setIsSyncing(true);
    await apiRequest('lessons', isDelete ? 'DELETE' : 'POST', lesson);
    setIsSyncing(false);
    loadAllData();
  };

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <p className="font-bold text-slate-600">Загрузка данных...</p>
      </div>
    </div>
  );

  if (!isAuthenticated) return <LoginPage onLogin={() => setIsAuthenticated(true)} />;

  return (
    <HashRouter>
      <div className="flex min-h-screen bg-slate-50">
        <aside className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col shadow-sm z-40">
          <div className="p-6 border-b border-slate-100 flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg text-white"><BookOpen size={24} /></div>
            <span className="text-xl font-bold text-slate-800">E-Journal <span className="text-indigo-600">Pro</span></span>
          </div>
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <SidebarLink to="/journal" icon={<BookOpen size={20} />} label="Журнал" />
            <SidebarLink to="/classes" icon={<Users size={20} />} label="Классы" />
            <SidebarLink to="/schedule" icon={<Calendar size={20} />} label="Расписание" />
            <SidebarLink to="/stats" icon={<BarChart2 size={20} />} label="Аналитика" />
            <SidebarLink to="/messages" icon={<Mail size={20} />} label="Сообщения" />
            <SidebarLink to="/settings" icon={<Settings size={20} />} label="Настройки" />
          </nav>
          <div className="p-4 border-t border-slate-100 space-y-3">
            {mode === 'demo' && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                <div className="flex items-center gap-2 text-amber-700 text-[10px] font-black uppercase mb-1">
                  <Info size={14} /> Демо-режим
                </div>
                <p className="text-[9px] text-amber-600 leading-tight">Данные не сохранятся. Зайдите в Настройки и нажмите "Загрузить демо", чтобы сохранить их в базу.</p>
              </div>
            )}
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[10px] font-bold ${mode === 'real' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
              <CloudIcon size={14} /> {mode === 'real' ? 'Облако: Активно' : 'Облако: Не настроено'}
            </div>
            <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-3 w-full p-3 text-slate-400 hover:text-red-600 transition-all">
              <LogOut size={20} /> <span className="font-medium">Выйти</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 p-8 overflow-auto">
          <Routes>
            <Route path="/journal" element={<JournalPage classes={classes} subjects={subjects} students={students} lessons={lessons} grades={grades} quarters={quarters} setLessons={setLessons} setGrades={setGrades} onGradeUpdate={syncGrade} onLessonSave={syncLesson} />} />
            <Route path="/classes" element={<ClassesPage classes={classes} students={students} setClasses={setClasses} setStudents={setStudents} />} />
            <Route path="/schedule" element={<SchedulePage subjects={subjects} classes={classes} lessons={lessons} rules={scheduleRules} setLessons={setLessons} setRules={setScheduleRules} />} />
            <Route path="/messages" element={<MessagesPage messages={messages} students={students} classes={classes} setMessages={setMessages} />} />
            <Route path="/stats" element={<StatsPage grades={grades} lessons={lessons} students={students} />} />
            <Route path="/settings" element={<SettingsPage classes={classes} subjects={subjects} setSubjects={setSubjects} quarters={quarters} setQuarters={setQuarters} onDataRefresh={loadAllData} />} />
            <Route path="*" element={<Navigate to="/journal" replace />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

const SidebarLink = ({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) => (
  <Link 
    to={to} 
    className="flex items-center gap-3 p-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all duration-200 group"
  >
    <span className="group-hover:scale-110 transition-transform">{icon}</span>
    <span className="font-medium">{label}</span>
  </Link>
);

export default App;
