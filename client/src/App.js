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
import FeedbackDrawer from "./components/FeedbackDrawer";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
	typography: {
		fontFamily: ["Raleway ", "Arial"].join(","),
	},
});

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		async function fetchMyAPI() {
			let response = await verifyUser();
			setIsAuthenticated(response);
		}

		fetchMyAPI();
	}, []);

	const setAuth = (boolean) => {
		setIsAuthenticated(boolean);
	};
	// console.log(setAuth);

	return (
		<ThemeProvider theme={theme}>
			<div>
				<Header setAuth={setAuth} />
				<Switch>
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
					{/* <Route
						exact
						path="/signup"
						render={(props) =>
							!isAuthenticated ? (
								<Signup {...props} setAuth={setAuth} />
							) : (
								<Redirect to="/dashboard" />
							)
						}
					/> */}
					{/* <Route path="/dashboard" exact>
						<Dashboard />
					</Route> */}
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
					{/* <Route path="/dashboard">
						<Dashboard />
					</Route> */}
					<Route path="/newplan">
						<NewPlan />
					</Route>
					<Route path="/plan" exact>
						<Plan />
					</Route>
					<Route path="/mentorDashboard" exact>
						<FeedbackDrawer />
					</Route>
				</Switch>
				<Footer />
			</div>
		</ThemeProvider>
	);
};

export default App;
