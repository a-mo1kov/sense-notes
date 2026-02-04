class ApiError extends Error {
	constructor(statusCode, message) {
		super(message);
		this.statusCode = statusCode;
	}

	sendError(res) {
		return res.status(this.statusCode).json({ message: this.message });
	}
}

export default ApiError;
