import LoginForm from "../components/LoginForm";
import "../styles/Login.css";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import development from "../uploads/development.png";
import Box from "@mui/material/Box";

export default function Login({ setAuth }) {
	return (
		<>
			<Card className="home-container" sx={{ boxShadow: 0 }}>
				<Box sx={{ display: "flex" }}>
					<CardMedia
						className="dev-planner"
						component="img"
						height="50"
						image={development}
						alt="home-img"
					/>
				</Box>
				<LoginForm setAuth={setAuth} />
			</Card>
		</>
	);
}
