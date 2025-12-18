
import { VercelRequest, VercelResponse } from '@vercel/node';
import sql from './db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const grades = await sql`
        SELECT id, lesson_id as "lessonId", student_id as "studentId", points, attendance, attendance_note as "attendanceNote", comment
        FROM grades
      `;
      return res.status(200).json(grades);
    }

    if (req.method === 'POST') {
      const { id, lessonId, studentId, points, attendance, attendanceNote, comment } = req.body;
      const [grade] = await sql`
        INSERT INTO grades (id, lesson_id, student_id, points, attendance, attendance_note, comment)
        VALUES (${id}, ${lessonId}, ${studentId}, ${points}, ${attendance}, ${attendanceNote}, ${comment})
        ON CONFLICT (lesson_id, student_id) DO UPDATE SET
          points = ${points},
          attendance = ${attendance},
          attendance_note = ${attendanceNote},
          comment = ${comment}
        RETURNING id, lesson_id as "lessonId", student_id as "studentId", points, attendance, attendance_note as "attendanceNote", comment
      `;
      return res.status(200).json(grade);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
