import pool from '../config/database.js';

/**
Data Access Layer for User-related database operations.
*/
class UserDatabase {
	/*
	Checks if a username already exists in the database.
	*/
	async isUsernameExists(username) {
		return await pool.query('SELECT username from users where username = $1', [username]);
	}

	/*
	Inserts a new user into the database.
	*/
	async createUser(username, passwordHash) {
		return await pool.query(
			'INSERT INTO users (username,password_hash) values ($1, $2) RETURNING id',
			[username, passwordHash],
		);
	}

	/*
	Retrieves all user information by username.
	*/
	async findUser(username) {
		return await pool.query('SELECT * FROM users where username = $1', [username]);
	}
}

export default new UserDatabase();
