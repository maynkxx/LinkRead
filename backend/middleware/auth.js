const jwt = require("jsonwebtoken");
const User = require("../models/User");

const extractToken = (req) => {
	const authHeader = req.headers.authorization || "";
	if (authHeader.startsWith("Bearer ")) {
		return authHeader.split(" ")[1];
	}
	return req.cookies?.token || req.headers["x-access-token"];
};

const authenticate = async (req, res, next) => {
	try {
		const token = extractToken(req);
		if (!token) {
			return res.status(401).json({ success: false, message: "Authentication required" });
		}

		const payload = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(payload.id).select("-password");

		if (!user) {
			return res.status(401).json({ success: false, message: "User no longer exists" });
		}

		req.user = user;
		next();
	} catch (error) {
		if (error.name === "TokenExpiredError") {
			return res.status(401).json({ success: false, message: "Session expired. Please sign in again." });
		}
		if (error.name === "JsonWebTokenError") {
			return res.status(401).json({ success: false, message: "Invalid token" });
		}
		next(error);
	}
};

const optionalAuth = async (req, _res, next) => {
	const token = extractToken(req);
	if (!token) {
		req.user = null;
		return next();
	}

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = await User.findById(payload.id).select("-password");
	} catch (error) {
		req.user = null;
	}
	return next();
};

const requireRoles = (...roles) => (req, res, next) => {
	if (!req.user) {
		return res.status(401).json({ success: false, message: "Authentication required" });
	}

	const userRoles = req.user.roles || [];
	const hasRole = roles.some((role) => userRoles.includes(role));

	if (!hasRole) {
		return res.status(403).json({ success: false, message: "You do not have permission to perform this action" });
	}

	return next();
};

const requireSelfOrRoles = (...roles) => (req, res, next) => {
	if (!req.user) {
		return res.status(401).json({ success: false, message: "Authentication required" });
	}

	if (req.params.userId && req.user._id.toString() === req.params.userId) {
		return next();
	}

	return requireRoles(...roles)(req, res, next);
};

module.exports = {
	authenticate,
	optionalAuth,
	requireRoles,
	requireSelfOrRoles,
};
