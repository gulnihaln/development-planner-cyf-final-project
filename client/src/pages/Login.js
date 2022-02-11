import LoginForm from "../components/LoginForm";
import "../styles/Login.css";
import Card from "@mui/material/Card";
import development from "../uploads/development.png";
import Box from "@mui/material/Box";

export default function Login({ setAuth }) {
	return (
		<>
			<Card className="home-container" sx={{ boxShadow: 0 }}>
				<Box sx={{ mt: 8, display: "flex" }}>
				<Box
				className="dev-planner"
					component="img"
					sx={{
						maxHeight: { xs: 273, md: 550 },
						maxWidth: { xs: 350, md: 700 },
					}}
					alt="CYF Development Planner"
					src={development}
				/>
				</Box>
				<LoginForm setAuth={setAuth} />
			</Card>
		</>
	);
}
