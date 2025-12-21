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
  if (points === 0) return 'bg-slate-200 text-slate-500 border-transparent';

  // СОР 25 баллов
  if (type === LessonType.SOR && maxPoints === 25) {
    if (points >= 22) return 'bg-green-600 text-white border-transparent shadow-sm'; // 22-25 ярко-зеленый
    if (points >= 17) return 'bg-emerald-500 text-white border-transparent shadow-sm'; // 17-21 зеленый
    if (points >= 8) return 'bg-orange-500 text-white border-transparent shadow-sm'; // 8-16 оранжевый
    return 'bg-red-600 text-white border-transparent shadow-sm'; // 1-7 красный
  }

  // СОР 50 баллов
  if (type === LessonType.SOR && maxPoints === 50) {
    if (points >= 43) return 'bg-green-600 text-white border-transparent shadow-sm'; // 43-50 ярко-зеленый
    if (points >= 33) return 'bg-emerald-500 text-white border-transparent shadow-sm'; // 33-42 зеленый
    if (points >= 15) return 'bg-orange-500 text-white border-transparent shadow-sm'; // 15-32 оранжевый
    return 'bg-red-600 text-white border-transparent shadow-sm'; // 1-14 красный
  }

  // СОЧ 40 баллов
  if (type === LessonType.SOCH && maxPoints === 40) {
    if (points >= 36) return 'bg-green-600 text-white border-transparent shadow-sm'; // 36-40 ярко-зеленый
    if (points >= 27) return 'bg-emerald-500 text-white border-transparent shadow-sm'; // 27-35 зеленый
    if (points >= 12) return 'bg-orange-500 text-white border-transparent shadow-sm'; // 12-26 оранжевый
    return 'bg-red-600 text-white border-transparent shadow-sm'; // 1-11 красный
  }

  // Стандартная логика (10 баллов)
  if (maxPoints === 10) {
    if (points >= 9) return 'bg-green-600 text-white border-transparent shadow-sm'; // 9-10 ярко-зеленый
    if (points >= 8) return 'bg-emerald-500 text-white border-transparent shadow-sm'; // 8 зеленый
    if (points >= 5) return 'bg-orange-500 text-white border-transparent shadow-sm'; // 5-7 оранжевый
    return 'bg-red-600 text-white border-transparent shadow-sm'; // 1-4 красный
  }

  // Универсальная логика по процентам для остальных случаев (например, тесты на 15, 20 баллов)
  const percent = (points / maxPoints) * 100;
  if (percent >= 86) return 'bg-green-600 text-white border-transparent shadow-sm';
  if (percent >= 66) return 'bg-emerald-500 text-white border-transparent shadow-sm';
  if (percent >= 30) return 'bg-orange-500 text-white border-transparent shadow-sm';
  return 'bg-red-600 text-white border-transparent shadow-sm';
};

export const getPercentageColor = (percent: number) => {
  // Новая логика по запросу пользователя:
  if (percent >= 86) return 'text-green-600'; // 100–86 % (как 10 зеленым)
  if (percent >= 66) return 'text-emerald-500'; // 85–66 % (как 8 зеленым)
  if (percent >= 30) return 'text-orange-500'; // 65–30 % (как 3 оранжевым)
  return 'text-red-600'; // 29–0 % (как 2 красным)
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