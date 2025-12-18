
import { VercelRequest, VercelResponse } from '@vercel/node';
import sql from './db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const classes = await sql`SELECT * FROM classes ORDER BY name ASC`;
      return res.status(200).json(classes);
    }

    if (req.method === 'POST') {
      const { id, name } = req.body;
      const [newClass] = await sql`
        INSERT INTO classes (id, name)
        VALUES (${id}, ${name})
        ON CONFLICT (id) DO UPDATE SET name = ${name}
        RETURNING *
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
    return res.status(500).json({ message: error.message });
  }
}
