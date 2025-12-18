
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  console.error('CRITICAL: Database connection string is missing.');
}

const sql = postgres(connectionString || '', {
  ssl: 'require',
  max: 10, // Увеличено с 1 до 10
  idle_timeout: 20,
  connect_timeout: 30,
});

export default sql;
