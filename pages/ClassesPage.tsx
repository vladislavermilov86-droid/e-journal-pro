
import React, { useState } from 'react';
import { Plus, Trash2, UserPlus, Users, RefreshCw } from 'lucide-react';
import { Class, Student } from '../types';

interface ClassesPageProps {
  classes: Class[];
  students: Student[];
  setClasses: React.Dispatch<React.SetStateAction<Class[]>>;
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

const ClassesPage: React.FC<ClassesPageProps> = ({ classes, students, setClasses, setStudents }) => {
  const [activeClassId, setActiveClassId] = useState(classes[0]?.id || '');
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({ firstName: '', lastName: '', studentId: '' });

  const activeClassStudents = students.filter(s => s.classId === activeClassId);

  const apiRequest = async (endpoint: string, method: string, body?: any) => {
    try {
      const response = await fetch(`/api/${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
      });
      if (!response.ok) throw new Error('Ошибка сервера');
      return await response.json();
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      alert('Ошибка при синхронизации с базой данных. Попробуйте еще раз.');
      return null;
    }
  };

  const handleAddClass = async () => {
    if (!newClassName.trim()) return;
    setIsSyncing(true);
    const newClass = { id: Math.random().toString(36).substr(2, 9), name: newClassName };
    
    const result = await apiRequest('classes', 'POST', newClass);
    if (result) {
      setClasses(prev => [...prev, newClass]);
      setActiveClassId(newClass.id);
      setNewClassName('');
      setIsAddingClass(false);
    }
    setIsSyncing(false);
  };

  const handleDeleteClass = async (id: string) => {
    if (!confirm('Удалить класс и всех его учеников? Это действие необратимо.')) return;
    
    setIsSyncing(true);
    const result = await fetch(`/api/classes?id=${id}`, { method: 'DELETE' });
    if (result.ok) {
      setClasses(prev => prev.filter(c => c.id !== id));
      setStudents(prev => prev.filter(s => s.classId !== id));
      if (activeClassId === id) setActiveClassId(classes.find(c => c.id !== id)?.id || '');
    } else {
      alert('Не удалось удалить класс из базы данных.');
    }
    setIsSyncing(false);
  };

  const handleAddStudent = async () => {
    if (!newStudent.firstName || !newStudent.lastName) return;
    setIsSyncing(true);
    const student = { 
      ...newStudent, 
      id: Math.random().toString(36).substr(2, 9), 
      classId: activeClassId 
    };

    const result = await apiRequest('students', 'POST', student);
    if (result) {
      setStudents(prev => [...prev, student]);
      setNewStudent({ firstName: '', lastName: '', studentId: '' });
      setIsAddingStudent(false);
    }
    setIsSyncing(false);
  };

  const handleDeleteStudent = async (id: string) => {
    if (!confirm('Удалить ученика?')) return;
    
    setIsSyncing(true);
    const result = await fetch(`/api/students?id=${id}`, { method: 'DELETE' });
    if (result.ok) {
      setStudents(prev => prev.filter(st => st.id !== id));
    } else {
      alert('Не удалось удалить ученика из базы данных.');
    }
    setIsSyncing(false);
  };

  return (
    <div className="flex gap-8 h-full">
      {/* Sidebar with Classes */}
      <div className="w-80 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Мои классы</h2>
            {isSyncing && <RefreshCw size={14} className="animate-spin text-indigo-500" />}
          </div>
          <button 
            onClick={() => setIsAddingClass(true)}
            className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-all"
            disabled={isSyncing}
          >
            <Plus size={20} />
          </button>
        </div>

        {isAddingClass && (
          <div className="p-4 bg-white rounded-2xl shadow-lg border border-indigo-100 animate-in slide-in-from-top-2 duration-200">
            <input 
              autoFocus
              className="w-full px-3 py-2 bg-slate-50 border rounded-lg outline-none mb-2"
              placeholder="Напр: 10Б"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddClass()}
              disabled={isSyncing}
            />
            <div className="flex gap-2">
               <button onClick={handleAddClass} disabled={isSyncing} className="flex-1 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold disabled:opacity-50">
                 {isSyncing ? '...' : 'ОК'}
               </button>
               <button onClick={() => setIsAddingClass(false)} className="flex-1 py-2 bg-slate-100 text-slate-500 rounded-lg text-sm font-bold">Отмена</button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {classes.map(c => (
            <div 
              key={c.id}
              onClick={() => !isSyncing && setActiveClassId(c.id)}
              className={`p-4 rounded-2xl cursor-pointer flex items-center justify-between group transition-all ${
                activeClassId === c.id 
                  ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 scale-[1.02]' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 shadow-sm border border-slate-100'
              } ${isSyncing ? 'pointer-events-none opacity-80' : ''}`}
            >
              <div className="flex items-center gap-3">
                <Users size={20} />
                <span className="font-bold">{c.name}</span>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); handleDeleteClass(c.id); }}
                className={`opacity-0 group-hover:opacity-100 p-1 rounded-lg transition-all ${activeClassId === c.id ? 'hover:bg-indigo-500' : 'hover:bg-red-50 text-red-500'}`}
                disabled={isSyncing}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content with Students */}
      <div className="flex-1 bg-white rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-800">Список учеников</h2>
            <p className="text-slate-400 font-medium">Управление составом класса {classes.find(c => c.id === activeClassId)?.name}</p>
          </div>
          <button 
            onClick={() => setIsAddingStudent(true)}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50"
            disabled={!activeClassId || isSyncing}
          >
            <UserPlus size={20} />
            Добавить ученика
          </button>
        </div>

        <div className="p-8 flex-1 overflow-auto">
          {isAddingStudent && (
            <div className="mb-8 p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-indigo-200 grid grid-cols-3 gap-4 animate-in fade-in duration-300">
               <input 
                placeholder="Фамилия"
                className="p-3 border rounded-xl outline-none"
                value={newStudent.lastName}
                onChange={(e) => setNewStudent({...newStudent, lastName: e.target.value})}
                disabled={isSyncing}
               />
               <input 
                placeholder="Имя"
                className="p-3 border rounded-xl outline-none"
                value={newStudent.firstName}
                onChange={(e) => setNewStudent({...newStudent, firstName: e.target.value})}
                disabled={isSyncing}
               />
               <div className="flex gap-2">
                 <input 
                  placeholder="ID"
                  className="flex-1 p-3 border rounded-xl outline-none"
                  value={newStudent.studentId}
                  onChange={(e) => setNewStudent({...newStudent, studentId: e.target.value})}
                  disabled={isSyncing}
                 />
                 <button onClick={handleAddStudent} disabled={isSyncing} className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold">
                   {isSyncing ? '...' : 'ОК'}
                 </button>
                 <button onClick={() => setIsAddingStudent(false)} className="px-4 py-2 bg-slate-200 text-slate-600 rounded-xl font-bold">Х</button>
               </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeClassStudents.length === 0 && !isAddingStudent && (
              <div className="col-span-full py-20 text-center text-slate-400 font-medium">
                В этом классе пока нет учеников
              </div>
            )}
            {activeClassStudents.map(s => (
              <div key={s.id} className="p-5 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-all group flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-100 p-3 rounded-2xl text-slate-400">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{s.lastName} {s.firstName}</h4>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{s.studentId}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleDeleteStudent(s.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  disabled={isSyncing}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassesPage;
