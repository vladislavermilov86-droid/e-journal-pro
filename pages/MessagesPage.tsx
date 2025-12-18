
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, Users, User, Clock, Search, Filter } from 'lucide-react';
import { Message, Student, Class } from '../types';

interface MessagesPageProps {
  messages: Message[];
  students: Student[];
  classes: Class[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const MessagesPage: React.FC<MessagesPageProps> = ({ messages, students, classes, setMessages }) => {
  const location = useLocation();
  const [targetType, setTargetType] = useState<'student' | 'class'>('student');
  const [selectedTargetId, setSelectedTargetId] = useState('');
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    // Handle state passed from JournalPage
    if (location.state) {
      const { targetId, type } = location.state as { targetId: string, type: 'student' | 'class' };
      if (type) setTargetType(type);
      if (targetId) setSelectedTargetId(targetId);
    }
  }, [location.state]);

  const handleSend = () => {
    if (!selectedTargetId || !messageText.trim()) return;

    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      fromTeacherId: 'teacher-1',
      toStudentId: targetType === 'student' ? selectedTargetId : null,
      classId: targetType === 'class' ? selectedTargetId : (students.find(s => s.id === selectedTargetId)?.classId || ''),
      text: messageText,
      date: new Date().toISOString()
    };

    setMessages(prev => [newMessage, ...prev]);
    setMessageText('');
    alert('Сообщение отправлено!');
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-120px)]">
      {/* Composer */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
          <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
             <Send size={24} className="text-indigo-600" />
             Новое сообщение
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Кому</label>
              <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl mb-4">
                <button 
                  onClick={() => setTargetType('student')}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${targetType === 'student' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
                >
                  Ученик
                </button>
                <button 
                  onClick={() => setTargetType('class')}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${targetType === 'class' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
                >
                  Класс
                </button>
              </div>

              <select 
                value={selectedTargetId}
                onChange={(e) => setSelectedTargetId(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              >
                <option value="">Выберите...</option>
                {targetType === 'student' 
                  ? students.map(s => <option key={s.id} value={s.id}>{s.lastName} {s.firstName}</option>)
                  : classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)
                }
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Текст</label>
              <textarea 
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all h-40"
                placeholder="Ваше сообщение..."
              />
            </div>

            <button 
              onClick={handleSend}
              className="w-full py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-xl hover:bg-indigo-700 transform hover:scale-[1.02] transition-all shadow-2xl shadow-indigo-100 flex items-center justify-center gap-3"
            >
              <Send size={24} />
              Отправить
            </button>
          </div>
        </div>
      </div>

      {/* History */}
      <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
           <h2 className="text-xl font-black text-slate-800">История сообщений</h2>
           <div className="flex items-center gap-2">
             <Filter size={18} className="text-slate-400" />
             <span className="text-sm font-bold text-slate-500">Все</span>
           </div>
        </div>
        
        <div className="flex-1 overflow-auto p-8 space-y-6">
          {messages.length === 0 && (
             <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <Users size={64} className="mb-4 opacity-10" />
                <p className="font-medium">История сообщений пуста</p>
             </div>
          )}
          {messages.map(m => {
            const student = students.find(s => s.id === m.toStudentId);
            const cls = classes.find(c => c.id === m.classId);
            return (
              <div key={m.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 relative group">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    {m.toStudentId ? <User size={16} className="text-indigo-500" /> : <Users size={16} className="text-indigo-500" />}
                    <span className="font-black text-slate-800">
                      {m.toStudentId ? `${student?.lastName} ${student?.firstName}` : `Класс ${cls?.name}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <Clock size={14} />
                    <span className="text-[11px] font-bold">{new Date(m.date).toLocaleString('ru-RU')}</span>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed">{m.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
