import { Route, Switch, Redirect } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import NewPlan from "./pages/NewPlan";
import Plan from "./pages/Plan";
import { verifyUser } from "./utils/api";
import Signup from "./pages/Signup";
import AboutUs from "./pages/AboutUs";
import Account from "./pages/Account";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFoundPage from "./pages/NotFoundPage.js";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#CF2F2F",
		},
		secondary: {
			main: "rgb(50, 154, 78)",
		},
	},
	typography: {
		fontFamily: ["Raleway ", "Arial"].join(","),
	},
});

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(null);

	useEffect(() => {
		async function fetchMyAPI() {
			try {
				let response = await verifyUser();
				setIsAuthenticated(response);
			} catch (err) {
				setIsAuthenticated(false);
			}
		}

		fetchMyAPI();
	}, []);

	const setAuth = (boolean) => {
		setIsAuthenticated(boolean);
	};

	return (
		<ThemeProvider theme={theme}>
			{isAuthenticated !== null && (
				<div>
					<Header setAuth={setAuth} />
					<Switch>
						<Route
							exact
							path="/"
							render={(props) =>
								!isAuthenticated ? (
									<Redirect to="/login" />
								) : (
									<Redirect to="/dashboard" />
								)
							}
						/>
						<Route
							exact
							path="/login"
							render={(props) =>
								!isAuthenticated ? (
									<Login {...props} setAuth={setAuth} />
								) : (
									<Redirect to="/dashboard" />
								)
							}
						/>
						<Route
							exact
							path="/signup"
							render={(props) =>
								!isAuthenticated ? (
									<Signup {...props} setAuth={setAuth} />
								) : (
									<Redirect to="/dashboard" />
								)
							}
						/>
						<Route
							exact
							path="/dashboard"
							render={(props) =>
								isAuthenticated ? (
									<Dashboard {...props} setAuth={setAuth} />
								) : (
									<Redirect to="/login" />
								)
							}
						/>
						<Route
							exact
							path="/dashboard/account"
							render={(props) =>
								isAuthenticated ? (
									<Account {...props} setAuth={setAuth} />
								) : (
									<Redirect to="/login" />
								)
							}
						/>
						<Route
							exact
							path="/dashboard/newPlan"
							render={(props) =>
								isAuthenticated ? (
									<NewPlan {...props} setAuth={setAuth} />
								) : (
									<Redirect to="/login" />
								)
							}
						/>
						<Route
							exact
							path="/plan"
							render={(props) =>
								isAuthenticated ? (
									<Plan {...props} setAuth={setAuth} />
								) : (
									<Redirect to="/login" />
								)
							}
						/>
						<Route
							exact
							path="/dashboard/plan/:plan_id"
							render={(props) =>
								isAuthenticated ? (
									<Plan {...props} setAuth={setAuth} />
								) : (
									<Redirect to="/login" />
								)
							}
						/>
						<Route path="/aboutus" exact>
							<AboutUs />
						</Route>
						<Route path="/forgot_password" exact>
							<ForgetPassword />
						</Route>
						<Route path="/reset_password/:token" exact>
							<ResetPassword />
						</Route>
						<Route
							exact
							path="*"
							render={(props) =>
								isAuthenticated ? (
									<NotFoundPage />
								) : (
									<Redirect to="/dashboard" {...props} setAuth={setAuth} />
								)
							}
						/>
					</Switch>
					{!isAuthenticated ? <Footer /> : <></>}
				</div>
			)}
		</ThemeProvider>
	);
};

export default App;
