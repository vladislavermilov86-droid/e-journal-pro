
import postgres from 'postgres';

// Пробуем разные варианты переменных, которые может предоставить Vercel/Neon
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL or POSTGRES_URL environment variable is not set');
}

// Добавляем ssl=require если его нет в строке
const url = new URL(connectionString);
if (!url.searchParams.has('sslmode')) {
  url.searchParams.set('sslmode', 'require');
}

const sql = postgres(url.toString(), {
  ssl: 'require',
  max: 1,
  idle_timeout: 20,
  connect_timeout: 30,
});

export default sql;
