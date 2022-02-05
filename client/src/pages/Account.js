import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import cyf_logo from "../uploads/cyf_logo.png";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
// import axios from "axios";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router";
import { request } from "../utils/api";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";

export default function Account() {
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

	const { user_id } = useParams();
	const [user, setUser] = useState();
	const [first_name, setFirst_name] = useState();
	const [last_name, setLast_name] = useState();
	const [region, setRegion] = useState();
	const [role, setRole] = useState();
	const [email, setEmail] = useState();

	useEffect(() => {
		request.get("/user").then((res) => {
			// setUser(res.data);
			setFirst_name(res.data[0].first_name);
			setLast_name(res.data[0].last_name);
			setRegion(res.data[0].region);
			setRole(res.data[0].role);
			setEmail(res.data[0].email);
		});
	}, [user_id]);

	return (
		<React.Fragment>
			<CssBaseline />
			<Container>
				<Card
					sx={{
						minWidth: 275,
						bgcolor: "#F5F5F5",

						marginTop: 20,
					}}
				>
					<CardContent>
						<Typography sx={{ fontSize: 24 }} style={{ fontWeight: 900 }}>
							Account Setting
						</Typography>
						<Grid container>
							<Grid item xs={6}>
								<Box
									sx={{
										m: 5,
										display: "flex",
										flexDirection: "column",
										padding: 0,
									}}
								>
									<Grid item xs={12} sm={6}>
										<TextField
											sx={{ mb: 1 }}
											id="firstName"
											variant="outlined"
											disabled={disabledField}
											value={first_name}
											onChange={(event) => {
												setFirst_name(event.target.value);
											}}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											sx={{ mb: 1 }}
											id="lastName"
											variant="outlined"
											disabled={disabledField}
											value={last_name}
											onChange={(event) => {
												setLast_name(event.target.value);
											}}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											sx={{ mb: 1 }}
											id="region"
											variant="outlined"
											disabled={disabledField}
											value={region}
											onChange={(event) => {
												setRegion(event.target.value);
											}}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											sx={{ mb: 1 }}
											id="role"
											variant="outlined"
											disabled={disabledField}
											value={role}
											onChange={(event) => {
												SecurityPolicyViolationEvent(event.target.value);
											}}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											sx={{ mb: 1 }}
											id="email"
											variant="outlined"
											disabled={disabledField}
											value={email}
											onChange={(event) => {
												setEmail(event.target.value);
											}}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Button
											fullWidth
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
											variant="contained"
											color="primary"
											disabled={disabledEdit}
											startIcon={<EditIcon />}
										>
											Edit
										</Button>
										<Button
											fullWidth
											sx={{
												mt: 3,
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
									</Grid>
								</Box>
							</Grid>
							<Box>
								{/* <Typography sx={{ fontSize: 24 }}>Total Plan?</Typography> */}
								<Grid item xs={12} spacing={2} sx={{ mt: 10 }}>
									<Grid item xs={12}>
										<TextField
											onChange={(e) => setPassword(e.target.value)}
											required
											fullWidth
											name="password"
											label="Password"
											type="password"
											id="password"
											autoComplete="password"
											sx={{
												mb: 2,
											}}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											onChange={(e) => setPassword(e.target.value)}
											required
											fullWidth
											name="newPassword"
											label="New Password"
											type="password"
											id="password"
											autoComplete="new-password"
										/>
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
											Update Password
										</Button>
									</Grid>
								</Grid>
							</Box>
						</Grid>
					</CardContent>
				</Card>
			</Container>
		</React.Fragment>
	);
}
