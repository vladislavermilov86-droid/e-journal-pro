
import { VercelRequest, VercelResponse } from '@vercel/node';
import sql from './db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const students = await sql`
        SELECT id, first_name as "firstName", last_name as "lastName", student_id as "studentId", class_id as "classId" 
        FROM students 
        ORDER BY last_name ASC
      `;
      return res.status(200).json(students);
    }

    if (req.method === 'POST') {
      const { id, firstName, lastName, studentId, classId } = req.body;
      const [student] = await sql`
        INSERT INTO students (id, first_name, last_name, student_id, class_id)
        VALUES (${id}, ${firstName}, ${lastName}, ${studentId}, ${classId})
        ON CONFLICT (id) DO UPDATE SET 
          first_name = ${firstName}, 
          last_name = ${lastName}, 
          student_id = ${studentId}, 
          class_id = ${classId}
        RETURNING id, first_name as "firstName", last_name as "lastName", student_id as "studentId", class_id as "classId"
      `;
      return res.status(200).json(student);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await sql`DELETE FROM students WHERE id = ${id as string}`;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}
