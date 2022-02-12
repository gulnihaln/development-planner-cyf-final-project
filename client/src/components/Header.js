import Navbar from "./Navbar";
import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import AccountButton from "./AccountButton";
import { useHistory } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

const useStyles = makeStyles({
	btn: {
		"&:hover": {
			color: "#ea4549",
			borderColor: "#ea4549",
			backgroundColor: "transparent",
		},
	},
});

function Header({ setAuth }) {
	let history = useHistory();
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
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

	const location = useLocation();
	if (location.pathname.includes("/login")) {
		return (
			<Navbar>
				<Button
					onClick={() => {
						history.push("/signup");
					}}
					className={classes.btn}
					variant="text"
					size="large"
					sx={{
						letterSpacing: "1px",
						fontWeight: 700,
						color: "#000",
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
					}}
				>
					Sign up
				</Button>
			</Navbar>
		);
	} else if (location.pathname.includes("/forgot_password")) {
		return (
			<Navbar>
				<Button
					onClick={() => {
						history.push("/login");
					}}
					className={classes.btn}
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
					}}
				>
					Sign in
				</Button>
			</Navbar>
		);
	} else if (location.pathname.includes("/reset_password")) {
		return (
			<Navbar>
				<Button
					onClick={() => {
						history.push("/login");
					}}
					className={classes.btn}
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
					}}
				>
					Sign in
				</Button>
			</Navbar>
		);
	} else if (location.pathname.includes("/aboutus")) {
		return (
			<Navbar>
				<Button
					onClick={() => {
						history.push("/login");
					}}
					className={classes.btn}
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
					}}
				>
					Sign in
				</Button>
			</Navbar>
		);
	} else if (location.pathname.includes("/signup")) {
		return (
			<Navbar>
				<Button
					onClick={() => {
						history.push("/login");
					}}
					className={classes.btn}
					variant="text"
					size="large"
					sx={{
						letterSpacing: "1px",
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
					}}
				>
					Sign in
				</Button>
			</Navbar>
		);
	} else {
		return (
			<Navbar>
				<Button
					onClick={() => {
						history.push("/dashboard");
					}}
					className={classes.btn}
					variant="text"
					size="large"
					sx={{
						letterSpacing: "1px",
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
					Dashboard
				</Button>
				<AccountButton setAuth={setAuth} />
				<div>
					<IconButton
						id="fade-button"
						aria-controls={open ? "fade-menu" : undefined}
						aria-haspopup="true"
						aria-expanded={open ? "true" : undefined}
						onClick={handleClick}
						sx={{ display: { xs: "block", md: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Menu
						id="fade-menu"
						MenuListProps={{
							"aria-labelledby": "fade-button",
						}}
						anchorEl={anchorEl}
						open={open}
						onClick={handleClose}
						onClose={handleClose}
						TransitionComponent={Fade}
					>
						<MenuItem
							onClick={() => {
								history.push("/dashboard");
							}}
							sx={{
								padding: 1,
								borderTop: 10,
								borderColor: "transparent",

								"&:hover": {
									color: "#ea4549",
									borderColor: "#ea4549",
								},
							}}
						>
							Dashboard
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
							onClick={() => {
								history.push("/dashboard/account");
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
				</div>
			</Navbar>
		);
	}
}
export default Header;
