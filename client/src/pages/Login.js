import LoginForm from "../components/LoginForm";
import "../styles/Login.css";

export default function Login({ setAuth }) {
	return (
		<>
			<section className="home-container">
				<article className="intro-wrapper">
					<h2 className="home-heading">Development Planner</h2>
					<p className="intro-p">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
						quis id consectetur, tempore iusto iure atque cumque ullam excepturi
						dolores explicabo.
					</p>
					<img
						className="intro-img"
						src="https://via.placeholder.com/350x400.png"
						alt="intro-img"
					></img>
				</article>
				<LoginForm setAuth={setAuth} />
			</section>
		</>
	);
}
