import { Route, Switch } from "react-router-dom";
import React from "react";
import Login from "./pages/Login";
import Plan from "./pages/Plan";
import Header from "./components/Header";
import Footer from "./components/Footer";


const App = () => (
	<div>
		<Header />
		<hr />
		<Switch>
			<Route path="/login" exact>
				<Login />
			</Route>
			<Route path="/plan" exact>
				<Plan />
			</Route>
		</Switch>
		<Footer />
	</div>
);

export default App;
