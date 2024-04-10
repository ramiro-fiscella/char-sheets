const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5433,
  database: "char_sheet",
});

const query = async (queryString, params) => {
  const client = await pool.connect();
  try {
    return await client.query(queryString, params);
  } finally {
    client.release();
  }
};

module.exports = { query };
