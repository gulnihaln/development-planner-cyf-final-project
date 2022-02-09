import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// import cyf_logo from "../uploads/cyf_logo.png";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router";
import { request } from "../utils/api";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import Avatar from "@mui/material/Avatar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const theme = createTheme();

export default function Account() {
	const { user_id } = useParams();
	const [first_name, setFirst_name] = useState();
	const [last_name, setLast_name] = useState();
	const [role, setRole] = useState({ role });
	const [region, setRegion] = useState({ region });
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	useEffect(() => {
		request.get("/user").then((res) => {
			setFirst_name(res.data[0].first_name);
			setLast_name(res.data[0].last_name);
			setRegion(res.data[0].region);
			setRole(res.data[0].role);
			setEmail(res.data[0].email);
		});
	}, [user_id]);

	const [disabledField, setDisabledField] = useState(true);
	const [disabledEdit, setDisabledEdit] = useState(false);
	const [disabledSave, setDisabledSave] = useState(true);

	const enableEdit = () => {
		setDisabledField(false);
		setDisabledSave(false);
		setDisabledEdit(true);
	};

	const saveEdit = () => {
		setDisabledField(true);
		setDisabledSave(true);
		setDisabledEdit(false);
		editAccountSettings();
	};

	const editAccountSettings = async () => {
		const body = { first_name, last_name, region, role, email, password };
		const response = await request.put("/user", body, {
			headers: { "Content-Type": "application/json" },
		});
		console.log(response);
	};

	// const [password, setPassword] = useState();
	// const signUpUser = async (password) => {
	// 	apiSignUpUser({
	// 		password,
	// 	}).then((res) => {
	// 		setAuth(true);
	// 	});
	// };

	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	await signUpUser(password);
	// };

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
						<AccountCircleIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Account
					</Typography>
					<Box component="form" noValidate sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									onChange={(e) => setFirst_name(e.target.value)}
									autoComplete="given-name"
									name="firstName"
									required
									fullWidth
									type="text"
									id="firstName"
									value={first_name}
									disabled={disabledField}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									onChange={(e) => setLast_name(e.target.value)}
									required
									fullWidth
									type="text"
									id="lastName"
									value={last_name}
									name="lastName"
									autoComplete="family-name"
									disabled={disabledField}
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
										disabled={disabledField}
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
										disabled={disabledField}
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
									value={email}
									name="email"
									autoComplete="email"
									disabled={disabledField}
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
									disabled={disabledField}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									onChange={(e) => setPassword(e.target.value)}
									required
									fullWidth
									name="password"
									label="New Password"
									type="password"
									id="password"
									autoComplete="new-password"
									disabled={disabledField}
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
							onClick={enableEdit}
							disabled={disabledEdit}
							startIcon={<EditIcon />}
						>
							Edit
						</Button>
						<Button
							fullWidth
							sx={{
								mb: 2,
								backgroundColor: "rgb(237,67,67)",
								"&:hover": {
									color: "rgb(237,67,67)",
									backgroundColor: "#EFEFEF",
								},
							}}
							onClick={saveEdit}
							variant="contained"
							color="primary"
							disabled={disabledSave}
							startIcon={<SaveIcon />}
						>
							Save
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
