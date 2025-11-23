const formatValidationErrors = (err) =>
	Object.values(err.errors || {}).map((e) => e.message);

const errorHandler = (err, _req, res, _next) => {
	const isProduction = process.env.NODE_ENV === "production";
	let statusCode = err.statusCode || 500;
	let message = err.message || "Something went wrong";
	let details = null;

	if (err.name === "ValidationError") {
		statusCode = 400;
		details = formatValidationErrors(err);
		message = "Validation failed";
	}

	if (err.name === "CastError") {
		statusCode = 400;
		message = `Invalid ${err.path}: ${err.value}`;
	}

	if (err.code === 11000) {
		statusCode = 409;
		message = `Duplicate value for ${Object.keys(err.keyValue).join(", ")}`;
	}

	if (err.code === "LIMIT_FILE_SIZE") {
		statusCode = 413;
		message = "Uploaded file is too large";
	}

	const payload = {
		success: false,
		message,
	};

	if (details) {
		payload.details = details;
	}

	if (!isProduction) {
		payload.stack = err.stack;
	}

	return res.status(statusCode).json(payload);
};

module.exports = errorHandler;
