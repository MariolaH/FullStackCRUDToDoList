const dotenv = require("dotenv"); // Use require instead of import
dotenv.config(); // Load environment variables

const { Pool } = require("pg"); // Use require for pg

// Connect to the database
const pool = new Pool({
  user: process.env.PG_USER,       // Database user
  host: process.env.PG_HOST,       // Database host
  database: process.env.PG_DATABASE, // Database name
  password: process.env.PG_PASSWORD, // Database password
  port: process.env.PG_PORT,        // Database port (default: 5432)
});

module.exports = pool; // Use module.exports to export the pool
