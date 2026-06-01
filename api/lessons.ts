
import { VercelRequest, VercelResponse } from '@vercel/node';
import sql from './db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    try {
      await sql`ALTER TABLE lessons ADD COLUMN signature TEXT;`;
    } catch (e) {
      // ignore
    }

    if (req.method === 'GET') {
      const lessons = await sql`
        SELECT id, subject_id as "subjectId", class_id as "classId", date::text, type, topic, homework, max_points as "maxPoints", signature
        FROM lessons
      `;
      return res.status(200).json(lessons);
    }

    if (req.method === 'POST') {
      const { id, subjectId, classId, date, type, topic, homework, maxPoints, signature } = req.body;

      // Проверка на наличие предмета в базе, чтобы избежать ошибки 500 с FK Constraint
      if (subjectId) {
        const [subject] = await sql`SELECT id FROM subjects WHERE id = ${subjectId}`;
        if (!subject) {
          return res.status(400).json({ 
            message: `Предмет с ID ${subjectId} не найден. Невозможно создать урок.`,
            code: 'SUBJECT_NOT_FOUND' 
          });
        }
      }

      const [lesson] = await sql`
        INSERT INTO lessons (id, subject_id, class_id, date, type, topic, homework, max_points, signature)
        VALUES (${id}, ${subjectId}, ${classId}, ${date}, ${type}, ${topic}, ${homework}, ${maxPoints}, ${signature || null})
        ON CONFLICT (id) DO UPDATE SET
          subject_id = ${subjectId},
          class_id = ${classId},
          date = ${date},
          type = ${type},
          topic = ${topic},
          homework = ${homework},
          max_points = ${maxPoints},
          signature = coalesce(${signature || null}, lessons.signature)
        RETURNING id, subject_id as "subjectId", class_id as "classId", date::text, type, topic, homework, max_points as "maxPoints", signature
      `;
      return res.status(200).json(lesson);
    }

    if (req.method === 'DELETE') {
      const { id } = req.body; // App.tsx шлет id в теле для DELETE
      const lessonId = id || req.query.id;
      await sql`DELETE FROM lessons WHERE id = ${lessonId as string}`;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
