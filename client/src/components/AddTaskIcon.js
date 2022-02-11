import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import IconButton from "@mui/material/IconButton";

export default function AddTaskIcon({ newTaskHandle, value }) {
	return (
		<div>
				<IconButton
					disabled={!value}
					onClick={newTaskHandle}
					color="primary"
					sx={{ color: "green", p: "10px" }}
					aria-label="directions"
				>
					<AddRoundedIcon />
				</IconButton>
		</div>
	);
}
