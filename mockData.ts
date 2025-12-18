
import { AttendanceStatus, LessonType, Student, Class, Subject, Lesson, GradeCell, Quarter } from './types';

const CLASS_9V_ID = 'class-9v';
const ALG_ID = 'subject-alg';

export const initialClasses: Class[] = [
  { id: CLASS_9V_ID, name: '9В' }
];

export const initialSubjects: Subject[] = [
  { id: ALG_ID, name: 'Алгебра' }
];

export const initialStudents: Student[] = [
  { id: 's1', firstName: 'Самира', lastName: 'Дилмуродова', studentId: 'ID001', classId: CLASS_9V_ID },
  { id: 's2', firstName: 'Ангелина', lastName: 'Ельчанина', studentId: 'ID002', classId: CLASS_9V_ID },
  { id: 's3', firstName: 'Владислав', lastName: 'Ермилов', studentId: 'ID003', classId: CLASS_9V_ID },
  { id: 's4', firstName: 'Тохир', lastName: 'Исаев', studentId: 'ID004', classId: CLASS_9V_ID },
  { id: 's5', firstName: 'Камила', lastName: 'Каримова', studentId: 'ID005', classId: CLASS_9V_ID },
  { id: 's6', firstName: 'Кристина', lastName: 'Костромитина', studentId: 'ID006', classId: CLASS_9V_ID },
  { id: 's7', firstName: 'Юлианна', lastName: 'Ляпина', studentId: 'ID007', classId: CLASS_9V_ID },
  { id: 's8', firstName: 'Денис', lastName: 'Иванов', studentId: 'ID008', classId: CLASS_9V_ID },
  { id: 's9', firstName: 'Дониёр', lastName: 'Колонов', studentId: 'ID009', classId: CLASS_9V_ID },
  { id: 's10', firstName: 'Маша', lastName: 'Маркова', studentId: 'ID010', classId: CLASS_9V_ID },
  { id: 's11', firstName: 'Маша', lastName: 'Платонова', studentId: 'ID011', classId: CLASS_9V_ID },
  { id: 's12', firstName: 'Даша', lastName: 'Сасновская', studentId: 'ID012', classId: CLASS_9V_ID },
  { id: 's13', firstName: 'Даша', lastName: 'Тупик', studentId: 'ID013', classId: CLASS_9V_ID },
  { id: 's14', firstName: 'Даша', lastName: 'Рысенко', studentId: 'ID014', classId: CLASS_9V_ID },
  { id: 's15', firstName: 'Аюбхон', lastName: 'Саидкаримов', studentId: 'ID015', classId: CLASS_9V_ID },
  { id: 's16', firstName: 'Мумтоза', lastName: 'Баходирова', studentId: 'ID016', classId: CLASS_9V_ID },
  { id: 's17', firstName: 'Шухрат', lastName: 'Низамутдинов', studentId: 'ID017', classId: CLASS_9V_ID },
  { id: 's18', firstName: 'Амир', lastName: 'Эргашев', studentId: 'ID018', classId: CLASS_9V_ID },
  { id: 's19', firstName: 'Даша', lastName: 'Юхнова', studentId: 'ID019', classId: CLASS_9V_ID },
  { id: 's20', firstName: 'Лера', lastName: 'Уколова', studentId: 'ID020', classId: CLASS_9V_ID },
  { id: 's21', firstName: 'Улугбек', lastName: 'Абдурахманов', studentId: 'ID021', classId: CLASS_9V_ID },
  { id: 's22', firstName: 'Игорь', lastName: 'Чергинский', studentId: 'ID022', classId: CLASS_9V_ID },
  { id: 's23', firstName: 'Дима', lastName: 'Панченко', studentId: 'ID023', classId: CLASS_9V_ID },
  { id: 's24', firstName: 'Самир', lastName: 'Андрианов', studentId: 'ID024', classId: CLASS_9V_ID },
  { id: 's25', firstName: 'Давид', lastName: 'Саркисов', studentId: 'ID025', classId: CLASS_9V_ID },
  { id: 's26', firstName: 'Тигран', lastName: 'Суинов', studentId: 'ID026', classId: CLASS_9V_ID },
  { id: 's27', firstName: 'Робия', lastName: 'Саидова', studentId: 'ID027', classId: CLASS_9V_ID },
  { id: 's28', firstName: 'Алина', lastName: 'Юсупова', studentId: 'ID028', classId: CLASS_9V_ID },
  { id: 's29', firstName: 'Арина', lastName: 'Чепрасова', studentId: 'ID029', classId: CLASS_9V_ID },
  { id: 's30', firstName: 'Артем', lastName: 'Тихонов', studentId: 'ID030', classId: CLASS_9V_ID },
  { id: 's31', firstName: 'Алишер', lastName: 'Ташмирзаев', studentId: 'ID031', classId: CLASS_9V_ID },
  { id: 's32', firstName: 'Оксана', lastName: 'Николенко', studentId: 'ID032', classId: CLASS_9V_ID },
  { id: 's33', firstName: 'Ангелина', lastName: 'Кондратьева', studentId: 'ID033', classId: CLASS_9V_ID },
  { id: 's34', firstName: 'Лия', lastName: 'Ким', studentId: 'ID034', classId: CLASS_9V_ID },
  { id: 's35', firstName: 'Вероника', lastName: 'Ким', studentId: 'ID035', classId: CLASS_9V_ID },
];

export const initialQuarters: Quarter[] = [
  { id: 'q1', subjectId: ALG_ID, name: '1 Четверть', startDate: '2025-10-09', endDate: '2025-11-03' },
  { id: 'q2', subjectId: ALG_ID, name: '2 Четверть', startDate: '2025-11-23', endDate: '2025-12-27' }
];

export const initialLessons: Lesson[] = [
  { id: 'l1', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2025-10-09', type: LessonType.NORMAL, topic: 'Метод интервалов', homework: 'Д/З: Повторить прошлые темы', maxPoints: 10 },
  { id: 'l2', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2025-10-12', type: LessonType.NORMAL, topic: 'Метод интервалов (Часть 2)', homework: 'Д/З: Стр 36, №71 (2,3,4)', maxPoints: 10 },
  { id: 'l3', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2025-10-14', type: LessonType.NORMAL, topic: 'Область определения функции', homework: 'Д/З: стр 36, № 73 (2,3,4,6)', maxPoints: 10 },
  { id: 'l4', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2025-10-16', type: LessonType.NORMAL, topic: 'Область определения функции (2 часть)', homework: 'Д/З: №81', maxPoints: 10 },
  { id: 'l5', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2025-10-21', type: LessonType.NORMAL, topic: 'Четность и нечетность функции', homework: 'Д/З: Просмотреть тему', maxPoints: 10 },
  { id: 'l6', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2025-10-23', type: LessonType.NORMAL, topic: 'Неравенства и уравнения, содержащие степень', homework: 'Д/З: Стр 49, №101', maxPoints: 10 },
  { id: 'l7', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2025-10-26', type: LessonType.NORMAL, topic: 'Подготовка к СОР', homework: 'Д/З:', maxPoints: 10 },
  { id: 'l8', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2025-10-28', type: LessonType.SOR, topic: 'СОР', homework: 'Д/З: Подготовка к СОР', maxPoints: 50 },
  { id: 'l9', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2025-11-03', type: LessonType.SOCH, topic: 'СОЧ', homework: 'Д/З: Повторение', maxPoints: 40 },
  { id: 'l10', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2025-11-23', type: LessonType.NORMAL, topic: 'Четверть 2/Подготовка к СОР 1', homework: 'Д/З: Повторить решения', maxPoints: 10 },
  { id: 'l11', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2025-11-24', type: LessonType.SOR, topic: 'СОР 2', homework: 'Д/З: Решать задачи', maxPoints: 25 },
  { id: 'l12', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2025-12-14', type: LessonType.NORMAL, topic: 'Теорема Виета', homework: 'Д/З: Дискриминант', maxPoints: 10 },
  { id: 'l13', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2025-12-16', type: LessonType.NORMAL, topic: 'Поворот точки', homework: 'Д/З: Уравнения', maxPoints: 10 },
  { id: 'l14', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2025-12-27', type: LessonType.SOCH, topic: 'СОЧ 2', homework: 'Д/З: Итоги', maxPoints: 40 },
];

const createGrade = (lessonId: string, studentId: string, val: number | 'H' | 'P' | null) => {
  let attendance = AttendanceStatus.PRESENT;
  let points: number | null = null;
  let attendanceNote = undefined;
  if (val === 'H') attendance = AttendanceStatus.ABSENT;
  else if (val === 'P') {
    attendance = AttendanceStatus.EXCUSED;
    attendanceNote = 'По уважительной причине';
  } else if (typeof val === 'number') points = val;
  return { id: `g-${lessonId}-${studentId}`, lessonId, studentId, points, attendance, attendanceNote };
};

export const initialGrades: GradeCell[] = [
  createGrade('l1', 's1', 7), createGrade('l1', 's3', 10), createGrade('l1', 's5', 10),
  createGrade('l8', 's3', 50), createGrade('l9', 's3', 40),
  createGrade('l11', 's3', 25), createGrade('l14', 's3', 38)
];
