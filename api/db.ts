
import postgres from 'postgres';

// Neon/Vercel обычно предоставляют DATABASE_URL или POSTGRES_URL
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  console.error('CRITICAL: Database connection string is missing in environment variables.');
}

const sql = postgres(connectionString || '', {
  ssl: 'require',
  max: 1, // Важно для Serverless функций (одно соединение на вызов)
  idle_timeout: 20,
  connect_timeout: 30,
  // Дополнительная проверка, если строка подключения пуста
  onnotice: (notice) => console.log('DB Notice:', notice),
});

export default sql;
