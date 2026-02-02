import winston from "winston";

const consoleFormat = winston.format.combine(
	winston.format.colorize({ all: true }),
	winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
	winston.format.printf(({ timestamp, level, message }) => {
		return `${timestamp} ${level} : ${message}`;
	}),
);

const logger = winston.createLogger({
	level: "debug",
	format: winston.format.combine(
		winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
		winston.format.errors({ stack: true }),
		winston.format.json(),
	),
	transports: [
		new winston.transports.File({
			filename: "logs/errors.log",
			level: "error",
			options: { mkdir: true },
		}),
		new winston.transports.File({
			filename: "logs/combined.log",
			options: { mkdir: true },
		}),
		new winston.transports.Console({
			format: consoleFormat,
		}),
	],
});

export default logger;
