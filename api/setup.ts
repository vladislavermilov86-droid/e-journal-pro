
import { VercelRequest, VercelResponse } from '@vercel/node';
import sql from './db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await sql.begin(async (sql) => {
      // 1. Создаем типы (только если их нет)
      await sql`
        DO $$ BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'attendance_status') THEN
            CREATE TYPE attendance_status AS ENUM ('Present', 'Absent', 'Excused');
          END IF;
          
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'lesson_type') THEN
            CREATE TYPE lesson_type AS ENUM ('Урок', 'СОР', 'СОЧ', 'Проект', 'Экзамен', 'Тест', 'Классная работа', 'Домашняя работа', 'Самостоятельная работа', 'Практическая работа');
          END IF;
        END $$;
      `;

      // 2. Создаем таблицы по порядку
      await sql`CREATE TABLE IF NOT EXISTS classes (id TEXT PRIMARY KEY, name TEXT NOT NULL UNIQUE)`;
      await sql`CREATE TABLE IF NOT EXISTS subjects (id TEXT PRIMARY KEY, name TEXT NOT NULL UNIQUE)`;
      
      await sql`
        CREATE TABLE IF NOT EXISTS students (
          id TEXT PRIMARY KEY,
          first_name TEXT NOT NULL,
          last_name TEXT NOT NULL,
          student_id TEXT UNIQUE,
          class_id TEXT REFERENCES classes(id) ON DELETE CASCADE
        )
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS lessons (
          id TEXT PRIMARY KEY,
          subject_id TEXT REFERENCES subjects(id) ON DELETE CASCADE,
          class_id TEXT REFERENCES classes(id) ON DELETE CASCADE,
          date DATE NOT NULL,
          type lesson_type DEFAULT 'Урок',
          topic TEXT,
          homework TEXT,
          max_points INTEGER DEFAULT 10
        )
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS quarters (
          id TEXT PRIMARY KEY,
          subject_id TEXT REFERENCES subjects(id) ON DELETE CASCADE,
          name TEXT NOT NULL,
          start_date DATE NOT NULL,
          end_date DATE NOT NULL
        )
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS grades (
          id TEXT PRIMARY KEY,
          lesson_id TEXT REFERENCES lessons(id) ON DELETE CASCADE,
          student_id TEXT REFERENCES students(id) ON DELETE CASCADE,
          points INTEGER,
          attendance attendance_status DEFAULT 'Present',
          attendance_note TEXT,
          comment TEXT,
          UNIQUE(lesson_id, student_id)
        )
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS boards (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          data TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
    });

    return res.status(200).json({ success: true, message: 'Database schema initialized successfully' });
  } catch (error: any) {
    console.error('Setup Error Details:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to initialize database', 
      error: error.message,
      detail: error.detail || 'No extra details'
    });
  }
}
