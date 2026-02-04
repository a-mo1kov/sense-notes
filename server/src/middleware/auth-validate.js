import ApiError from '../utils/api-error.js';
import logger from '../dependencies/winston.js';

/*
Middleware to validate user credentials during signup or login.
Checks for data types and string length constraints.
*/
function authValidate(req, res, next) {
	const { username, password } = req.body;

	// 1. Type validation
	if (typeof username !== 'string' || typeof password !== 'string') {
		logger.warn('The user sent an incorrect data type.');
		return new ApiError(400, 'Username and password must be strings').sendError(res);
	}

	// 2. Length constraints (Min: 5, Max: 25)
	const MIN_LENGTH = 5;
	const MAX_LENGTH = 25;

	if (username.length < MIN_LENGTH || username.length > MAX_LENGTH) {
		logger.warn('The username does not meet the length requirements.');
		return new ApiError(
			400,
			`Username must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters`,
		).sendError(res);
	}

	if (password.length < MIN_LENGTH || password.length > MAX_LENGTH) {
		logger.warn('The password does not meet the length requirements.');
		return new ApiError(
			400,
			`Password must be between ${MIN_LENGTH} and ${MAX_LENGTH} characters`,
		).sendError(res);
	}

	// If all checks pass, proceed to the next function
	next();
}

export default authValidate;
