
import { VercelRequest, VercelResponse } from '@vercel/node';
import sql from './db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const quarters = await sql`
        SELECT id, subject_id as "subjectId", name, start_date::text as "startDate", end_date::text as "endDate"
        FROM quarters
        ORDER BY start_date ASC
      `;
      return res.status(200).json(quarters);
    }

    if (req.method === 'POST') {
      const { id, subjectId, name, startDate, endDate } = req.body;

      if (!id || !subjectId || !name || !startDate || !endDate) {
        return res.status(400).json({ message: 'Все поля (id, subjectId, name, startDate, endDate) обязательны' });
      }

      // Проверяем существование предмета перед вставкой, чтобы выдать понятную ошибку
      const [subject] = await sql`SELECT id FROM subjects WHERE id = ${subjectId}`;
      if (!subject) {
        return res.status(400).json({ 
          message: `Предмет с ID ${subjectId} не найден в базе. Сначала сохраните предметы в настройках.`,
          code: 'SUBJECT_NOT_FOUND'
        });
      }

      const [quarter] = await sql`
        INSERT INTO quarters (id, subject_id, name, start_date, end_date)
        VALUES (${id}, ${subjectId}, ${name}, ${startDate}, ${endDate})
        ON CONFLICT (id) DO UPDATE SET
          subject_id = ${subjectId},
          name = ${name},
          start_date = ${startDate},
          end_date = ${endDate}
        RETURNING id, subject_id as "subjectId", name, start_date::text as "startDate", end_date::text as "endDate"
      `;
      return res.status(200).json(quarter);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (id) {
        await sql`DELETE FROM quarters WHERE id = ${id as string}`;
        return res.status(200).json({ success: true });
      }
      return res.status(400).json({ message: 'Missing id parameter' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error: any) {
    console.error('Quarters API Error:', error);
    return res.status(500).json({ 
      message: error.message || 'Внутренняя ошибка сервера при работе с четвертями',
      detail: error.detail,
      hint: error.hint
    });
  }
}
