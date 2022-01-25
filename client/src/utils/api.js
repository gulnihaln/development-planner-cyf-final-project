import axios from "axios";
const request = axios.create({ baseURL: "http://localhost:3100/api" });

export const verifyUser = (auth) => {
	const body = { token: auth };
	return request.post("/verify", body).then(({ data }) => {
		console.log(data);
	});
};

export const apiLoginUser = ({ email, password }) => {
	console.log(email, password);
	const body = { email, password };
	return request.post("/users/login", body).then((response) => {
		localStorage.setItem("token", response.data.accessToken);
		console.log(response.data.accessToken);
	});
};

export const apiSignUpUser = ({
	first_name,
	last_name,
	region,
	role,
	email,
	password,
}) => {
	console.log(first_name, last_name, region, role, email, password);
	const body = { first_name, last_name, region, role, email, password };
	return request.post("/users/login", body).then(({ data }) => {
		console.log(data);
	});
};

export const getSomething = (auth, id) => {
	return request
		.get(`something/id`, {
			headers: { Authorization: auth },
		})
		.then(({ data }) => {
			return data;
		});
};
