import React, { useState } from "react";
import { Box, InputBase, Tooltip, Typography } from "@mui/material";


const EditableTask = ({ task, editTask }) => {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState(task.description);
	const [taskStatus, setTaskStatus] = useState();
  console.log(task.id);

  return (
		<div>
			{open ? (
				<Box>
					<InputBase
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						fullWidth
						onBlur={() => {
							editTask(task.id, description, taskStatus);
							setOpen(false);
						}}
						InputProps
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