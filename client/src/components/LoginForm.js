import React, { useState } from "react";
import { apiLoginUser } from "../utils/api";

export default function LoginForm({ setAuth }) {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const loginUser = (email, password) => {
		apiLoginUser(email, password).then((res) => {
			// console.log(res);
			setAuth(true);
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await loginUser({
			email,
			password,
		});
	};
	return (
		<article className="login-wrapper">
			<h1>Please Log In</h1>
			<form className="login-form" onSubmit={handleSubmit}>
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
					<button className="button-primary" type="submit">
						Log in
					</button>
				</div>
			</form>
		</article>
	);
}
