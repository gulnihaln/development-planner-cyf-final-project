import LoginForm from "../components/LoginForm";
import "../styles/Login.css";
import Card from "@mui/material/Card";
import development from "../uploads/development.png";
import Box from "@mui/material/Box";

export default function Login({ setAuth }) {
	return (
		<>
			<Card className="home-container" sx={{ boxShadow: 0, maxWidth: 1200, mt: 3 }}>
				<Box
					className="dev-planner"
					component="img"
					alt="CYF Development Planner"
					src={development}
				/>
				<LoginForm setAuth={setAuth} />
			</Card>
		</>
	);
}
