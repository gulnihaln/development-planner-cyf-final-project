import "../styles/Footer.css";

export default function Footer() {
	return (
		<footer className="footer">
			<section className="footer-links-container">
				<ul className="footer-links">
					<li>
						<i className="fas fa-home"></i>
					</li>
					<li>
						<a href="##">FAQ</a>
					</li>
					<li>
						<a href="##">Terms & Conditions</a>
					</li>
				</ul>
			</section>
			<p className="footer-p">&copy; Copyright CodeYourFuture. All rights reserved.</p>
		</footer>
	);
}
