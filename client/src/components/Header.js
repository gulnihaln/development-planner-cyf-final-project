import Navbar from "./Navbar";
import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import AccountButton from "./AccountButton";
import { useHistory } from "react-router-dom";

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
	}  else if (location.pathname.includes("/reset_password")) {
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
	}  else if (location.pathname.includes("/aboutus")) {
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
					Dashboard
				</Button>
				<AccountButton setAuth={setAuth} />
			</Navbar>
		);
	}
}
export default Header;
