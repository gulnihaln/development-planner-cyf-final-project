import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { apiForgotPassword } from "../utils/api";

const theme = createTheme();

export default function forgetPassword() {
	const [email, setEmail] = useState();
	const [isSuccessfull, setIsSuccessfull] = useState(null);

	const forgotPassword = async (email) => {
		apiForgotPassword({ email }).then((res) => {
			const message = res.data.message;
			setIsSuccessfull(message);
			// alert(` Please ${res.data.message}`);
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await forgotPassword(email);
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
					<Typography component="h1" variant="h5">
						Forgot Your Password
					</Typography>
					<Typography sx={{ m: 3 }} component="h4" variant="h7">
						<Box sx={{ color: "success.main" }}>{isSuccessfull}</Box>
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={100}>
								<TextField
									onChange={(e) => setEmail(e.target.value)}
									required
									fullWidth
									type="text"
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
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
								backgroundColor: "rgb(237,67,67)",
								"&:hover": {
									color: "rgb(237,67,67)",
									backgroundColor: "#EFEFEF",
								},
							}}
						>
							Send Link
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
