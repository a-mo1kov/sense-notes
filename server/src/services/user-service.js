import UserDatabase from '../data-access-layer/user-database.js';
import Bcrypt from '../dependencies/bcrypt.js';
import ApiError from '../utils/api-error.js';
import generateToken from '../dependencies/jsonwebtoken.js';

/*
Service layer for handling complex business logic for users.
*/
class UserService {
	//Processes user registration logic.
	async serviceSignup(username, password) {
		const user = await UserDatabase.isUsernameExists(username);
		if (user.rows.length > 0) {
			throw new ApiError(
				409,
				'This username is already taken, please choose another one.',
			);
		}

		const passwordHash = await Bcrypt.generateHashPassword(password);

		await UserDatabase.createUser(username, passwordHash);
	}

	//Processes user authentication and issues a token.
	async serviceLogin(username, password) {
		const userRequest = await UserDatabase.findUser(username);

		if (userRequest.rows.length === 0) {
			throw new ApiError(401, 'Invalid username or password');
		}

		const user = userRequest.rows[0];

		const validPassword = await Bcrypt.isValidPassword(password, user.password_hash);

		if (!validPassword) {
			throw new ApiError(401, 'Invalid username or password');
		}

		return generateToken(user.id, user.username);
	}
}

export default new UserService();
