import { AttendanceStatus, LessonType, Student, Class, Subject, Lesson, GradeCell, Quarter } from './types.ts';

const CLASS_9V_ID = 'class-9v';
const ALG_ID = 'subj-eng'; // English ID from prompt

export const initialClasses: Class[] = [
  { id: CLASS_9V_ID, name: '9В' }
];

export const initialSubjects: Subject[] = [
  { id: ALG_ID, name: 'Английский' }
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
  { id: 's12', firstName: 'Даша', lastName: 'Свежевская', studentId: 'ID012', classId: CLASS_9V_ID },
  { id: 's13', firstName: 'Даша', lastName: 'Тупик', studentId: 'ID013', classId: CLASS_9V_ID },
  { id: 's14', firstName: 'Даша', lastName: 'Рысенко', studentId: 'ID014', classId: CLASS_9V_ID },
  { id: 's15', firstName: 'Аюбхон', lastName: 'Саидкаримов', studentId: 'ID015', classId: CLASS_9V_ID },
  { id: 's16', firstName: 'Мумтоза', lastName: 'Баходирова', studentId: 'ID016', classId: CLASS_9V_ID },
  { id: 's17', firstName: 'Шухрат', lastName: 'Низамутдинов', studentId: 'ID017', classId: CLASS_9V_ID },
  { id: 's18', firstName: 'Амир', lastName: 'Эргашев', studentId: 'ID018', classId: CLASS_9V_ID },
  { id: 's19', firstName: 'Даша', lastName: 'Юхникова', studentId: 'ID019', classId: CLASS_9V_ID },
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
  { id: 's34', firstName: 'Лиза', lastName: 'Ким', studentId: 'ID034', classId: CLASS_9V_ID },
  { id: 's35', firstName: 'Вероника', lastName: 'Ким', studentId: 'ID035', classId: CLASS_9V_ID },
];

export const initialQuarters: Quarter[] = [
    { id: 'q1-eng', subjectId: ALG_ID, name: '1 Четверть', startDate: '2025-09-01', endDate: '2025-10-31' },
    { id: 'q2-eng', subjectId: ALG_ID, name: '2 Четверть', startDate: '2025-11-01', endDate: '2025-12-31' }
];

export const initialLessons: Lesson[] = [
    { id: 'l-eng-01', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2025-10-12', type: LessonType.NORMAL, topic: 'Past Simple and Past Continuous', homework: 'Д/З: Повторить темы.', maxPoints: 10 },
    { id: 'l-eng-02', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2025-10-14', type: LessonType.INDEPENDENT, topic: 'Past Simple and Past Continuous/Part 2', homework: 'Д/З: Student\'s book page 24. Exercises 1, 4.', maxPoints: 10 },
    { id: 'l-eng-03', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2025-10-16', type: LessonType.NORMAL, topic: 'Strange Houses', homework: 'Д/З: Повторить Past Simple/Past Continuous', maxPoints: 10 },
    { id: 'l-eng-04', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2025-10-21', type: LessonType.NORMAL, topic: 'School', homework: 'Д/З: Answer the questions', maxPoints: 10 },
    { id: 'l-eng-05', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2025-10-23', type: LessonType.SOR, topic: 'СОР (Суммативное оценивание за раздел) BSB 50 balL', homework: 'Д/З: p.32 (ex 1,2)', maxPoints: 50 },
    { id: 'l-eng-06', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2025-10-28', type: LessonType.NORMAL, topic: 'Review', homework: 'Д/З: Повторить все темы', maxPoints: 10 },
    { id: 'l-eng-07', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2025-10-30', type: LessonType.NORMAL, topic: 'Final Review', homework: 'Подготовка к экзамену', maxPoints: 10 }
];

export const initialGrades: GradeCell[] = [
    { id: 'g1', lessonId: 'l-eng-01', studentId: 's1', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g2', lessonId: 'l-eng-01', studentId: 's2', points: 8, attendance: AttendanceStatus.PRESENT },
    { id: 'g3', lessonId: 'l-eng-05', studentId: 's1', points: 45, attendance: AttendanceStatus.PRESENT },
    { id: 'g4', lessonId: 'l-eng-05', studentId: 's2', points: 48, attendance: AttendanceStatus.PRESENT },
    { id: 'g5', lessonId: 'l-eng-02', studentId: 's3', points: null, attendance: AttendanceStatus.ABSENT, attendanceNote: 'Болеет' },
];
