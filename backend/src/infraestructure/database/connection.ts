import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST as string,
  database: process.env.DB_NAME as string,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  port: parseInt(process.env.DB_PORT as string),
});

export default pool;
