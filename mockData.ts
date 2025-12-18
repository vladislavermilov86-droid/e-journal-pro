
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

// Теперь эти массивы пустые, чтобы вы могли создать всё сами через интерфейс
export const initialQuarters: Quarter[] = [];
export const initialLessons: Lesson[] = [];
export const initialGrades: GradeCell[] = [];
