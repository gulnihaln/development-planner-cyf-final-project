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

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#CF2F2F",
		},
		// secondary: "#ff4081",
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
							path="/newplan"
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
							path="/plan/:plan_id"
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
					</Switch>
					{!isAuthenticated ? <Footer /> : <></>}
				</div>
			)}
		</ThemeProvider>
	);
};

export default App;
