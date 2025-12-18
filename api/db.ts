
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const sql = postgres(connectionString, {
  ssl: 'require',
  max: 1, // Serverless окружение требует малого количества соединений
  idle_timeout: 20,
  connect_timeout: 30,
});

export default sql;
