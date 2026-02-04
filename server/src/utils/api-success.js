class ApiSuccess {
	constructor(statusCode, data) {
		this.statusCode = statusCode;
		this.data = data;
	}

	sendSuccess(res) {
		const response =
			typeof this.data === "object" ? this.data : { message: this.data };

		return res.status(this.statusCode).json(response);
	}
}

export default ApiSuccess;
