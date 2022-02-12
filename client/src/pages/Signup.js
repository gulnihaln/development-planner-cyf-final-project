import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { apiSignUpUser } from "../utils/api";

const theme = createTheme();

export default function SignUpForm({ setAuth }) {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [region, setRegion] = useState("North West");
	const [role, setRole] = useState("graduate");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstNameError, setFirstNameError] = useState(false);
	const [lastNameError, setLastNameError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);

	const signUpUser = async (
		first_name,
		last_name,
		region,
		role,
		email,
		password
	) => {
		apiSignUpUser({
			first_name,
			last_name,
			region,
			role,
			email,
			password,
		}).then((res) => {
			setAuth(true);
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setFirstNameError(false);
		setLastNameError(false);
		setEmailError(false);
		setPasswordError(false);

		if (firstName === "") {
			setFirstNameError(true);
		}
		if (lastName === "") {
			setLastNameError(true);
		}
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) {
			setEmailError(true);
		}
		if (password.length < 6) {
			setPasswordError(true);
		}
		setTimeout(
			async () =>
				await signUpUser(firstName, lastName, region, role, email, password),
			1000
		);
	};
	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar style={{ backgroundColor: "rgb(51, 156, 80, 100)" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									onChange={(e) => setFirstName(e.target.value)}
									autoComplete="given-name"
									name="firstName"
									required
									fullWidth
									type="text"
									id="firstName"
									label="First Name"
									error={firstNameError}
									helperText={firstNameError ? "First Name is required" : ""}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									onChange={(e) => setLastName(e.target.value)}
									required
									fullWidth
									type="text"
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="family-name"
									error={lastNameError}
									helperText={lastNameError ? "Last Name is required" : ""}
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControl fullWidth>
									<InputLabel id="regionSelectId">Region</InputLabel>
									<Select
										onChange={(e) => setRegion(e.target.value)}
										labelId="regionSelectId"
										id="regionSelect"
										label="Region"
										type="text"
										value={region}
										displayEmpty
										required
									>
										<MenuItem value={"West Midlands"}>West Midlands</MenuItem>
										<MenuItem value={"Scotland"}>Scotland</MenuItem>
										<MenuItem value={"London"}>London</MenuItem>
										<MenuItem value={"North West"}>North West</MenuItem>
										<MenuItem value={"Rome"}>Rome</MenuItem>
										<MenuItem value={"Cape Town"}>Cape Town</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<FormControl fullWidth>
									<InputLabel id="roleSelectId">Role</InputLabel>
									<Select
										onChange={(e) => setRole(e.target.value)}
										labelId="roleSelectId"
										id="roleSelect"
										label="Role"
										type="text"
										value={role}
										displayEmpty
										required
									>
										<MenuItem value={"graduate"}>Graduate</MenuItem>
										<MenuItem value={"mentor"}>Mentor</MenuItem>
									</Select>
								</FormControl>
							</Grid>

							<Grid item xs={12}>
								<TextField
									onChange={(e) => setEmail(e.target.value)}
									required
									fullWidth
									type="text"
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									error={emailError}
									helperText={
										emailError ? "Please enter a valid email address" : ""
									}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									onChange={(e) => setPassword(e.target.value)}
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
									error={passwordError}
									helperText={
										passwordError
											? "password is required to be more than 6 characters"
											: ""
									}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{
								mt: 3,
								mb: 2,
								backgroundColor: "#CF2F2F",
								"&:hover": {
									backgroundColor: "#a62626",
								},
							}}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="/login" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
