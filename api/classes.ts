
import { VercelRequest, VercelResponse } from '@vercel/node';
import sql from './db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    try {
      await sql`ALTER TABLE classes ADD COLUMN IF NOT EXISTS is_archived BOOLEAN DEFAULT false;`;
    } catch (e) {
      // ignore
    }

    if (req.method === 'GET') {
      const classes = await sql`SELECT id, name, is_archived as "isArchived" FROM classes ORDER BY is_archived ASC, name ASC`;
      return res.status(200).json(classes);
    }

    if (req.method === 'POST') {
      const { id, name, isArchived } = req.body;
      const [newClass] = await sql`
        INSERT INTO classes (id, name, is_archived)
        VALUES (${id}, ${name}, ${isArchived ?? false})
        ON CONFLICT (id) DO UPDATE SET 
          name = ${name},
          is_archived = ${isArchived ?? false}
        RETURNING id, name, is_archived as "isArchived"
      `;
      return res.status(200).json(newClass);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await sql`DELETE FROM classes WHERE id = ${id as string}`;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error: any) {
    console.error('Classes API Error:', error);
    return res.status(500).json({ message: error.message, code: error.code });
  }
}
