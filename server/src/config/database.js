import pg from "pg";
import dotenv from "dotenv";

dotenv.config({ path: "src/config/.env" });

const pool = new pg.Pool({
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	password: process.env.DB_PASSWORD,
});

export default pool;
