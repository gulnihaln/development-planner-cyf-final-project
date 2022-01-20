import React from "react";
import Button from "@mui/material/Button";

export default function AddGoalButton ({ newGoalHandle }) {
	return (
		<div>
			<Button
				className="new-goal-button"
				onClick={newGoalHandle}
				variant="outlined"
				sx={{
					color: "primary.main",
					bgColor: "#FFFFFF",
					borderRadius: 10,
				}}
			>
				Add New Goal
			</Button>
		</div>
	);
}
