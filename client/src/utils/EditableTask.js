import React, { useState } from "react";
import { Box, TextField, Tooltip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField, {
	shouldForwardProp: (props) => props !== "focusColor",
})((p) => ({
	"& .MuiOutlinedInput-root": {
		"&.Mui-focused fieldset": {
			border: "1px solid",
			borderColor: p.focusColor,
		},
	},
}));


const EditableTask = ({ task, editTask }) => {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState(task.description);
  const [taskStatus, setTaskStatus] = useState();


  return (
		<div>
			{open ? (
				<Box>
					<CssTextField
						size="small"
						focusColor="rgba(0, 0, 0, 0.6)"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						fullWidth
						onBlur={() => {
							editTask(task.id, description, taskStatus);
							setOpen(false);
						}}
					/>
				</Box>
			) : (
				<Box sx={{ m: 1, display: "flex" }}>
					<Tooltip title="Edit task">
						<Typography
							onClick={() => setOpen(true)}
							sx={{ flexGrow: 1, cursor: "pointer" }}
						>
							{task.description}
						</Typography>
					</Tooltip>
				</Box>
			)}
		</div>
	);
};

export default EditableTask;