import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "@mui/material/Link";

export default function Footer() {
	const [value, setValue] = React.useState(0);
	const ref = React.useRef(null);

	return (
		<Box sx={{ pb: 7, marginTop: 30 }} ref={ref}>
			<Paper
				sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
				elevation={3}
			>
				<BottomNavigation
					showLabels
					value={value}
					onChange={(event, newValue) => {
						setValue(newValue);
					}}
				>
					<BottomNavigationAction
						// style={{ color: "rgb(237,67,67)", textDecoration: "none" }}
						// label="About us"
						label={
							<Link
								style={{ color: "rgba(0, 0, 0, 0.87)", textDecoration: "none" }}
								href="/aboutus"
							>
								About us
							</Link>
						}
					/>
					<BottomNavigationAction
						label={
							<Link
								href="https://github.com/gulnihaln/development-planner-cyf-final-project"
								target="blank_"
							>
								<GitHubIcon style={{ color: "#000000" }} />
							</Link>
						}
					></BottomNavigationAction>
					<BottomNavigationAction
						style={{ color: "rgba(0, 0, 0, 0.87)" }}
						label="Contact"
						key="Email"
						component="a"
						href="mailto:gh.naldoken@email.com"
						// label={
						// 	<Link
						// 		style={{ color: "rgb(237,67,67)", textDecoration: "none" }}
						// 		href="/aboutus"
						// 		target="blank_"
						// 	>
						// 		Contact
						// 	</Link>
						// }
					/>
				</BottomNavigation>
				<Typography
					variant="subtitle2"
					gutterBottom
					component="div"
					sx={{ textAlign: "center", fontSize: "small" }}
				>
					&copy; Copyright{" "}
					<Link
						sx={{ textDecoration: "none", color: "#000" }}
						href="https://codeyourfuture.io/"
						target="_blank"
					>
						CodeYourFuture.
					</Link>{" "}
					All rights reserved.
				</Typography>
			</Paper>
		</Box>
	);
}