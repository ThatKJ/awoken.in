import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://awoken:password@localhost:5432/awoken_db",
});

export default pool;
