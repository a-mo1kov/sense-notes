import pool from "../config/database.js";
import logger from "../dependencies/winston.js";

async function dbConnection() {
	try {
		const dbRequest = await pool.connect();
		logger.info("Successful connection to the database.");
		dbRequest.release();
		return true;
	} catch (err) {
		logger.error({ msg: "Database connection error", err });
		return false;
	}
}

export default dbConnection;
