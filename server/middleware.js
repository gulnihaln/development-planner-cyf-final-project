import helmet from "helmet";
import path from "path";
const jwt = require("jsonwebtoken");
require("dotenv").config();

export const auth = (req, res, next) => {
	const accessToken = req.header("token");
	if (!accessToken) {
		return res.status(401).json("token not available!");
	}
	try {
		const payload = jwt.verify(accessToken, process.env.accessSecretKey);
		req.user_id = payload.user;
		next();
	} catch (err) {
		console.error(err.message);
		return res.status(401).json(err.message);
	}
};

export const validInfo = (req, res, next) => {
	const { email, first_name, password } = req.body;
	const validEmail = (email) => {
		return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
	};

	if (req.path === "/register") {
		console.log(!email.length);
		if (![email, first_name, password].every(Boolean)) {
			return res.status(401).json("Missing Credentials");
		} else if (!validEmail(email)) {
			return res.status(401).json("Invalid Email");
		}
	} else if (req.path === "/users/login") {
		if (![email, password].every(Boolean)) {
			return res.status(401).json("Missing Credentials");
		} else if (!validEmail(email)) {
			return res.status(401).json("Invalid Email");
		}
	}
	next();
};

export const configuredHelmet = () =>
	helmet({
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["'self'"],
				objectSrc: ["'none'"],
				scriptSrc: ["'self'", "unpkg.com", "polyfill.io"],
				styleSrc: ["'self'", "https: 'unsafe-inline'"],
				upgradeInsecureRequests: [],
			},
		},
	});

export const httpsOnly = () => (req, res, next) => {
	if (!req.secure) {
		return res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
	}
	next();
};

export const logErrors = () => (err, _, res, next) => {
	if (res.headersSent) {
		return next(err);
	}
	console.error(err);
	res.sendStatus(500);
};

export const pushStateRouting = (apiRoot, staticDir) => (req, res, next) => {
	if (req.method === "GET" && !req.url.startsWith(apiRoot)) {
		return res.sendFile(path.join(staticDir, "index.html"));
	}
	next();
};
