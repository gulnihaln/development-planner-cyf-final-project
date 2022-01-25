import { Route, Switch } from "react-router-dom";
import React from "react";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import NewPlan from "./pages/NewPlan";
import Plan from "./pages/Plan";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      "Raleway ",
      "Arial",
    ].join(","),
  },
});


const App = () => (
	<ThemeProvider theme={theme}>
	<div>
		<Header />
		<hr />
		<Switch>
			<Route path="/login" exact>
				<Login />
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
	</ThemeProvider>
);

export default App;
