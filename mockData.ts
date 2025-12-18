
import { AttendanceStatus, LessonType, Student, Class, Subject, Lesson, GradeCell, Quarter } from './types';

const CLASS_9V_ID = 'class-9v';
const ALG_ID = 'subject-alg';

export const initialClasses: Class[] = [
  { id: CLASS_9V_ID, name: '9В' }
];

export const initialSubjects: Subject[] = [
  { id: ALG_ID, name: 'Алгебра' }
];

// Полный список учеников с привязкой к 9В
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

// Уроки
export const initialLessons: Lesson[] = [
  { id: 'l1', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2024-10-09', type: LessonType.NORMAL, topic: 'Метод интервалов', homework: 'Д/З: Повторить прошлые темы', maxPoints: 10 },
  { id: 'l2', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2024-10-12', type: LessonType.NORMAL, topic: 'Метод интервалов (Часть 2)', homework: 'Д/З: Стр 36, №71 (2,3,4)', maxPoints: 10 },
  { id: 'l3', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2024-10-14', type: LessonType.NORMAL, topic: 'Область определения функции', homework: 'Д/З: стр 36, № 73 (2,3,4,6)', maxPoints: 10 },
  { id: 'l4', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2024-10-16', type: LessonType.NORMAL, topic: 'Область определения функции (2 часть)', homework: 'Д/З: №81', maxPoints: 10 },
  { id: 'l5', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2024-10-21', type: LessonType.NORMAL, topic: 'Четность и нечетность функции', homework: 'Д/З: Просмотреть тему', maxPoints: 10 },
  { id: 'l6', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2024-10-23', type: LessonType.NORMAL, topic: 'Неравенства и уравнения, содержащие степень', homework: 'Д/З: Стр 49, №101', maxPoints: 10 },
  { id: 'l7', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2024-10-26', type: LessonType.NORMAL, topic: 'Подготовка к СОР (Решение Демо-Сор)', homework: 'Д/З:', maxPoints: 10 },
  { id: 'l8', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2024-10-28', type: LessonType.SOR, topic: 'СОР (Суммативное оценивание за раздел)', homework: 'Д/З: Подготовка к СОР', maxPoints: 50 },
  { id: 'l9', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2024-11-03', type: LessonType.SOCH, topic: 'СОЧ (Суммативное оценивание за четверть)', homework: 'Д/З: Повторение', maxPoints: 40 },
  { id: 'l10', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2024-11-23', type: LessonType.NORMAL, topic: 'Четверть 2/Подготовка к СОР 1', homework: 'Д/З: Повторить, выучить решения неравенства', maxPoints: 10 },
  { id: 'l11', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2024-11-24', type: LessonType.SOR, topic: 'СОР (Суммативное оценивание за раздел)', homework: 'Д/З: Решать задачи', maxPoints: 25 },
  { id: 'l12', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2024-11-27', type: LessonType.NORMAL, topic: 'Доказательство неравенств/повторение главы', homework: 'Д/З: Учить тему', maxPoints: 10 },
  { id: 'l13', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2024-11-28', type: LessonType.INDEPENDENT, topic: 'Самостоятельная работа. Повторение главы', homework: 'Д/З: Стр 84, №193', maxPoints: 10 },
  { id: 'l14', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2024-12-14', type: LessonType.NORMAL, topic: 'Повторение (Теорема Виета)', homework: 'Д/З: Повторить что такое Дискриминант', maxPoints: 10 },
  { id: 'l15', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2024-12-16', type: LessonType.NORMAL, topic: 'Поворот точки вокруг начала координат...', homework: 'Д/З: Составить 3 уравнения и решить их по Теореме Виета', maxPoints: 10 },
  { id: 'l16', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2024-12-17', type: LessonType.NORMAL, topic: 'Тема не задана', homework: 'Д/З: стр 108, №234', maxPoints: 10 },
];

const createGrade = (lessonId: string, studentId: string, val: number | 'H' | 'P' | null) => {
  let attendance = AttendanceStatus.PRESENT;
  let points: number | null = null;
  let attendanceNote = undefined;

  if (val === 'H') {
    attendance = AttendanceStatus.ABSENT;
  } else if (val === 'P') {
    attendance = AttendanceStatus.EXCUSED;
    attendanceNote = 'По уважительной причине (Clock)';
  } else if (typeof val === 'number') {
    points = val;
  }

  return {
    id: `g-${lessonId}-${studentId}`,
    lessonId,
    studentId,
    points,
    attendance,
    attendanceNote
  };
};

export const initialGrades: GradeCell[] = [
  // 09.10
  createGrade('l1', 's1', 7), createGrade('l1', 's3', 10), createGrade('l1', 's5', 10), createGrade('l1', 's7', 10), 
  createGrade('l1', 's11', 10), createGrade('l1', 's15', 4), createGrade('l1', 's18', 10), createGrade('l1', 's21', 'H'), 
  createGrade('l1', 's24', 8), createGrade('l1', 's27', 7), createGrade('l1', 's30', 9), createGrade('l1', 's32', 10), 
  createGrade('l1', 's34', 10),

  // 12.10
  createGrade('l2', 's2', 10), createGrade('l2', 's3', 10), createGrade('l2', 's4', 'P'), createGrade('l2', 's6', 8), 
  createGrade('l2', 's8', 10), createGrade('l2', 's9', 6), createGrade('l2', 's10', 10), createGrade('l2', 's12', 10), 
  createGrade('l2', 's13', 9), createGrade('l2', 's14', 9), createGrade('l2', 's16', 6), createGrade('l2', 's17', 10), 
  createGrade('l2', 's19', 9), createGrade('l2', 's22', 6), createGrade('l2', 's25', 9), createGrade('l2', 's28', 10), 
  createGrade('l2', 's31', 6), createGrade('l2', 's33', 9), createGrade('l2', 's35', 10),

  // 14.10
  createGrade('l3', 's3', 10), createGrade('l3', 's5', 10), createGrade('l3', 's7', 10), createGrade('l3', 's11', 10), 
  createGrade('l3', 's15', 7), createGrade('l3', 's18', 9), createGrade('l3', 's20', 9), createGrade('l3', 's23', 9), 
  createGrade('l3', 's26', 8), createGrade('l3', 's29', 8),

  // 16.10
  createGrade('l4', 's1', 5), createGrade('l4', 's2', 10), createGrade('l4', 's3', 10), createGrade('l4', 's4', 5), 
  createGrade('l4', 's6', 10), createGrade('l4', 's8', 10), createGrade('l4', 's12', 10), createGrade('l4', 's16', 5), 
  createGrade('l4', 's21', 'H'), createGrade('l4', 's22', 5), createGrade('l4', 's23', 9), createGrade('l4', 's24', 10), 
  createGrade('l4', 's25', 10), createGrade('l4', 's26', 8), createGrade('l4', 's27', 5), createGrade('l4', 's28', 10), 
  createGrade('l4', 's30', 5), createGrade('l4', 's32', 10), createGrade('l4', 's34', 10), createGrade('l4', 's35', 10),

  // 21.10
  createGrade('l5', 's1', 7), createGrade('l5', 's3', 10), createGrade('l5', 's5', 10), createGrade('l5', 's7', 10), 
  createGrade('l5', 's9', 5), createGrade('l5', 's10', 10), createGrade('l5', 's13', 9), createGrade('l5', 's17', 10), 
  createGrade('l5', 's19', 9), createGrade('l5', 's21', 'H'), createGrade('l5', 's22', 5), createGrade('l5', 's23', 9), 
  createGrade('l5', 's26', 7), createGrade('l5', 's27', 5), createGrade('l5', 's29', 9), createGrade('l5', 's32', 10), 
  createGrade('l5', 's33', 9),

  // 23.10
  createGrade('l6', 's2', 10), createGrade('l6', 's3', 10), createGrade('l6', 's4', 5), createGrade('l6', 's6', 10), 
  createGrade('l6', 's9', 9), createGrade('l6', 's11', 10), createGrade('l6', 's14', 10), createGrade('l6', 's16', 5), 
  createGrade('l6', 's18', 10), createGrade('l6', 's20', 10), createGrade('l6', 's21', 'H'), createGrade('l6', 's24', 5), 
  createGrade('l6', 's27', 5), createGrade('l6', 's30', 10), createGrade('l6', 's34', 10),

  // 26.10
  createGrade('l7', 's1', 7), createGrade('l7', 's5', 10), createGrade('l7', 's8', 10), createGrade('l7', 's12', 10), 
  createGrade('l7', 's15', 7), createGrade('l7', 's19', 10), createGrade('l7', 's20', 10), createGrade('l7', 's23', 7), 
  createGrade('l7', 's25', 10), createGrade('l7', 's31', 10), createGrade('l7', 's35', 10),

  // 28.10 (SOR, Max 50)
  createGrade('l8', 's1', 30), createGrade('l8', 's2', 45), createGrade('l8', 's3', 50), createGrade('l8', 's4', 35), 
  createGrade('l8', 's5', 50), createGrade('l8', 's6', 46), createGrade('l8', 's7', 47), createGrade('l8', 's8', 50), 
  createGrade('l8', 's9', 29), createGrade('l8', 's10', 46), createGrade('l8', 's11', 49), createGrade('l8', 's12', 45), 
  createGrade('l8', 's13', 40), createGrade('l8', 's14', 43), createGrade('l8', 's15', 25), createGrade('l8', 's16', 23), 
  createGrade('l8', 's17', 48), createGrade('l8', 's18', 45), createGrade('l8', 's19', 40), createGrade('l8', 's20', 40), 
  createGrade('l8', 's21', 15), createGrade('l8', 's22', 35), createGrade('l8', 's23', 37), createGrade('l8', 's24', 40), 
  createGrade('l8', 's25', 45), createGrade('l8', 's26', 25), createGrade('l8', 's27', 29), createGrade('l8', 's28', 38), 
  createGrade('l8', 's29', 38), createGrade('l8', 's30', 30), createGrade('l8', 's31', 40), createGrade('l8', 's32', 47), 
  createGrade('l8', 's33', 38), createGrade('l8', 's34', 45), createGrade('l8', 's35', 46),

  // 03.11 (SOCH, Max 40)
  createGrade('l9', 's1', 30), createGrade('l9', 's2', 35), createGrade('l9', 's3', 40), createGrade('l9', 's4', 29), 
  createGrade('l9', 's5', 40), createGrade('l9', 's6', 37), createGrade('l9', 's7', 39), createGrade('l9', 's8', 40), 
  createGrade('l9', 's9', 28), createGrade('l9', 's10', 40), createGrade('l9', 's11', 40), createGrade('l9', 's12', 39), 
  createGrade('l9', 's13', 34), createGrade('l9', 's14', 33), createGrade('l9', 's15', 27), createGrade('l9', 's16', 27), 
  createGrade('l9', 's17', 40), createGrade('l9', 's18', 35), createGrade('l9', 's19', 35), createGrade('l9', 's20', 35), 
  createGrade('l9', 's21', 10), createGrade('l9', 's22', 30), createGrade('l9', 's23', 33), createGrade('l9', 's24', 36), 
  createGrade('l9', 's25', 37), createGrade('l9', 's26', 31), createGrade('l9', 's27', 30), createGrade('l9', 's28', 37), 
  createGrade('l9', 's29', 37), createGrade('l9', 's30', 27), createGrade('l9', 's31', 28), createGrade('l9', 's32', 36), 
  createGrade('l9', 's33', 30), createGrade('l9', 's34', 35), createGrade('l9', 's35', 38),

  // 23.11
  createGrade('l10', 's1', 8), createGrade('l10', 's2', 10), createGrade('l10', 's3', 10), createGrade('l10', 's5', 10), 
  createGrade('l10', 's7', 10), createGrade('l10', 's13', 8), createGrade('l10', 's15', 7), createGrade('l10', 's20', 9), 
  createGrade('l10', 's21', 7), createGrade('l10', 's23', 7), createGrade('l10', 's27', 7), createGrade('l10', 's30', 8), 
  createGrade('l10', 's33', 8),

  // 24.11 (SOR, Max 25)
  createGrade('l11', 's1', 15), createGrade('l11', 's2', 20), createGrade('l11', 's3', 25), createGrade('l11', 's4', 12), 
  createGrade('l11', 's5', 24), createGrade('l11', 's6', 22), createGrade('l11', 's7', 23), createGrade('l11', 's8', 25), 
  createGrade('l11', 's9', 15), createGrade('l11', 's10', 24), createGrade('l11', 's11', 24), createGrade('l11', 's12', 23), 
  createGrade('l11', 's13', 19), createGrade('l11', 's14', 20), createGrade('l11', 's17', 25), createGrade('l11', 's18', 22), 
  createGrade('l11', 's19', 20), createGrade('l11', 's20', 20), createGrade('l11', 's21', 7), createGrade('l11', 's22', 16), 
  createGrade('l11', 's23', 19), createGrade('l11', 's24', 22), createGrade('l11', 's25', 23), createGrade('l11', 's26', 15), 
  createGrade('l11', 's27', 14), createGrade('l11', 's28', 20), createGrade('l11', 's29', 20), createGrade('l11', 's30', 19), 
  createGrade('l11', 's31', 20), createGrade('l11', 's32', 23), createGrade('l11', 's33', 19), createGrade('l11', 's34', 22), 
  createGrade('l11', 's35', 20),

  // 27.11
  createGrade('l12', 's3', 10), createGrade('l12', 's5', 10), createGrade('l12', 's8', 10), createGrade('l12', 's12', 9), 
  createGrade('l12', 's17', 10), createGrade('l12', 's20', 9), createGrade('l12', 's21', 'H'), createGrade('l12', 's22', 'P'), 
  createGrade('l12', 's24', 9), createGrade('l12', 's29', 9), createGrade('l12', 's34', 10),

  // 28.11 (Independent)
  createGrade('l13', 's1', 8), createGrade('l13', 's2', 9), createGrade('l13', 's3', 10), createGrade('l13', 's4', 7), 
  createGrade('l13', 's5', 'P'), createGrade('l13', 's6', 10), createGrade('l13', 's7', 10), createGrade('l13', 's8', 10), 
  createGrade('l13', 's9', 6), createGrade('l13', 's10', 10), createGrade('l13', 's11', 10), createGrade('l13', 's12', 10), 
  createGrade('l13', 's13', 8), createGrade('l13', 's14', 9), createGrade('l13', 's15', 9), createGrade('l13', 's16', 7), 
  createGrade('l13', 's17', 'P'), createGrade('l13', 's18', 10), createGrade('l13', 's19', 10), createGrade('l13', 's20', 10), 
  createGrade('l13', 's21', 5), createGrade('l13', 's22', 'H'), createGrade('l13', 's23', 9), createGrade('l13', 's24', 9), 
  createGrade('l13', 's25', 9), createGrade('l13', 's26', 7), createGrade('l13', 's27', 7), createGrade('l13', 's28', 9), 
  createGrade('l13', 's29', 9), createGrade('l13', 's30', 8), createGrade('l13', 's31', 9), createGrade('l13', 's32', 9), 
  createGrade('l13', 's33', 9), createGrade('l13', 's34', 10), createGrade('l13', 's35', 10),

  // 14.12
  createGrade('l14', 's1', 5), createGrade('l14', 's3', 10), createGrade('l14', 's4', 5), createGrade('l14', 's6', 10), 
  createGrade('l14', 's7', 10), createGrade('l14', 's9', 10), createGrade('l14', 's10', 10), createGrade('l14', 's11', 10), 
  createGrade('l14', 's13', 10), createGrade('l14', 's15', 5), createGrade('l14', 's18', 10), createGrade('l14', 's23', 10), 
  createGrade('l14', 's25', 10), createGrade('l14', 's27', 5), createGrade('l14', 's28', 10), createGrade('l14', 's31', 9), 
  createGrade('l14', 's33', 9), createGrade('l14', 's35', 10),

  // 16.12
  createGrade('l15', 's2', 10), createGrade('l15', 's5', 10), createGrade('l15', 's8', 10), createGrade('l15', 's12', 10), 
  createGrade('l15', 's14', 10), createGrade('l15', 's16', 5), createGrade('l15', 's17', 'P'), createGrade('l15', 's21', 'H'), 
  createGrade('l15', 's24', 9), createGrade('l15', 's29', 10), createGrade('l15', 's32', 'P'), createGrade('l15', 's34', 10),

  // 17.12
  createGrade('l16', 's19', 10), createGrade('l16', 's22', 9), createGrade('l16', 's28', 10),
];

export const initialQuarters: Quarter[] = [
  { id: 'q1', subjectId: ALG_ID, name: '1 Четверть', startDate: '2024-09-01', endDate: '2024-11-05' },
  { id: 'q2', subjectId: ALG_ID, name: '2 Четверть', startDate: '2024-11-06', endDate: '2024-12-31' }
];
