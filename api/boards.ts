
import { VercelRequest, VercelResponse } from '@vercel/node';
import sql from './db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const boards = await sql`
        SELECT id, name, data, created_at as "createdAt"
        FROM boards
        ORDER BY created_at DESC
      `;
      return res.status(200).json(boards);
    }

    if (req.method === 'POST') {
      const { id, name, data } = req.body;
      const [board] = await sql`
        INSERT INTO boards (id, name, data)
        VALUES (${id}, ${name}, ${data})
        ON CONFLICT (id) DO UPDATE SET
          name = ${name},
          data = ${data}
        RETURNING id, name, data, created_at as "createdAt"
      `;
      return res.status(200).json(board);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await sql`DELETE FROM boards WHERE id = ${id as string}`;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
