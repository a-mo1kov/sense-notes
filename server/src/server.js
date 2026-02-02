import app from "./app.js";
import logger from "./dependencies/winston.js";
import dbConnection from "./tests/database-connection.js";

const isDbConnected = await dbConnection();

if (isDbConnected) {
	app.listen(process.env.PORT, () => {
		logger.info(`Server is running: http://localhost:${process.env.PORT}`);
	});
} else {
	logger.warn("Database connection error, check the logs.");
}
