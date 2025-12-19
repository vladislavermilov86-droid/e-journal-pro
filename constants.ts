
import { LessonType } from './types.ts';

export const LESSON_TYPE_COLORS: Record<LessonType, string> = {
  [LessonType.NORMAL]: 'bg-white border-slate-200',
  [LessonType.SOR]: 'bg-emerald-50/50 border-emerald-100',
  [LessonType.SOCH]: 'bg-indigo-50/50 border-indigo-100',
  [LessonType.PROJECT]: 'bg-blue-50/50 border-blue-100',
  [LessonType.EXAM]: 'bg-amber-50/50 border-amber-100',
  [LessonType.QUIZ]: 'bg-violet-50/50 border-violet-100',
  [LessonType.CLASSWORK]: 'bg-slate-50/50 border-slate-100',
  [LessonType.HOMEWORK]: 'bg-blue-200 border-blue-300',
  [LessonType.INDEPENDENT]: 'bg-blue-200 border-blue-300',
  [LessonType.PRACTICAL]: 'bg-purple-200 border-purple-300',
};

export const getGradeColor = (points: number | null, maxPoints: number, type: LessonType) => {
  if (points === null) return 'bg-white text-slate-400 border-slate-100 hover:border-indigo-300';

  // СОР 25 баллов
  if (type === LessonType.SOR && maxPoints === 25) {
    if (points >= 22) return 'bg-green-600 text-white border-transparent'; // 5 (88%+)
    if (points >= 19) return 'bg-emerald-400 text-white border-transparent'; // 4 (76%+)
    if (points >= 8) return 'bg-orange-500 text-white border-transparent'; // 3 (32%+)
    return 'bg-red-600 text-white border-transparent'; // 2
  }

  // СОР 50 баллов
  if (type === LessonType.SOR && maxPoints === 50) {
    if (points >= 43) return 'bg-green-600 text-white border-transparent'; // 5 (86%+)
    if (points >= 38) return 'bg-emerald-400 text-white border-transparent'; // 4 (76%+)
    if (points >= 15) return 'bg-orange-500 text-white border-transparent'; // 3 (30%+)
    return 'bg-red-600 text-white border-transparent'; // 2
  }

  // СОЧ 40 баллов
  if (type === LessonType.SOCH && maxPoints === 40) {
    if (points >= 35) return 'bg-green-600 text-white border-transparent'; // 5 (87.5%+)
    if (points >= 30) return 'bg-emerald-400 text-white border-transparent'; // 4 (75%+)
    if (points >= 12) return 'bg-orange-500 text-white border-transparent'; // 3 (30%+)
    return 'bg-red-600 text-white border-transparent'; // 2
  }

  // Стандартная логика для 10 баллов (и прочих ФО)
  const percent = (points / maxPoints) * 100;
  if (percent >= 86) return 'bg-green-600 text-white border-transparent shadow-sm'; // 5
  if (percent >= 75) return 'bg-emerald-400 text-white border-transparent shadow-sm'; // 4 (8 баллов и выше)
  if (percent >= 30) return 'bg-orange-500 text-white border-transparent shadow-sm'; // 3 (7 баллов будет тут, так как 70% < 75%)
  return 'bg-red-600 text-white border-transparent shadow-sm'; // 2
};

export const getPercentageColor = (percent: number) => {
  if (percent >= 86) return 'text-green-600'; // 5 (86-100%)
  if (percent >= 75) return 'text-emerald-500'; // 4 (75-85%)
  if (percent >= 30) return 'text-orange-500'; // 3 (30-74%)
  return 'text-red-600'; // 2 (0-29%)
};

export const getQuarterMarkColor = (mark: string | number | null) => {
  const m = typeof mark === 'string' ? parseInt(mark) : mark;
  if (m === 5) return 'bg-green-600 text-white border-transparent shadow-md';
  if (m === 4) return 'bg-emerald-500 text-white border-transparent shadow-md';
  if (m === 3) return 'bg-orange-500 text-white border-transparent shadow-md';
  if (m === 2) return 'bg-red-600 text-white border-transparent shadow-md';
  return 'bg-white text-slate-300 border-slate-200 hover:border-indigo-400';
};

export const DEFAULT_MAX_POINTS: Record<LessonType, number> = {
  [LessonType.NORMAL]: 10,
  [LessonType.SOR]: 25,
  [LessonType.SOCH]: 40,
  [LessonType.PROJECT]: 50,
  [LessonType.EXAM]: 50,
  [LessonType.QUIZ]: 20,
  [LessonType.CLASSWORK]: 10,
  [LessonType.HOMEWORK]: 10,
  [LessonType.INDEPENDENT]: 10,
  [LessonType.PRACTICAL]: 10,
};
