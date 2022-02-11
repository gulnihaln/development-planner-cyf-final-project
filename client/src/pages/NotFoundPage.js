import React from "react";
import { Link } from "react-router-dom";
import PageNotFound from "../uploads/error-404.png";
import "../styles/Error.css";

export default function NotFoundPage() {
	return (
		<div >
			<img className="error" src={PageNotFound} />
			<p style={{ textAlign: "center" }}>
				<Link to="/">Go to Home </Link>
			</p>
		</div>
	);
}
