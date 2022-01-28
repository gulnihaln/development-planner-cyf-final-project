import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TextField from "@mui/material/TextField";
import { request } from "../utils/api";

function NewPlan() {
	const [title, setTitle] = useState("");
	const history = useHistory();
	const [description, setDescription] = useState("");
	const [titleError, setTitleError] = useState(false);
	const [descriptionError, setDescriptionError] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		setTitleError(false); //set the default value false to doesn't show error after fields completed
		setDescriptionError(false);

		//to show field error if fields doesn't completed
		if (title === "") {
			setTitleError(true);
		}
		if (description === "") {
			setDescriptionError(true);
		}
		if (title && description) {
			try {
				const body = { title, description };
				const response = await request
					.post("/plans", body, {
						headers: { "Content-Type": "application/json" },
					})
					.then(() => history.push("/dashboard"));
          return response;
			} catch (err) {
				setTitleError(false);
				setDescriptionError(false);
			}
		}
	};

	return (
		<Container sx={{ mt: 2 }}>
			<Typography variant="h6" component="h2" gutterBottom>
				Create a new plan
			</Typography>

			<form noValidate autoComplete="off" onSubmit={handleSubmit}>
				<TextField
					onChange={(e) => setTitle(e.target.value)}
					margin="normal"
					sx={{ display: "block" }}
					label="Plan title"
					variant="outlined"
					// color="inherit"
					fullWidth
					required
					value={title}
					error={titleError}
				/>
				<TextField
					onChange={(e) => setDescription(e.target.value)}
					margin="normal"
					sx={{ display: "block" }}
					label="Description"
					variant="outlined"
					// color="inherit"
					multiline
					rows={4}
					fullWidth
					required
					value={description}
					error={descriptionError}
				/>
				<Button
					color="inherit"
					type="submit"
					variant="contained"
					endIcon={<KeyboardArrowRightIcon />}
				>
					Create
				</Button>
			</form>
		</Container>
	);
}

export default NewPlan;
