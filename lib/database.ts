import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || '203.234.214.202',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'swkim',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'seesaw',
  timezone: '+09:00',
  charset: 'utf8mb4'
};

let connection: mysql.Connection | null = null;

export async function getConnection(): Promise<mysql.Connection> {
  if (!connection) {
    try {
      connection = await mysql.createConnection(dbConfig);
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Database connection failed:', error);
      throw error;
    }
  }
  return connection;
}

export async function executeQuery<T = any>(query: string, params?: any[]): Promise<T[]> {
  try {
    const conn = await getConnection();
    const [rows] = await conn.execute(query, params);
    return rows as T[];
  } catch (error) {
    console.error('Query execution failed:', error);
    throw error;
  }
}

export async function closeConnection(): Promise<void> {
  if (connection) {
    await connection.end();
    connection = null;
    console.log('Database connection closed');
  }
}