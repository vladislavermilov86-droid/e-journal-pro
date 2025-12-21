
import { VercelRequest, VercelResponse } from '@vercel/node';
import sql from './db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const marks = await sql`
        SELECT id, quarter_id as "quarterId", student_id as "studentId", mark
        FROM quarter_marks
      `;
      return res.status(200).json(marks);
    }

    if (req.method === 'POST') {
      const { id, quarterId, studentId, mark } = req.body;
      
      if (!id || !quarterId || !studentId) {
        return res.status(400).json({ message: 'id, quarterId и studentId обязательны' });
      }

      const [newMark] = await sql`
        INSERT INTO quarter_marks (id, quarter_id, student_id, mark)
        VALUES (${id}, ${quarterId}, ${studentId}, ${mark})
        ON CONFLICT (quarter_id, student_id) DO UPDATE SET
          mark = ${mark}
        RETURNING id, quarter_id as "quarterId", student_id as "studentId", mark
      `;
      return res.status(200).json(newMark);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error: any) {
    console.error('Quarter Marks API Error:', error);
    return res.status(500).json({ message: error.message });
  }
}
