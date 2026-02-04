import jsonwebtoken from 'jsonwebtoken';

/*
Generates a JSON Web Token (JWT) for user authentication.
*/
const generateToken = (id, username) => {
	// // Using shorthand property names { id, username }
	return jsonwebtoken.sign({ id: id, username: username }, process.env.JWT_SECRET, {
		expiresIn: '24h',
	});
};

export default generateToken;
