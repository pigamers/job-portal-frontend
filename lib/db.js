import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test query to verify connection and data
const testConnection = async () => {
  try {
    const result = await pool.query('SELECT COUNT(*) FROM jobs');
    console.log('Database connected. Total jobs:', result.rows[0].count);
  } catch (err) {
    console.error('Database connection error:', err);
  }
};

testConnection();

export default pool;