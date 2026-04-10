import mysql, { Pool, RowDataPacket, ResultSetHeader, FieldPacket } from 'mysql2/promise';
import env from './env';

const pool: Pool = mysql.createPool({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    database: env.db.name,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

export type QueryResult<T = RowDataPacket[]> = [T, FieldPacket[]];
export type ExecuteResult = [ResultSetHeader, FieldPacket[]];

export const testConnection = async (): Promise<void> => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ MySQL Database connected successfully');
        connection.release();
    } catch (error) {
        console.error('❌ MySQL Database connection failed:', error);
        process.exit(1);
    }
};

export default pool;
