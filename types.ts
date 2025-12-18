
export enum AttendanceStatus {
  PRESENT = 'Present',
  ABSENT = 'Absent',
  EXCUSED = 'Excused'
}

export enum LessonType {
  NORMAL = 'Урок',
  SOR = 'СОР',
  SOCH = 'СОЧ',
  PROJECT = 'Проект',
  EXAM = 'Экзамен',
  QUIZ = 'Тест',
  CLASSWORK = 'Классная работа',
  HOMEWORK = 'Домашняя работа',
  INDEPENDENT = 'Самостоятельная работа',
  PRACTICAL = 'Практическая работа'
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  studentId: string;
  classId: string;
}

export interface Class {
  id: string;
  name: string;
}

export interface Subject {
  id: string;
  name: string;
}

export interface Lesson {
  id: string;
  subjectId: string;
  classId: string;
  date: string;
  type: LessonType;
  topic: string;
  homework: string;
  maxPoints: number;
}

export interface GradeCell {
  id: string;
  lessonId: string;
  studentId: string;
  points: number | null;
  attendance: AttendanceStatus;
  attendanceNote?: string;
  comment?: string;
}

export interface Message {
  id: string;
  fromTeacherId: string;
  toStudentId: string | null; // null for class-wide
  classId: string;
  text: string;
  date: string;
}

export interface Quarter {
  id: string;
  subjectId: string;
  name: string;
  startDate: string;
  endDate: string;
}

export interface ScheduleRule {
  id: string;
  subjectId: string;
  classId: string;
  daysOfWeek: number[]; // 0=Sun, 1=Mon, ..., 6=Sat
  startDate: string;
  endDate: string;
}

export interface DrawingBoard {
  id: string;
  name: string;
  data: string;
  createdAt: string;
}
