import React, { useState } from "react";
import PropTypes from "prop-types";
// import useToken from "../utils/useToken"

async function loginUser(credentials) {
	return fetch("http://localhost:3100/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	}).then((data) => data.json());
}
export default function LoginForm() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const handleSubmit = async (e) => {
		e.preventDefault();
            await loginUser({
                email,
                password,
		});
		// setToken(token);
	};
	return (
		<article className="login-wrapper">
			<h1>Please Log In</h1>
			<form className="login-form" onSubmit={handleSubmit} >
                <p>Email address</p>
				<label htmlFor="email" className="form-label-text">
					<input
						type="email"
						className="form-input"
						id="email"
						placeholder="name@example.com"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
                <p> Password</p>
				<label htmlFor="password">
					<input
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<div>
					<button className="button-primary" type="submit">Log in</button>
				</div>
			</form>
		</article>
	);
}

