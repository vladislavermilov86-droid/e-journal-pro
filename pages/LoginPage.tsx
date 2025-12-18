
import React, { useState } from 'react';
import { BookOpen, ShieldCheck } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [login, setLogin] = useState('Vladislav');
  const [password, setPassword] = useState('Vladislav15');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login === 'Vladislav' && password === 'Vladislav15') {
      // ИЗМЕНЕНИЕ: Не сохраняем в localStorage, чтобы требовать ввод пароля каждый раз
      onLogin();
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-4">
      <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-indigo-600 p-4 rounded-2xl text-white mb-6 shadow-lg shadow-indigo-200">
            <BookOpen size={40} />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">E-Journal Pro</h1>
          <p className="text-slate-500 mt-2">Панель управления учителя</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Логин</label>
            <input 
              type="text" 
              className="w-full px-5 py-4 rounded-2xl border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all border shadow-sm"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Пароль</label>
            <input 
              type="password" 
              className="w-full px-5 py-4 rounded-2xl border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all border shadow-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transform hover:-translate-y-1 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2"
          >
            <ShieldCheck size={20} />
            Войти
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Single Teacher Access Only</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
