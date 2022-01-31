import axios from "axios";
export const request = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });

export const verifyUser = () => {
	const body = {};
	return request
		.post("/verify", body, {
			headers: { token: localStorage.getItem("accessToken") },
		})
		.then(({ data }) => {
			return data;
		});
};

export const apiLoginUser = ({ email, password }) => {
	const body = { email, password };
	return request.post("/users/login", body).then((response) => {
		localStorage.setItem("accessToken", response.data.accessToken);
		localStorage.setItem("refreshToken", response.data.refreshToken);
		console.log(response.data.accessToken);
		console.log(response.data.refreshToken);
	});
};

request.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			config.headers["token"] = token; // for Node.js Express back-end
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

request.interceptors.response.use(
	(res) => {
		return res;
	},
	async (err) => {
		const originalConfig = err.config;

		if (originalConfig.url !== "/users/login" && err.response) {
			// Access Token was expired
			if (err.response.status === 401 && !originalConfig._retry) {
				originalConfig._retry = true;

				try {
					const rs = await request.post("/refresh", {
						refreshToken: localStorage.getItem("refreshToken"),
					});

					const { accessToken } = rs.data;
					localStorage.setItem("accessToken", accessToken);

					return request(originalConfig);
				} catch (_error) {
					return Promise.reject(_error);
				}
			}
		}

		return Promise.reject(err);
	}
);

export const apiSignUpUser = ({
	first_name,
	last_name,
	region,
	role,
	email,
	password,
}) => {
	const body = { first_name, last_name, region, role, email, password };
	return request.post("/register", body).then((response) => {
		localStorage.setItem("accessToken", response.data.accessToken);
		localStorage.setItem("refreshToken", response.data.refreshToken);
		console.log(response.data.accessToken);
		console.log(response.data.refreshToken);
	});
};

export const editTask = ({ planId, goalId, taskId, status }) => {
	const body = { status };
	return request.put(`/plans/${planId}/goals/${goalId}/tasks/${taskId}`, body).then(({ data }) => {
		return data;
	});
};

request.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers["token"] = token; // for Node.js Express back-end
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);




// export const getSomething = (auth, id) => {
// 	return request
// 		.get(`something/id`, {
// 			headers: { Authorization: auth },
// 		})
// 		.then(({ data }) => {
// 			return data;
// 		});
// };
