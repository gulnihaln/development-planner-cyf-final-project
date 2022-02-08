import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Menu, MenuItem } from "@mui/material";
import { useHistory } from "react-router-dom";

export default function AccountButton({ setAuth }) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	let history = useHistory();
	const handleLogout = (e) => {
		e.preventDefault();
		try {
			localStorage.removeItem("accessToken");
			localStorage.removeItem("refreshToken");
			setAuth(false);
		} catch (err) {
			setAuth(true);
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
					padding: 3,
					borderColor: "transparent",
					borderRadius: 0,
					"&:hover": {
						color: "#ea4549",
						borderColor: "#ea4549",
						backgroundColor: "transparent",
					},
					display: { xs: "none", md: "block" },
				}}
			>
				Account
			</Button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
				sx={{
					paddingTop: 0,
					paddingBottom: 0,
				}}
			>
				<MenuItem
					sx={{
						padding: 1,
						borderTop: 10,
						borderColor: "transparent",

						"&:hover": {
							color: "#ea4549",
							borderColor: "#ea4549",
						},
					}}
					onClick={() => {
						history.push("/account");
					}}
				>
					Account Setting
				</MenuItem>
				<MenuItem
					sx={{
						padding: 1,
						borderTop: 10,
						borderColor: "transparent",
						"&:hover": {
							color: "#ea4549",
							borderColor: "#ea4549",
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
