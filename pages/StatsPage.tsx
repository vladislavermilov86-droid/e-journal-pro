
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { GradeCell, Lesson, Student, AttendanceStatus } from '../types';
import { Users, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface StatsPageProps {
  grades: GradeCell[];
  lessons: Lesson[];
  students: Student[];
}

const StatsPage: React.FC<StatsPageProps> = ({ grades, lessons, students }) => {
  const stats = useMemo(() => {
    const presentCount = grades.filter(g => g.attendance === AttendanceStatus.PRESENT).length;
    const absentCount = grades.filter(g => g.attendance === AttendanceStatus.ABSENT).length;
    const excusedCount = grades.filter(g => g.attendance === AttendanceStatus.EXCUSED).length;
    const total = presentCount + absentCount + excusedCount || 1;

    const pieData = [
      { name: 'Присутствие', value: presentCount, color: '#10b981' },
      { name: 'Отсутствие', value: absentCount, color: '#ef4444' },
      { name: 'Уважительные', value: excusedCount, color: '#f59e0b' },
    ];

    const studentStats = students.map(s => {
      const sGrades = grades.filter(g => g.studentId === s.id);
      const sAbsent = sGrades.filter(g => g.attendance === AttendanceStatus.ABSENT).length;
      return {
        name: s.lastName,
        absent: sAbsent
      };
    }).sort((a, b) => b.absent - a.absent).slice(0, 10);

    return { pieData, studentStats, totals: { present: presentCount, absent: absentCount, excused: excusedCount, total } };
  }, [grades, students]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={<CheckCircle size={24} />} 
          title="Присутствие" 
          value={stats.totals.present} 
          color="text-green-600" 
          bgColor="bg-green-50" 
          percent={Math.round((stats.totals.present / stats.totals.total) * 100)}
        />
        <StatCard 
          icon={<XCircle size={24} />} 
          title="Пропуски" 
          value={stats.totals.absent} 
          color="text-red-600" 
          bgColor="bg-red-50" 
          percent={Math.round((stats.totals.absent / stats.totals.total) * 100)}
        />
        <StatCard 
          icon={<AlertCircle size={24} />} 
          title="Уважительные" 
          value={stats.totals.excused} 
          color="text-amber-600" 
          bgColor="bg-amber-50" 
          percent={Math.round((stats.totals.excused / stats.totals.total) * 100)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
          <h3 className="text-xl font-black text-slate-800 mb-8">Общая статистика</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {stats.pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
          <h3 className="text-xl font-black text-slate-800 mb-8">Анти-рейтинг прогулов</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.studentStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="absent" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, color, bgColor, percent }: any) => (
  <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6">
    <div className={`${bgColor} ${color} p-5 rounded-3xl shadow-lg`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{title}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-black text-slate-800">{value}</span>
        <span className={`text-xs font-bold ${color}`}>{percent}%</span>
      </div>
    </div>
  </div>
);

export default StatsPage;
