import { Route, Switch } from "react-router-dom";
import Login from "./pages/Login";

const App = () => (
	<Switch>
		<Route path="/" exact>
			<Login />
		</Route>
	</Switch>
);

export default App;
