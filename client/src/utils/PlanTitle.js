import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/material/styles";
import "../styles/Plan.css";

const CssTextField = styled(TextField, {
	shouldForwardProp: (props) => props !== "focusColor",
})((p) => ({
	"& .MuiInput-underline:after": {
		borderBottom: "1px solid",
		borderBottomColor: "red",
	},
}));

export default function PlanTitle({
	plan_id,
	description,
	title,
	setTitle,
	setDescription,
	editPlan,
}) {
	const [open, setOpen] = useState(false);

	return (
		<div>
			{open ? (
				<Box sx={{ letterSpacing: "1.5px" }}>
					<CssTextField
						// label="Edit plan title"
						// className="plan-title"
						variant="standard"
						focusColor="rgba(0, 0, 0, 0.6)"
						value={title}
						onChange={(event) => setTitle(event.target.value)}
						fullWidth
						onBlur={() => {
							editPlan(plan_id, title, description);
							setOpen(!open);
						}}
						// InputProps={{ disableUnderline: true, style: { fontSize: 30 } }}
						// InputLabelProps={{ style: { color: "rgba(0, 0, 0, 0.6)" } }}
					/>
				</Box>
			) : (
				<Box sx={{ m: 0, display: "flex" }}>
					<Typography
						variant="h5"
						onClick={() => setOpen(!open)}
						sx={{
							flexGrow: 1,
							paddingLeft: 0,
							marginTop: 2,
							cursor: "pointer",
						}}
					>
						{title}
					</Typography>
					<MoreVertIcon />
				</Box>
			)}
			{open ? (
				<Box sx={{ fontStyle: "italic" }}>
					<TextField
						// label="Edit plan description"
						hiddenLabel
						variant="standard"
						sx={{ borderColor: "transparent" }}
						// focusColor="rgba(0, 0, 0, 0.6)"
						value={description}
						onChange={(event) => setDescription(event.target.value)}
						fullWidth
						onBlur={() => {
							editPlan(plan_id, title, description);
							setOpen(!open);
						}}
						// InputProps={{ disableUnderline: true }}
					/>
				</Box>
			) : (
				<Box>
					<Typography
						variant="h6"
						onClick={() => setOpen(true)}
						sx={{
							flexGrow: 1,
							paddingLeft: 2,
							marginTop: 1,
							cursor: "pointer",
						}}
					>
						{description}
					</Typography>
					<MoreVertIcon />
				</Box>
			)}
		</div>
	);
}
