import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import cyf_logo from "../uploads/cyf_logo.png";
import Link from "@mui/material/Link";



export default function Navbar({ children }) {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" style={{ backgroundColor: "#EFEFEF" }}>
				<Toolbar>
					<Link href="/login" underline="none">
						<Box
							component="img"
							sx={{
								height: 50,
							}}
							alt="Your logo."
							src={cyf_logo}
						/>
					</Link>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					></IconButton>
					<Box sx={{ flexGrow: 1 }}></Box>
					{children}
					<MenuIcon sx={{ display: "none" }} />
				</Toolbar>
			</AppBar>
		</Box>
	);
}
