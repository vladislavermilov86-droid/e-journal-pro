
import { VercelRequest, VercelResponse } from '@vercel/node';
import sql from './db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { classes, subjects, quarters, students, lessons, grades } = req.body;

  try {
    await sql.begin(async (sql) => {
      // 1. Очистка (опционально, но для демо-импорта полезно)
      // Мы используем ON CONFLICT в инсертах, так что очистка не обязательна
      
      // 2. Классы
      if (classes?.length) {
        await sql`INSERT INTO classes ${sql(classes, 'id', 'name')} ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name`;
      }
      
      // 3. Предметы
      if (subjects?.length) {
        await sql`INSERT INTO subjects ${sql(subjects, 'id', 'name')} ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name`;
      }

      // 4. Четверти
      if (quarters?.length) {
        await sql`INSERT INTO quarters ${sql(quarters, 'id', 'subject_id', 'name', 'start_date', 'end_date')} ON CONFLICT (id) DO NOTHING`;
      }

      // 5. Ученики
      if (students?.length) {
        const studentData = students.map((s: any) => ({
          id: s.id,
          first_name: s.firstName,
          last_name: s.lastName,
          student_id: s.studentId,
          class_id: s.classId
        }));
        await sql`INSERT INTO students ${sql(studentData, 'id', 'first_name', 'last_name', 'student_id', 'class_id')} ON CONFLICT (id) DO NOTHING`;
      }

      // 6. Уроки
      if (lessons?.length) {
        const lessonData = lessons.map((l: any) => ({
          id: l.id,
          subject_id: l.subjectId,
          class_id: l.classId,
          date: l.date,
          type: l.type,
          topic: l.topic,
          homework: l.homework,
          max_points: l.maxPoints
        }));
        await sql`INSERT INTO lessons ${sql(lessonData, 'id', 'subject_id', 'class_id', 'date', 'type', 'topic', 'homework', 'max_points')} ON CONFLICT (id) DO NOTHING`;
      }

      // 7. Оценки (пачками по 100 для надежности)
      if (grades?.length) {
        const gradeData = grades.map((g: any) => ({
          id: g.id,
          lesson_id: g.lessonId,
          student_id: g.studentId,
          points: g.points,
          attendance: g.attendance,
          attendance_note: g.attendanceNote,
          comment: g.comment
        }));
        
        // Вставляем оценки. Используем цикл по 100 записей, если их очень много
        for (let i = 0; i < gradeData.length; i += 100) {
          const chunk = gradeData.slice(i, i + 100);
          await sql`
            INSERT INTO grades ${sql(chunk, 'id', 'lesson_id', 'student_id', 'points', 'attendance', 'attendance_note', 'comment')}
            ON CONFLICT (lesson_id, student_id) DO UPDATE SET
              points = EXCLUDED.points,
              attendance = EXCLUDED.attendance,
              attendance_note = EXCLUDED.attendance_note,
              comment = EXCLUDED.comment
          `;
        }
      }
    });

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Seed error:', error);
    return res.status(500).json({ message: error.message });
  }
}
