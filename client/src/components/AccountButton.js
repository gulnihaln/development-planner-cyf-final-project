import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Menu, MenuItem } from "@mui/material";

export default function AccountButton({ setAuth }) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleLogout = async (e) => {
		e.preventDefault();
		try {
			localStorage.removeItem("accessToken");
			localStorage.removeItem("refreshToken");
			setAuth(false);
		} catch (err) {
			console.error(err.message);
		}
	};
	return (
		<Box>
			<Button
				id="basic-button"
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
				variant="text"
				size="large"
				sx={{
					color: "#000",
					fontWeight: 700,
					lineHeight: 1,
					fontSize: "1em",
					borderTop: 10,
					borderColor: "transparent",
					"&:hover": {
						color: "#ea4549",
						borderColor: "#ea4549",
					},
				}}
			>
				Account
			</Button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				<MenuItem
					sx={{
						"&:hover": {
							color: "#ea4549",
							borderTop: 10,
						},
					}}
					onClick={handleClose}
				>
					Account Setting
				</MenuItem>
				<MenuItem
					sx={{
						"&:hover": {
							color: "#ea4549",
							borderTop: 10,
						},
					}}
					onClick={(e) => handleLogout(e)}
				>
					Logout
				</MenuItem>
			</Menu>
		</Box>
	);
}
