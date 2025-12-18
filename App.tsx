
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { 
  Users, BookOpen, Calendar, Mail, Settings, LogOut, 
  BarChart2, CloudIcon, RefreshCw
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

// Улучшенный загрузчик API
const apiRequest = async (endpoint: string, method: string = 'GET', body?: any) => {
  try {
    const response = await fetch(`/api/${endpoint}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Ошибка сервера: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    return null;
  }
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  
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
    const [
      remoteClasses, 
      remoteStudents, 
      remoteSubjects, 
      remoteLessons, 
      remoteGrades, 
      remoteQuarters
    ] = await Promise.all([
      apiRequest('classes'),
      apiRequest('students'),
      apiRequest('subjects'),
      apiRequest('lessons'),
      apiRequest('grades'),
      apiRequest('quarters')
    ]);

    // Если API не отвечает (локальная разработка без бэкенда), используем моки
    setClasses(remoteClasses || initialClasses);
    setStudents(remoteStudents || initialStudents);
    setSubjects(remoteSubjects || initialSubjects);
    setLessons(remoteLessons || initialLessons);
    setGrades(remoteGrades || initialGrades);
    setQuarters(remoteQuarters || initialQuarters);
    
    setIsSyncing(false);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, loadAllData]);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Вспомогательные функции для синхронизации с базой
  const syncGrade = async (grade: GradeCell) => {
    setIsSyncing(true);
    const result = await apiRequest('grades', 'POST', grade);
    if (result) {
      setGrades(prev => {
        const idx = prev.findIndex(g => g.id === grade.id);
        if (idx !== -1) {
          const next = [...prev];
          next[idx] = result;
          return next;
        }
        return [...prev, result];
      });
    }
    setIsSyncing(false);
  };

  const syncLesson = async (lesson: Lesson, isDelete: boolean = false) => {
    setIsSyncing(true);
    const result = await apiRequest('lessons', isDelete ? 'DELETE' : 'POST', lesson);
    if (isDelete) {
      setLessons(prev => prev.filter(l => l.id !== lesson.id));
    } else if (result) {
      setLessons(prev => {
        const idx = prev.findIndex(l => l.id === lesson.id);
        if (idx !== -1) {
          const next = [...prev];
          next[idx] = result;
          return next;
        }
        return [...prev, result];
      });
    }
    setIsSyncing(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-slate-800">E-Journal Pro</h2>
            <p className="font-medium text-slate-500">Подключение к Neon DB...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  const Sidebar = () => (
    <div className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col shadow-sm z-40">
      <div className="p-6 border-b border-slate-100 flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-lg text-white">
          <BookOpen size={24} />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-800">E-Journal <span className="text-indigo-600">Pro</span></span>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <SidebarLink to="/journal" icon={<BookOpen size={20} />} label="Журнал" />
        <SidebarLink to="/classes" icon={<Users size={20} />} label="Классы" />
        <SidebarLink to="/schedule" icon={<Calendar size={20} />} label="Расписание" />
        <SidebarLink to="/stats" icon={<BarChart2 size={20} />} label="Аналитика" />
        <SidebarLink to="/messages" icon={<Mail size={20} />} label="Сообщения" />
        <SidebarLink to="/settings" icon={<Settings size={20} />} label="Настройки" />
      </nav>

      <div className="p-4 border-t border-slate-100 space-y-4">
        <button 
          onClick={loadAllData}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all w-full ${isSyncing ? 'text-amber-600 bg-amber-50 cursor-wait' : 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100'}`}
        >
          {isSyncing ? <RefreshCw className="animate-spin" size={14} /> : <CloudIcon size={14} />}
          {isSyncing ? 'Обновление...' : 'Синхронизировано'}
        </button>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-3 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Выйти</span>
        </button>
      </div>
    </div>
  );

  const SidebarLink = ({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) => (
    <Link 
      to={to} 
      className="flex items-center gap-3 p-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all duration-200 group"
    >
      <span className="group-hover:scale-110 transition-transform">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );

  return (
    <HashRouter>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">
          <Routes>
            <Route path="/journal" element={
              <JournalPage 
                classes={classes} 
                subjects={subjects} 
                students={students} 
                lessons={lessons} 
                grades={grades}
                quarters={quarters}
                setLessons={setLessons}
                setGrades={setGrades}
                onGradeUpdate={syncGrade}
                onLessonSave={syncLesson}
              />
            } />
            {/* FIX: Removed onSync prop from ClassesPage as it's not defined in its props interface */}
            <Route path="/classes" element={
              <ClassesPage 
                classes={classes} 
                students={students} 
                setClasses={setClasses} 
                setStudents={setStudents}
              />
            } />
            <Route path="/schedule" element={
              <SchedulePage 
                subjects={subjects} 
                classes={classes}
                lessons={lessons}
                rules={scheduleRules}
                setLessons={setLessons}
                setRules={setScheduleRules}
              />
            } />
            <Route path="/messages" element={
              <MessagesPage 
                messages={messages} 
                students={students} 
                classes={classes}
                setMessages={setMessages} 
              />
            } />
            <Route path="/stats" element={
              <StatsPage 
                grades={grades} 
                lessons={lessons} 
                students={students} 
              />
            } />
            <Route path="/settings" element={
              <SettingsPage 
                classes={classes}
                subjects={subjects}
                setSubjects={setSubjects}
                quarters={quarters}
                setQuarters={setQuarters}
              />
            } />
            <Route path="*" element={<Navigate to="/journal" replace />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
