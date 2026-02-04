import bcrypt from 'bcrypt';

/*
Utility class for secure password hashing
*/
class Bcrypt {
	/*
	Cost factor for hashing (iterations)
	*/
	static #SALT_ROUND = 10;

	/*
	Generates a secure hash for a password.
	*/
	async generateHashPassword(password) {
		const salt = await bcrypt.genSalt(Bcrypt.#SALT_ROUND);
		const hashedPassword = await bcrypt.hash(password, salt);
		return hashedPassword;
	}

	/*
	Compares a password with a stored hash.
	*/
	async isValidPassword(password, passwordHash) {
		return await bcrypt.compare(password, passwordHash);
	}
}

export default new Bcrypt();
