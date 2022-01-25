import { Route, Switch } from "react-router-dom";
import React, { useState } from "react";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import NewPlan from "./pages/NewPlan";
import Plan from "./pages/Plan";

const App = () => {
	const [authorised, setAuthorised] = useState(false);
	console.log(authorised);
	return (
		<div>
			<Header />
			<hr />
			<Switch>
				<Route path="/login" exact>
					<Login setAuthorised={setAuthorised} />
				</Route>
				<Route path="/dashboard" exact>
					<Dashboard />
				</Route>
				<Route path="/newplan">
					<NewPlan />
				</Route>
				<Route path="/plan" exact>
					<Plan />
				</Route>
			</Switch>
			<Footer />
		</div>
	);
};

export default App;
