
import { VercelRequest, VercelResponse } from '@vercel/node';
import sql from './db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const subjects = await sql`SELECT * FROM subjects ORDER BY name ASC`;
      return res.status(200).json(subjects);
    }

    if (req.method === 'POST') {
      const { id, name } = req.body;
      const [subject] = await sql`
        INSERT INTO subjects (id, name)
        VALUES (${id}, ${name})
        ON CONFLICT (id) DO UPDATE SET name = ${name}
        RETURNING *
      `;
      return res.status(200).json(subject);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (id) {
        await sql`DELETE FROM subjects WHERE id = ${id as string}`;
        return res.status(200).json({ success: true });
      }
      return res.status(400).json({ message: 'Missing id parameter' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
