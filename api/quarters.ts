
import { VercelRequest, VercelResponse } from '@vercel/node';
import sql from './db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const quarters = await sql`
        SELECT id, subject_id as "subjectId", name, start_date::text as "startDate", end_date::text as "endDate"
        FROM quarters
      `;
      return res.status(200).json(quarters);
    }

    if (req.method === 'POST') {
      const { id, subjectId, name, startDate, endDate } = req.body;
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

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
