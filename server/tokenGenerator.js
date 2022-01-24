const jwt = require("jsonwebtoken");
require("dotenv").config();


const tokenGenerator = (id) => {
	const payload = {
		user: id,
	};
	const accessToken = jwt.sign(payload, process.env.accessSecretKey, {
		expiresIn: "5m",
	});
	const refreshToken = jwt.sign(payload, process.env.refreshSecretKey, {
		expiresIn: "30d",
	});

	return { accessToken, refreshToken };
};

module.exports = tokenGenerator;
