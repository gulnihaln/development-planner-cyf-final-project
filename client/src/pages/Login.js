import LoginForm from "../components/LoginForm";
import "../styles/Login.css";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import development from "../uploads/development.jpg";
// import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

export default function Login({ setAuth }) {
	return (
		<>
			{/* <section className="home-container">
				<article className="intro-wrapper">
					<h2 className="home-heading">Development Planner</h2>
					<p className="intro-p">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
						quis id consectetur, tempore iusto iure atque cumque ullam excepturi
						dolores explicabo.
					</p>
					<img
						className="intro-img"
						src={development}
						alt="intro-img"
					></img>
				</article> */}
			<Card className="home-container" sx={{ boxShadow: 0 }}>
				<Box sx={{ display: "flex" }}>
					<CardMedia
						component="img"
						// height="200"
						image={development}
						alt="home-img"
					/>
					{/* <Divider className="home-divider" sx={{ height: 600, m: 0.5 }} orientation="vertical" /> */}
				</Box>
				<LoginForm setAuth={setAuth} />
			</Card>
			{/* </section> */}
		</>
	);
}
