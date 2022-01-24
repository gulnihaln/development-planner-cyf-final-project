import React from "react";
import Button from "@mui/material/Button";

export default function AddGoalButton ({ newGoalHandle }) {
	return (
		<div>
			<Button
				// className="new-goal-button"
				onClick={newGoalHandle}
				variant="outlined"
				sx={{
					color: "primary.main",
					bgColor: "#FFFFFF",
					borderRadius: 5,
					marginTop: 3,
					width: 350,
					marginLeft: 4,
					alignSelf: "center",
				}}
			>
				Add New Goal
			</Button>
		</div>
	);
}
