import React, { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField, {
	shouldForwardProp: (props) => props !== "focusColor",
})((p) => ({
	"& .MuiInput-underline:after": {
		borderBottom: "1px solid",
		borderBottomColor: p.focusColor,
	},
}));

export default function PlanTitle({
	plan_id,
	description,
	title,
	setTitle,
	setDescription, editPlan,
}) {
	const [open, setOpen] = useState(false);

	return (
		<div>
			{open ? (
				<Box sx={{ fontSize: "20px", letterSpacing: "2px" }}>
					<CssTextField
						// label="Edit plan title"
						hiddenLabel
						variant="standard"
						focusColor="rgba(0, 0, 0, 0.6)"
						value={title}
						onChange={(event) => setTitle(event.target.value)}
						fullWidth
						onBlur={() => {
							editPlan(plan_id, title, description);
							setOpen(false);
						}}
						InputProps={{ disableUnderline: true }}
						InputLabelProps={{ style: { color: "rgba(0, 0, 0, 0.6)" } }}
					/>
				</Box>
			) : (
				<Box>
					<Typography
						variant="h5"
						onclick={setOpen(true)}
						sx={{ cursor: "pointer" }}
					>
						{title}
					</Typography>
					<MoreVertIcon />
				</Box>
			)}
			{open ? (
				<Box sx={{ fontStyle: "italic" }}>
					<CssTextField
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
							setOpen(false);
						}}
						InputProps={{ disableUnderline: true }}
						InputLabelProps={{ style: { color: "rgba(0, 0, 0, 0.6)" } }}
					/>
				</Box>
			) : (
				<Box>
					<Typography
						onclick={setOpen(true)}
						sx={{
							flexGrow: 1,
							paddingLeft: 1,
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
