import React from "react";
import { Link } from "react-router-dom";
import PageNotFound from "../uploads/error-404.png";
import "../styles/Error.css";
import Box from "@mui/material/Box";

export default function NotFoundPage() {
	return (
		<>
			<div className="error">
				<Box
					component="img"
					sx={{
						maxHeight: { xs: 144, md: 324 },
						maxWidth: { xs: 200, md: 450 },
					}}
					alt="404 Page Not Found!"
					src={PageNotFound}
				/>
			</div>
			<p style={{ textAlign: "center" }}>
				<Link to="/">Go to Home </Link>
			</p>
		</>
	);
}
