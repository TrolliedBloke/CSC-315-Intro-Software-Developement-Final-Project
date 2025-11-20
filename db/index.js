require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

module.exports = pool; // <--- export pool

// optional: test connection
async function test() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Connected successfully!", result.rows);
  } catch (err) {
    console.error("Connection failed:", err);
  }
}
test();
