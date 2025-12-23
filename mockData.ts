

import { AttendanceStatus, LessonType, Student, Class, Subject, Lesson, GradeCell, Quarter } from './types';

const CLASS_9V_ID = 'class-9v';
const ALG_ID = 'subj-eng'; // English ID from prompt

export const initialClasses: Class[] = [
  { id: CLASS_9V_ID, name: '9В' }
];

export const initialSubjects: Subject[] = [
  { id: ALG_ID, name: 'English Language' }
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
    { id: 'l-eng-07', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2025-10-30', type: LessonType.SOCH, topic: 'СОЧ (Суммативное оценивание за четверть) CHSB-1', homework: 'Д/З: Повторить темы, подготовка к тестам.', maxPoints: 40 },
    { id: 'l-eng-08', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2025-11-28', type: LessonType.NORMAL, topic: '2 четверть/Подготовка к СОР 1', homework: 'Д/З: Повторить правила.', maxPoints: 10 },
    { id: 'l-eng-09', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2025-11-29', type: LessonType.SOR, topic: 'СОР (Суммативное оценивание за раздел) BSB-1', homework: 'Д/З: Прочитать текст, запомнить о чём он был.', maxPoints: 25 },
    { id: 'l-eng-10', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2025-12-07', type: LessonType.NORMAL, topic: 'Feature with: Will/Might/May', homework: 'Д/З: Подготовка к уроку', maxPoints: 10 },
    { id: 'l-eng-11', subjectId: ALG_ID, classId: CLASS_9V_ID, date: '2025-12-11', type: LessonType.INDEPENDENT, topic: 'Review', homework: 'Д/З: Выучить правила, Подготовка к С/Р', maxPoints: 10 }
];

export const initialGrades: GradeCell[] = [
    // s1: Дилмуродова
    { id: 'g1-1', lessonId: 'l-eng-01', studentId: 's1', points: null, attendance: AttendanceStatus.ABSENT },
    { id: 'g1-2', lessonId: 'l-eng-02', studentId: 's1', points: 9, attendance: AttendanceStatus.PRESENT },
    { id: 'g1-3', lessonId: 'l-eng-03', studentId: 's1', points: 9, attendance: AttendanceStatus.PRESENT },
    { id: 'g1-4', lessonId: 'l-eng-04', studentId: 's1', points: 5, attendance: AttendanceStatus.PRESENT },
    { id: 'g1-5', lessonId: 'l-eng-05', studentId: 's1', points: 50, attendance: AttendanceStatus.PRESENT },
    { id: 'g1-6', lessonId: 'l-eng-06', studentId: 's1', points: 9, attendance: AttendanceStatus.PRESENT },
    { id: 'g1-7', lessonId: 'l-eng-07', studentId: 's1', points: 30, attendance: AttendanceStatus.PRESENT },
    { id: 'g1-8', lessonId: 'l-eng-08', studentId: 's1', points: 7, attendance: AttendanceStatus.PRESENT },
    { id: 'g1-9', lessonId: 'l-eng-09', studentId: 's1', points: 17, attendance: AttendanceStatus.PRESENT },
    { id: 'g1-10', lessonId: 'l-eng-10', studentId: 's1', points: 8, attendance: AttendanceStatus.PRESENT },
    { id: 'g1-11', lessonId: 'l-eng-11', studentId: 's1', points: 9, attendance: AttendanceStatus.PRESENT },

    // s2: Ельчанина
    { id: 'g2-1', lessonId: 'l-eng-01', studentId: 's2', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g2-2', lessonId: 'l-eng-02', studentId: 's2', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g2-3', lessonId: 'l-eng-03', studentId: 's2', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g2-5', lessonId: 'l-eng-05', studentId: 's2', points: 50, attendance: AttendanceStatus.PRESENT },
    { id: 'g2-6', lessonId: 'l-eng-06', studentId: 's2', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g2-7', lessonId: 'l-eng-07', studentId: 's2', points: 40, attendance: AttendanceStatus.PRESENT },
    { id: 'g2-9', lessonId: 'l-eng-09', studentId: 's2', points: 25, attendance: AttendanceStatus.PRESENT },
    { id: 'g2-11', lessonId: 'l-eng-11', studentId: 's2', points: 10, attendance: AttendanceStatus.PRESENT },

    // s3: Ермилов
    { id: 'g3-1', lessonId: 'l-eng-01', studentId: 's3', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g3-2', lessonId: 'l-eng-02', studentId: 's3', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g3-3', lessonId: 'l-eng-03', studentId: 's3', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g3-4', lessonId: 'l-eng-04', studentId: 's3', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g3-5', lessonId: 'l-eng-05', studentId: 's3', points: 50, attendance: AttendanceStatus.PRESENT },
    { id: 'g3-7', lessonId: 'l-eng-07', studentId: 's3', points: 40, attendance: AttendanceStatus.PRESENT },
    { id: 'g3-8', lessonId: 'l-eng-08', studentId: 's3', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g3-9', lessonId: 'l-eng-09', studentId: 's3', points: 25, attendance: AttendanceStatus.PRESENT },
    { id: 'g3-10', lessonId: 'l-eng-10', studentId: 's3', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g3-11', lessonId: 'l-eng-11', studentId: 's3', points: 10, attendance: AttendanceStatus.PRESENT },

    // s4: Исаев
    { id: 'g4-1', lessonId: 'l-eng-01', studentId: 's4', points: null, attendance: AttendanceStatus.PRESENT, attendanceNote: 'Опоздание' },
    { id: 'g4-2', lessonId: 'l-eng-02', studentId: 's4', points: 8, attendance: AttendanceStatus.PRESENT },
    { id: 'g4-3', lessonId: 'l-eng-03', studentId: 's4', points: 8, attendance: AttendanceStatus.PRESENT },
    { id: 'g4-4', lessonId: 'l-eng-04', studentId: 's4', points: 5, attendance: AttendanceStatus.PRESENT },
    { id: 'g4-5', lessonId: 'l-eng-05', studentId: 's4', points: 45, attendance: AttendanceStatus.PRESENT },
    { id: 'g4-6', lessonId: 'l-eng-06', studentId: 's4', points: 8, attendance: AttendanceStatus.PRESENT },
    { id: 'g4-7', lessonId: 'l-eng-07', studentId: 's4', points: 28, attendance: AttendanceStatus.PRESENT },
    { id: 'g4-9', lessonId: 'l-eng-09', studentId: 's4', points: 18, attendance: AttendanceStatus.PRESENT },
    { id: 'g4-11', lessonId: 'l-eng-11', studentId: 's4', points: 7, attendance: AttendanceStatus.PRESENT },

    // s5: Каримова
    { id: 'g5-1', lessonId: 'l-eng-01', studentId: 's5', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g5-2', lessonId: 'l-eng-02', studentId: 's5', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g5-3', lessonId: 'l-eng-03', studentId: 's5', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g5-5', lessonId: 'l-eng-05', studentId: 's5', points: 50, attendance: AttendanceStatus.PRESENT },
    { id: 'g5-6', lessonId: 'l-eng-06', studentId: 's5', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g5-7', lessonId: 'l-eng-07', studentId: 's5', points: 40, attendance: AttendanceStatus.PRESENT },
    { id: 'g5-9', lessonId: 'l-eng-09', studentId: 's5', points: 25, attendance: AttendanceStatus.PRESENT },
    { id: 'g5-10', lessonId: 'l-eng-10', studentId: 's5', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g5-11', lessonId: 'l-eng-11', studentId: 's5', points: 10, attendance: AttendanceStatus.PRESENT },
    
    // s6: Костромитина
    { id: 'g6-1', lessonId: 'l-eng-01', studentId: 's6', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g6-2', lessonId: 'l-eng-02', studentId: 's6', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g6-4', lessonId: 'l-eng-04', studentId: 's6', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g6-5', lessonId: 'l-eng-05', studentId: 's6', points: 50, attendance: AttendanceStatus.PRESENT },
    { id: 'g6-6', lessonId: 'l-eng-06', studentId: 's6', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g6-7', lessonId: 'l-eng-07', studentId: 's6', points: 35, attendance: AttendanceStatus.PRESENT },
    { id: 'g6-8', lessonId: 'l-eng-08', studentId: 's6', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g6-9', lessonId: 'l-eng-09', studentId: 's6', points: 23, attendance: AttendanceStatus.PRESENT },
    { id: 'g6-11', lessonId: 'l-eng-11', studentId: 's6', points: 10, attendance: AttendanceStatus.PRESENT },

    // s7: Ляпина
    { id: 'g7-1', lessonId: 'l-eng-01', studentId: 's7', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g7-2', lessonId: 'l-eng-02', studentId: 's7', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g7-3', lessonId: 'l-eng-03', studentId: 's7', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g7-4', lessonId: 'l-eng-04', studentId: 's7', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g7-5', lessonId: 'l-eng-05', studentId: 's7', points: 50, attendance: AttendanceStatus.PRESENT },
    { id: 'g7-7', lessonId: 'l-eng-07', studentId: 's7', points: 40, attendance: AttendanceStatus.PRESENT },
    { id: 'g7-9', lessonId: 'l-eng-09', studentId: 's7', points: 25, attendance: AttendanceStatus.PRESENT },
    { id: 'g7-10', lessonId: 'l-eng-10', studentId: 's7', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g7-11', lessonId: 'l-eng-11', studentId: 's7', points: 10, attendance: AttendanceStatus.PRESENT },

    // s8: Иванов
    { id: 'g8-1', lessonId: 'l-eng-01', studentId: 's8', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g8-2', lessonId: 'l-eng-02', studentId: 's8', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g8-4', lessonId: 'l-eng-04', studentId: 's8', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g8-5', lessonId: 'l-eng-05', studentId: 's8', points: 50, attendance: AttendanceStatus.PRESENT },
    { id: 'g8-6', lessonId: 'l-eng-06', studentId: 's8', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g8-7', lessonId: 'l-eng-07', studentId: 's8', points: 40, attendance: AttendanceStatus.PRESENT },
    { id: 'g8-9', lessonId: 'l-eng-09', studentId: 's8', points: 25, attendance: AttendanceStatus.PRESENT },
    { id: 'g8-11', lessonId: 'l-eng-11', studentId: 's8', points: 10, attendance: AttendanceStatus.PRESENT },

    // s9: Колонов
    { id: 'g9-1', lessonId: 'l-eng-01', studentId: 's9', points: 8, attendance: AttendanceStatus.PRESENT },
    { id: 'g9-2', lessonId: 'l-eng-02', studentId: 's9', points: 8, attendance: AttendanceStatus.PRESENT },
    { id: 'g9-3', lessonId: 'l-eng-03', studentId: 's9', points: 8, attendance: AttendanceStatus.PRESENT },
    { id: 'g9-5', lessonId: 'l-eng-05', studentId: 's9', points: 40, attendance: AttendanceStatus.PRESENT },
    { id: 'g9-6', lessonId: 'l-eng-06', studentId: 's9', points: 9, attendance: AttendanceStatus.PRESENT },
    { id: 'g9-7', lessonId: 'l-eng-07', studentId: 's9', points: 25, attendance: AttendanceStatus.PRESENT },
    { id: 'g9-9', lessonId: 'l-eng-09', studentId: 's9', points: 15, attendance: AttendanceStatus.PRESENT },
    { id: 'g9-11', lessonId: 'l-eng-11', studentId: 's9', points: 7, attendance: AttendanceStatus.PRESENT },

    // s10: Маркова
    { id: 'g10-1', lessonId: 'l-eng-01', studentId: 's10', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g10-2', lessonId: 'l-eng-02', studentId: 's10', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g10-4', lessonId: 'l-eng-04', studentId: 's10', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g10-5', lessonId: 'l-eng-05', studentId: 's10', points: 50, attendance: AttendanceStatus.PRESENT },
    { id: 'g10-6', lessonId: 'l-eng-06', studentId: 's10', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g10-7', lessonId: 'l-eng-07', studentId: 's10', points: 40, attendance: AttendanceStatus.PRESENT },
    { id: 'g10-8', lessonId: 'l-eng-08', studentId: 's10', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g10-9', lessonId: 'l-eng-09', studentId: 's10', points: 25, attendance: AttendanceStatus.PRESENT },
    { id: 'g10-11', lessonId: 'l-eng-11', studentId: 's10', points: 10, attendance: AttendanceStatus.PRESENT },

    // s11: Платонова
    { id: 'g11-1', lessonId: 'l-eng-01', studentId: 's11', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g11-2', lessonId: 'l-eng-02', studentId: 's11', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g11-3', lessonId: 'l-eng-03', studentId: 's11', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g11-5', lessonId: 'l-eng-05', studentId: 's11', points: 50, attendance: AttendanceStatus.PRESENT },
    { id: 'g11-6', lessonId: 'l-eng-06', studentId: 's11', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g11-7', lessonId: 'l-eng-07', studentId: 's11', points: 40, attendance: AttendanceStatus.PRESENT },
    { id: 'g11-9', lessonId: 'l-eng-09', studentId: 's11', points: 23, attendance: AttendanceStatus.PRESENT },
    { id: 'g11-10', lessonId: 'l-eng-10', studentId: 's11', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g11-11', lessonId: 'l-eng-11', studentId: 's11', points: 10, attendance: AttendanceStatus.PRESENT },

    // s12: Свежевская
    { id: 'g12-1', lessonId: 'l-eng-01', studentId: 's12', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g12-2', lessonId: 'l-eng-02', studentId: 's12', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g12-4', lessonId: 'l-eng-04', studentId: 's12', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g12-5', lessonId: 'l-eng-05', studentId: 's12', points: 50, attendance: AttendanceStatus.PRESENT },
    { id: 'g12-6', lessonId: 'l-eng-06', studentId: 's12', points: 9, attendance: AttendanceStatus.PRESENT },
    { id: 'g12-7', lessonId: 'l-eng-07', studentId: 's12', points: 40, attendance: AttendanceStatus.PRESENT },
    { id: 'g12-9', lessonId: 'l-eng-09', studentId: 's12', points: 22, attendance: AttendanceStatus.PRESENT },
    { id: 'g12-11', lessonId: 'l-eng-11', studentId: 's12', points: 10, attendance: AttendanceStatus.PRESENT },

    // s13: Тупик
    { id: 'g13-1', lessonId: 'l-eng-01', studentId: 's13', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g13-2', lessonId: 'l-eng-02', studentId: 's13', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g13-4', lessonId: 'l-eng-04', studentId: 's13', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g13-5', lessonId: 'l-eng-05', studentId: 's13', points: 50, attendance: AttendanceStatus.PRESENT },
    { id: 'g13-6', lessonId: 'l-eng-06', studentId: 's13', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g13-7', lessonId: 'l-eng-07', studentId: 's13', points: 40, attendance: AttendanceStatus.PRESENT },
    { id: 'g13-8', lessonId: 'l-eng-08', studentId: 's13', points: 9, attendance: AttendanceStatus.PRESENT },
    { id: 'g13-9', lessonId: 'l-eng-09', studentId: 's13', points: 18, attendance: AttendanceStatus.PRESENT },
    { id: 'g13-11', lessonId: 'l-eng-11', studentId: 's13', points: 9, attendance: AttendanceStatus.PRESENT },

    // s14: Рысенко
    { id: 'g14-1', lessonId: 'l-eng-01', studentId: 's14', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g14-2', lessonId: 'l-eng-02', studentId: 's14', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g14-3', lessonId: 'l-eng-03', studentId: 's14', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g14-5', lessonId: 'l-eng-05', studentId: 's14', points: 50, attendance: AttendanceStatus.PRESENT },
    { id: 'g14-6', lessonId: 'l-eng-06', studentId: 's14', points: 9, attendance: AttendanceStatus.PRESENT },
    { id: 'g14-7', lessonId: 'l-eng-07', studentId: 's14', points: 35, attendance: AttendanceStatus.PRESENT },
    { id: 'g14-9', lessonId: 'l-eng-09', studentId: 's14', points: 21, attendance: AttendanceStatus.PRESENT },
    { id: 'g14-11', lessonId: 'l-eng-11', studentId: 's14', points: 10, attendance: AttendanceStatus.PRESENT },

    // s15: Саидкаримов
    { id: 'g15-1', lessonId: 'l-eng-01', studentId: 's15', points: 2, attendance: AttendanceStatus.PRESENT },
    { id: 'g15-2', lessonId: 'l-eng-02', studentId: 's15', points: 4, attendance: AttendanceStatus.PRESENT },
    { id: 'g15-4', lessonId: 'l-eng-04', studentId: 's15', points: 7, attendance: AttendanceStatus.PRESENT },
    { id: 'g15-5', lessonId: 'l-eng-05', studentId: 's15', points: 15, attendance: AttendanceStatus.PRESENT },
    { id: 'g15-6', lessonId: 'l-eng-06', studentId: 's15', points: 6, attendance: AttendanceStatus.PRESENT },
    { id: 'g15-7', lessonId: 'l-eng-07', studentId: 's15', points: 20, attendance: AttendanceStatus.PRESENT },
    { id: 'g15-9', lessonId: 'l-eng-09', studentId: 's15', points: 14, attendance: AttendanceStatus.PRESENT },
    { id: 'g15-11', lessonId: 'l-eng-11', studentId: 's15', points: 6, attendance: AttendanceStatus.PRESENT },

    // s16: Баходирова
    { id: 'g16-1', lessonId: 'l-eng-01', studentId: 's16', points: 7, attendance: AttendanceStatus.PRESENT },
    { id: 'g16-2', lessonId: 'l-eng-02', studentId: 's16', points: 8, attendance: AttendanceStatus.PRESENT },
    { id: 'g16-4', lessonId: 'l-eng-04', studentId: 's16', points: 5, attendance: AttendanceStatus.PRESENT },
    { id: 'g16-5', lessonId: 'l-eng-05', studentId: 's16', points: 40, attendance: AttendanceStatus.PRESENT },
    { id: 'g16-6', lessonId: 'l-eng-06', studentId: 's16', points: 8, attendance: AttendanceStatus.PRESENT },
    { id: 'g16-7', lessonId: 'l-eng-07', studentId: 's16', points: 25, attendance: AttendanceStatus.PRESENT },
    { id: 'g16-9', lessonId: 'l-eng-09', studentId: 's16', points: 13, attendance: AttendanceStatus.PRESENT },
    { id: 'g16-10', lessonId: 'l-eng-10', studentId: 's16', points: 8, attendance: AttendanceStatus.PRESENT },
    { id: 'g16-11', lessonId: 'l-eng-11', studentId: 's16', points: 7, attendance: AttendanceStatus.PRESENT },

    // s17: Низамутдинов
    { id: 'g17-1', lessonId: 'l-eng-01', studentId: 's17', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g17-2', lessonId: 'l-eng-02', studentId: 's17', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g17-3', lessonId: 'l-eng-03', studentId: 's17', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g17-5', lessonId: 'l-eng-05', studentId: 's17', points: 50, attendance: AttendanceStatus.PRESENT },
    { id: 'g17-6', lessonId: 'l-eng-06', studentId: 's17', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g17-7', lessonId: 'l-eng-07', studentId: 's17', points: 38, attendance: AttendanceStatus.PRESENT },
    { id: 'g17-9', lessonId: 'l-eng-09', studentId: 's17', points: 23, attendance: AttendanceStatus.PRESENT },
    { id: 'g17-11', lessonId: 'l-eng-11', studentId: 's17', points: 10, attendance: AttendanceStatus.PRESENT },

    // s18: Эргашев
    { id: 'g18-1', lessonId: 'l-eng-01', studentId: 's18', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g18-2', lessonId: 'l-eng-02', studentId: 's18', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g18-4', lessonId: 'l-eng-04', studentId: 's18', points: 8, attendance: AttendanceStatus.PRESENT },
    { id: 'g18-5', lessonId: 'l-eng-05', studentId: 's18', points: 50, attendance: AttendanceStatus.PRESENT },
    { id: 'g18-6', lessonId: 'l-eng-06', studentId: 's18', points: 8, attendance: AttendanceStatus.PRESENT },
    { id: 'g18-7', lessonId: 'l-eng-07', studentId: 's18', points: 37, attendance: AttendanceStatus.PRESENT },
    { id: 'g18-8', lessonId: 'l-eng-08', studentId: 's18', points: 9, attendance: AttendanceStatus.PRESENT },
    { id: 'g18-9', lessonId: 'l-eng-09', studentId: 's18', points: 22, attendance: AttendanceStatus.PRESENT },
    { id: 'g18-11', lessonId: 'l-eng-11', studentId: 's18', points: 10, attendance: AttendanceStatus.PRESENT },

    // s19: Юхникова
    { id: 'g19-1', lessonId: 'l-eng-01', studentId: 's19', points: 8, attendance: AttendanceStatus.PRESENT },
    { id: 'g19-2', lessonId: 'l-eng-02', studentId: 's19', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g19-3', lessonId: 'l-eng-03', studentId: 's19', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g19-5', lessonId: 'l-eng-05', studentId: 's19', points: 50, attendance: AttendanceStatus.PRESENT },
    { id: 'g19-6', lessonId: 'l-eng-06', studentId: 's19', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g19-7', lessonId: 'l-eng-07', studentId: 's19', points: 39, attendance: AttendanceStatus.PRESENT },
    { id: 'g19-9', lessonId: 'l-eng-09', studentId: 's19', points: 21, attendance: AttendanceStatus.PRESENT },
    { id: 'g19-10', lessonId: 'l-eng-10', studentId: 's19', points: 9, attendance: AttendanceStatus.PRESENT },
    { id: 'g19-11', lessonId: 'l-eng-11', studentId: 's19', points: 10, attendance: AttendanceStatus.PRESENT },

    // s20: Уколова
    { id: 'g20-1', lessonId: 'l-eng-01', studentId: 's20', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g20-2', lessonId: 'l-eng-02', studentId: 's20', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g20-3', lessonId: 'l-eng-03', studentId: 's20', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g20-5', lessonId: 'l-eng-05', studentId: 's20', points: 50, attendance: AttendanceStatus.PRESENT },
    { id: 'g20-6', lessonId: 'l-eng-06', studentId: 's20', points: 9, attendance: AttendanceStatus.PRESENT },
    { id: 'g20-7', lessonId: 'l-eng-07', studentId: 's20', points: 38, attendance: AttendanceStatus.PRESENT },
    { id: 'g20-8', lessonId: 'l-eng-08', studentId: 's20', points: 9, attendance: AttendanceStatus.PRESENT },
    { id: 'g20-9', lessonId: 'l-eng-09', studentId: 's20', points: 21, attendance: AttendanceStatus.PRESENT },
    { id: 'g20-11', lessonId: 'l-eng-11', studentId: 's20', points: 10, attendance: AttendanceStatus.PRESENT },

    // s21: Абдурахманов
    { id: 'g21-1', lessonId: 'l-eng-01', studentId: 's21', points: null, attendance: AttendanceStatus.ABSENT },
    { id: 'g21-2', lessonId: 'l-eng-02', studentId: 's21', points: 1, attendance: AttendanceStatus.PRESENT },
    { id: 'g21-3', lessonId: 'l-eng-03', studentId: 's21', points: null, attendance: AttendanceStatus.ABSENT },
    { id: 'g21-4', lessonId: 'l-eng-04', studentId: 's21', points: null, attendance: AttendanceStatus.ABSENT },
    { id: 'g21-5', lessonId: 'l-eng-05', studentId: 's21', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g21-6', lessonId: 'l-eng-06', studentId: 's21', points: 5, attendance: AttendanceStatus.PRESENT },
    { id: 'g21-7', lessonId: 'l-eng-07', studentId: 's21', points: 9, attendance: AttendanceStatus.PRESENT },
    { id: 'g21-9', lessonId: 'l-eng-09', studentId: 's21', points: 5, attendance: AttendanceStatus.PRESENT },
    { id: 'g21-11', lessonId: 'l-eng-11', studentId: 's21', points: null, attendance: AttendanceStatus.ABSENT },

    // s22: Чергинский
    { id: 'g22-1', lessonId: 'l-eng-01', studentId: 's22', points: 7, attendance: AttendanceStatus.PRESENT },
    { id: 'g22-2', lessonId: 'l-eng-02', studentId: 's22', points: 8, attendance: AttendanceStatus.PRESENT },
    { id: 'g22-4', lessonId: 'l-eng-04', studentId: 's22', points: 8, attendance: AttendanceStatus.PRESENT },
    { id: 'g22-5', lessonId: 'l-eng-05', studentId: 's22', points: 40, attendance: AttendanceStatus.PRESENT },
    { id: 'g22-6', lessonId: 'l-eng-06', studentId: 's22', points: 7, attendance: AttendanceStatus.PRESENT },
    { id: 'g22-7', lessonId: 'l-eng-07', studentId: 's22', points: 30, attendance: AttendanceStatus.PRESENT },
    { id: 'g22-8', lessonId: 'l-eng-08', studentId: 's22', points: 7, attendance: AttendanceStatus.PRESENT },
    { id: 'g22-9', lessonId: 'l-eng-09', studentId: 's22', points: 17, attendance: AttendanceStatus.PRESENT },
    { id: 'g22-11', lessonId: 'l-eng-11', studentId: 's22', points: 7, attendance: AttendanceStatus.PRESENT },

    // s23: Панченко
    { id: 'g23-1', lessonId: 'l-eng-01', studentId: 's23', points: 8, attendance: AttendanceStatus.PRESENT },
    { id: 'g23-2', lessonId: 'l-eng-02', studentId: 's23', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g23-4', lessonId: 'l-eng-04', studentId: 's23', points: 5, attendance: AttendanceStatus.PRESENT },
    { id: 'g23-5', lessonId: 'l-eng-05', studentId: 's23', points: 40, attendance: AttendanceStatus.PRESENT },
    { id: 'g23-6', lessonId: 'l-eng-06', studentId: 's23', points: 9, attendance: AttendanceStatus.PRESENT },
    { id: 'g23-7', lessonId: 'l-eng-07', studentId: 's23', points: 31, attendance: AttendanceStatus.PRESENT },
    { id: 'g23-9', lessonId: 'l-eng-09', studentId: 's23', points: 19, attendance: AttendanceStatus.PRESENT },
    { id: 'g23-11', lessonId: 'l-eng-11', studentId: 's23', points: 7, attendance: AttendanceStatus.PRESENT },

    // s24: Андрианов
    { id: 'g24-1', lessonId: 'l-eng-01', studentId: 's24', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g24-2', lessonId: 'l-eng-02', studentId: 's24', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g24-3', lessonId: 'l-eng-03', studentId: 's24', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g24-5', lessonId: 'l-eng-05', studentId: 's24', points: 45, attendance: AttendanceStatus.PRESENT },
    { id: 'g24-6', lessonId: 'l-eng-06', studentId: 's24', points: 9, attendance: AttendanceStatus.PRESENT },
    { id: 'g24-7', lessonId: 'l-eng-07', studentId: 's24', points: 33, attendance: AttendanceStatus.PRESENT },
    { id: 'g24-9', lessonId: 'l-eng-09', studentId: 's24', points: 19, attendance: AttendanceStatus.PRESENT },
    { id: 'g24-11', lessonId: 'l-eng-11', studentId: 's24', points: 9, attendance: AttendanceStatus.PRESENT },

    // s25: Саркисов
    { id: 'g25-1', lessonId: 'l-eng-01', studentId: 's25', points: 9, attendance: AttendanceStatus.PRESENT },
    { id: 'g25-2', lessonId: 'l-eng-02', studentId: 's25', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g25-5', lessonId: 'l-eng-05', studentId: 's25', points: 50, attendance: AttendanceStatus.PRESENT },
    { id: 'g25-7', lessonId: 'l-eng-07', studentId: 's25', points: 34, attendance: AttendanceStatus.PRESENT },
    { id: 'g25-9', lessonId: 'l-eng-09', studentId: 's25', points: 21, attendance: AttendanceStatus.PRESENT },
    { id: 'g25-11', lessonId: 'l-eng-11', studentId: 's25', points: 9, attendance: AttendanceStatus.PRESENT },

    // s26: Суинов
    { id: 'g26-1', lessonId: 'l-eng-01', studentId: 's26', points: 8, attendance: AttendanceStatus.PRESENT },
    { id: 'g26-2', lessonId: 'l-eng-02', studentId: 's26', points: 8, attendance: AttendanceStatus.PRESENT },
    { id: 'g26-4', lessonId: 'l-eng-04', studentId: 's26', points: 5, attendance: AttendanceStatus.PRESENT },
    { id: 'g26-5', lessonId: 'l-eng-05', studentId: 's26', points: 40, attendance: AttendanceStatus.PRESENT },
    { id: 'g26-6', lessonId: 'l-eng-06', studentId: 's26', points: 7, attendance: AttendanceStatus.PRESENT },
    { id: 'g26-7', lessonId: 'l-eng-07', studentId: 's26', points: 29, attendance: AttendanceStatus.PRESENT },
    { id: 'g26-8', lessonId: 'l-eng-08', studentId: 's26', points: 7, attendance: AttendanceStatus.PRESENT },
    { id: 'g26-9', lessonId: 'l-eng-09', studentId: 's26', points: 15, attendance: AttendanceStatus.PRESENT },
    { id: 'g26-11', lessonId: 'l-eng-11', studentId: 's26', points: 7, attendance: AttendanceStatus.PRESENT },

    // s27: Саидова
    { id: 'g27-1', lessonId: 'l-eng-01', studentId: 's27', points: 7, attendance: AttendanceStatus.PRESENT },
    { id: 'g27-2', lessonId: 'l-eng-02', studentId: 's27', points: 8, attendance: AttendanceStatus.PRESENT },
    { id: 'g27-3', lessonId: 'l-eng-03', studentId: 's27', points: 6, attendance: AttendanceStatus.PRESENT },
    { id: 'g27-5', lessonId: 'l-eng-05', studentId: 's27', points: 40, attendance: AttendanceStatus.PRESENT },
    { id: 'g27-6', lessonId: 'l-eng-06', studentId: 's27', points: 8, attendance: AttendanceStatus.PRESENT },
    { id: 'g27-7', lessonId: 'l-eng-07', studentId: 's27', points: 27, attendance: AttendanceStatus.PRESENT },
    { id: 'g27-9', lessonId: 'l-eng-09', studentId: 's27', points: 15, attendance: AttendanceStatus.PRESENT },
    { id: 'g27-11', lessonId: 'l-eng-11', studentId: 's27', points: 6, attendance: AttendanceStatus.PRESENT },

    // s28: Юсупова
    { id: 'g28-1', lessonId: 'l-eng-01', studentId: 's28', points: 9, attendance: AttendanceStatus.PRESENT },
    { id: 'g28-2', lessonId: 'l-eng-02', studentId: 's28', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g28-3', lessonId: 'l-eng-03', studentId: 's28', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g28-5', lessonId: 'l-eng-05', studentId: 's28', points: 50, attendance: AttendanceStatus.PRESENT },
    { id: 'g28-6', lessonId: 'l-eng-06', studentId: 's28', points: 9, attendance: AttendanceStatus.PRESENT },
    { id: 'g28-7', lessonId: 'l-eng-07', studentId: 's28', points: 37, attendance: AttendanceStatus.PRESENT },
    { id: 'g28-9', lessonId: 'l-eng-09', studentId: 's28', points: 19, attendance: AttendanceStatus.PRESENT },
    { id: 'g28-10', lessonId: 'l-eng-10', studentId: 's28', points: 9, attendance: AttendanceStatus.PRESENT },
    { id: 'g28-11', lessonId: 'l-eng-11', studentId: 's28', points: 9, attendance: AttendanceStatus.PRESENT },

    // s29: Чепрасова
    { id: 'g29-1', lessonId: 'l-eng-01', studentId: 's29', points: 8, attendance: AttendanceStatus.PRESENT },
    { id: 'g29-2', lessonId: 'l-eng-02', studentId: 's29', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g29-4', lessonId: 'l-eng-04', studentId: 's29', points: 9, attendance: AttendanceStatus.PRESENT },
    { id: 'g29-5', lessonId: 'l-eng-05', studentId: 's29', points: 50, attendance: AttendanceStatus.PRESENT },
    { id: 'g29-6', lessonId: 'l-eng-06', studentId: 's29', points: 9, attendance: AttendanceStatus.PRESENT },
    { id: 'g29-7', lessonId: 'l-eng-07', studentId: 's29', points: 37, attendance: AttendanceStatus.PRESENT },
    { id: 'g29-9', lessonId: 'l-eng-09', studentId: 's29', points: 19, attendance: AttendanceStatus.PRESENT },
    { id: 'g29-11', lessonId: 'l-eng-11', studentId: 's29', points: 9, attendance: AttendanceStatus.PRESENT },

    // s30: Тихонов
    { id: 'g30-1', lessonId: 'l-eng-01', studentId: 's30', points: 8, attendance: AttendanceStatus.PRESENT },
    { id: 'g30-2', lessonId: 'l-eng-02', studentId: 's30', points: 8, attendance: AttendanceStatus.PRESENT },
    { id: 'g30-4', lessonId: 'l-eng-04', studentId: 's30', points: 5, attendance: AttendanceStatus.PRESENT },
    { id: 'g30-5', lessonId: 'l-eng-05', studentId: 's30', points: 45, attendance: AttendanceStatus.PRESENT },
    { id: 'g30-6', lessonId: 'l-eng-06', studentId: 's30', points: 9, attendance: AttendanceStatus.PRESENT },
    { id: 'g30-7', lessonId: 'l-eng-07', studentId: 's30', points: 34, attendance: AttendanceStatus.PRESENT },
    { id: 'g30-9', lessonId: 'l-eng-09', studentId: 's30', points: 17, attendance: AttendanceStatus.PRESENT },
    { id: 'g30-11', lessonId: 'l-eng-11', studentId: 's30', points: 9, attendance: AttendanceStatus.PRESENT },

    // s31: Ташмирзаев
    { id: 'g31-1', lessonId: 'l-eng-01', studentId: 's31', points: 9, attendance: AttendanceStatus.PRESENT },
    { id: 'g31-2', lessonId: 'l-eng-02', studentId: 's31', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g31-3', lessonId: 'l-eng-03', studentId: 's31', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g31-5', lessonId: 'l-eng-05', studentId: 's31', points: 45, attendance: AttendanceStatus.PRESENT },
    { id: 'g31-6', lessonId: 'l-eng-06', studentId: 's31', points: 9, attendance: AttendanceStatus.PRESENT },
    { id: 'g31-7', lessonId: 'l-eng-07', studentId: 's31', points: 35, attendance: AttendanceStatus.PRESENT },
    { id: 'g31-8', lessonId: 'l-eng-08', studentId: 's31', points: 9, attendance: AttendanceStatus.PRESENT },
    { id: 'g31-9', lessonId: 'l-eng-09', studentId: 's31', points: 22, attendance: AttendanceStatus.PRESENT },
    { id: 'g31-11', lessonId: 'l-eng-11', studentId: 's31', points: 10, attendance: AttendanceStatus.PRESENT },

    // s32: Николенко
    { id: 'g32-1', lessonId: 'l-eng-01', studentId: 's32', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g32-2', lessonId: 'l-eng-02', studentId: 's32', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g32-4', lessonId: 'l-eng-04', studentId: 's32', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g32-5', lessonId: 'l-eng-05', studentId: 's32', points: 50, attendance: AttendanceStatus.PRESENT },
    { id: 'g32-6', lessonId: 'l-eng-06', studentId: 's32', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g32-7', lessonId: 'l-eng-07', studentId: 's32', points: 40, attendance: AttendanceStatus.PRESENT },
    { id: 'g32-9', lessonId: 'l-eng-09', studentId: 's32', points: 22, attendance: AttendanceStatus.PRESENT },
    { id: 'g32-11', lessonId: 'l-eng-11', studentId: 's32', points: 10, attendance: AttendanceStatus.PRESENT },

    // s33: Кондратьева
    { id: 'g33-1', lessonId: 'l-eng-01', studentId: 's33', points: 8, attendance: AttendanceStatus.PRESENT },
    { id: 'g33-2', lessonId: 'l-eng-02', studentId: 's33', points: 8, attendance: AttendanceStatus.PRESENT },
    { id: 'g33-3', lessonId: 'l-eng-03', studentId: 's33', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g33-5', lessonId: 'l-eng-05', studentId: 's33', points: 50, attendance: AttendanceStatus.PRESENT },
    { id: 'g33-6', lessonId: 'l-eng-06', studentId: 's33', points: 9, attendance: AttendanceStatus.PRESENT },
    { id: 'g33-7', lessonId: 'l-eng-07', studentId: 's33', points: 36, attendance: AttendanceStatus.PRESENT },
    { id: 'g33-8', lessonId: 'l-eng-08', studentId: 's33', points: 9, attendance: AttendanceStatus.PRESENT },
    { id: 'g33-9', lessonId: 'l-eng-09', studentId: 's33', points: 19, attendance: AttendanceStatus.PRESENT },
    { id: 'g33-11', lessonId: 'l-eng-11', studentId: 's33', points: 10, attendance: AttendanceStatus.PRESENT },

    // s34: Ким Лиза
    { id: 'g34-1', lessonId: 'l-eng-01', studentId: 's34', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g34-2', lessonId: 'l-eng-02', studentId: 's34', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g34-4', lessonId: 'l-eng-04', studentId: 's34', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g34-5', lessonId: 'l-eng-05', studentId: 's34', points: 50, attendance: AttendanceStatus.PRESENT },
    { id: 'g34-6', lessonId: 'l-eng-06', studentId: 's34', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g34-7', lessonId: 'l-eng-07', studentId: 's34', points: 40, attendance: AttendanceStatus.PRESENT },
    { id: 'g34-9', lessonId: 'l-eng-09', studentId: 's34', points: 20, attendance: AttendanceStatus.PRESENT },
    { id: 'g34-10', lessonId: 'l-eng-10', studentId: 's34', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g34-11', lessonId: 'l-eng-11', studentId: 's34', points: 10, attendance: AttendanceStatus.PRESENT },

    // s35: Ким Вероника
    { id: 'g35-1', lessonId: 'l-eng-01', studentId: 's35', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g35-2', lessonId: 'l-eng-02', studentId: 's35', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g35-3', lessonId: 'l-eng-03', studentId: 's35', points: 10, attendance: AttendanceStatus.PRESENT },
    { id: 'g35-4', lessonId: 'l-eng-04', studentId: 's35', points: 9, attendance: AttendanceStatus.PRESENT },
    { id: 'g35-5', lessonId: 'l-eng-05', studentId: 's35', points: 50, attendance: AttendanceStatus.PRESENT },
    { id: 'g35-7', lessonId: 'l-eng-07', studentId: 's35', points: 40, attendance: AttendanceStatus.PRESENT },
    { id: 'g35-9', lessonId: 'l-eng-09', studentId: 's35', points: 21, attendance: AttendanceStatus.PRESENT },
    { id: 'g35-11', lessonId: 'l-eng-11', studentId: 's35', points: 10, attendance: AttendanceStatus.PRESENT },
];
