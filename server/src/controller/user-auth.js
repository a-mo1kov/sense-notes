import userService from '../services/user-service.js';
import ApiError from '../utils/api-error.js';
import ApiSuccess from '../utils/api-success.js';
import logger from '../dependencies/winston.js';

/*
Controller for handling user authentication requests (Signup, Login).
*/
class UserAuth {
	async signup(req, res) {
		try {
			const { username, password } = req.body;

			// Delegate registration logic to the service layer
			await userService.serviceSignup(username, password);

			logger.info('A new user has registered.');

			const response = new ApiSuccess(201, `Registration successful, hello ${username}`);
			response.sendSuccess(res);
		} catch (err) {
			// Check if error is a known operational error

			logger.error({ msg: 'signup controller error', err });

			if (err instanceof ApiError) {
				return err.sendError(res);
			}

			new ApiError(500, 'Internal server error').sendError(res);
		}
	}

	async login(req, res) {
		try {
			const { username, password } = req.body;

			// Authenticate user and retrieve JWT token
			const token = await userService.serviceLogin(username, password);

			logger.info('A new user has logged in.');

			const response = new ApiSuccess(200, {
				message: 'Login successful',
				token: token,
				username: username,
			});
			response.sendSuccess(res);
		} catch (err) {
			// Check if error is a known operational error

			logger.error({ msg: 'login controller error', err });

			if (err instanceof ApiError) {
				return err.sendError(res);
			}

			new ApiError(500, 'Internal server error').sendError(res);
		}
	}
}

export default new UserAuth();
