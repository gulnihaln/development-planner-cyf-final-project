


const theme = createTheme();

export default function SignUpForm() {
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		// eslint-disable-next-line no-console
		console.log({
			email: data.get("email"),
			password: data.get("password"),
		});
	};
	const [region, setRegion] = React.useState("");

	const handleChange = (event) => {
		setRegion(event.target.value);
	};
	const [role, setRole] = React.useState("");

	const handleChangeRole = (event) => {
		setRole(event.target.value);
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
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
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
									autoComplete="given-name"
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="First Name"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="family-name"
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControl fullWidth>
									<InputLabel id="regionSelectId">Region</InputLabel>
									<Select
										labelId="regionSelectId"
										id="regionSelect"
										label="Region"
										value={region}
										displayEmpty
										onChange={handleChange}
										required
									>
										<MenuItem value={1}>West Midlands</MenuItem>
										<MenuItem value={2}>Scotland</MenuItem>
										<MenuItem value={3}>London</MenuItem>
										<MenuItem value={4}>North West</MenuItem>
										<MenuItem value={5}>Rome</MenuItem>
										<MenuItem value={6}>Cape Town</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<FormControl fullWidth>
									<InputLabel id="roleSelectId">Role</InputLabel>
									<Select
										labelId="roleSelectId"
										id="roleSelect"
										label="Role"
										value={role}
										displayEmpty
										onChange={handleChangeRole}
										required
									>
										<MenuItem value={1}>Graduate</MenuItem>
										<MenuItem value={2}>Mentor</MenuItem>
									</Select>
								</FormControl>
							</Grid>

							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="passwordconfirmation"
									label="Password Confirmation"
									type="password"
									id="password"
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="#" variant="body2">
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
