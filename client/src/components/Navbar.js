import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";



export default function Navbar({ children }) {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" style={{ backgroundColor: "#EFEFEF" }}>
				<Toolbar>
					<Box
						component="img"
						sx={{
							height: 50,
						}}
						alt="Your logo."
						src="https://codeyourfuture.io/wp-content/uploads/2019/03/cyf_brand.png"
					/>
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
