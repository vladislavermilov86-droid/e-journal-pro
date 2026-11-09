import { VercelRequest, VercelResponse } from '@vercel/node';
import sql from './db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Автоматически создаем таблицу messages, если ее еще нет в базе
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS messages (
          id TEXT PRIMARY KEY,
          from_teacher_id TEXT,
          to_student_id TEXT,
          class_id TEXT,
          text TEXT NOT NULL,
          date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;
    } catch (e) {
      // Игнорируем ошибку существования
    }

    if (req.method === 'GET') {
      const messages = await sql`
        SELECT 
          id, 
          from_teacher_id as "fromTeacherId", 
          to_student_id as "toStudentId", 
          class_id as "classId", 
          text, 
          date::text as "date"
        FROM messages
        ORDER BY date DESC
      `;
      return res.status(200).json(messages);
    }

    if (req.method === 'POST') {
      const { id, fromTeacherId, toStudentId, classId, text, date } = req.body;

      if (!id || !text) {
        return res.status(400).json({ message: 'Поля id и text обязательны' });
      }

      const [newMessage] = await sql`
        INSERT INTO messages (id, from_teacher_id, to_student_id, class_id, text, date)
        VALUES (
          ${id}, 
          ${fromTeacherId || 'teacher-1'}, 
          ${toStudentId || null}, 
          ${classId || null}, 
          ${text}, 
          ${date ? new Date(date) : new Date()}
        )
        ON CONFLICT (id) DO UPDATE SET
          from_teacher_id = ${fromTeacherId || 'teacher-1'},
          to_student_id = ${toStudentId || null},
          class_id = ${classId || null},
          text = ${text},
          date = ${date ? new Date(date) : new Date()}
        RETURNING 
          id, 
          from_teacher_id as "fromTeacherId", 
          to_student_id as "toStudentId", 
          class_id as "classId", 
          text, 
          date::text as "date"
      `;
      return res.status(200).json(newMessage);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (id) {
        await sql`DELETE FROM messages WHERE id = ${id as string}`;
        return res.status(200).json({ success: true });
      }
      return res.status(400).json({ message: 'Missing id parameter' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error: any) {
    console.error('Messages API Error:', error);
    return res.status(500).json({ message: error.message || 'Ошибка сервера при работе с сообщениями' });
  }
}
