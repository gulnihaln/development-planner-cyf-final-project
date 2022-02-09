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
import { request } from "../utils/api";
import { useParams } from "react-router";

const theme = createTheme();

export default function resetPassword() {
	const { token } = useParams();
	const [password, setPassword] = useState();
    const [isSuccessfull, setIsSuccessfull] = useState(null);

	const resetPasword = async () => {
		const body = { password };
		const response = await request.patch(`/reset-password/${token}`, body, {
			headers: { "Content-Type": "application/json" },
		}).then((res) => {
			const message = res.data.message;
			setIsSuccessfull(message);
		// return response;
        });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		await resetPasword(password);
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
						Reset Your Password
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
									onChange={(e) => setPassword(e.target.value)}
									required
									fullWidth
									type="text"
									id="password"
									label="New Password"
									name="password"
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
							Reset Password
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
