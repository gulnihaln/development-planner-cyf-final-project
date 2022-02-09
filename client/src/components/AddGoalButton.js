import React from "react";
import Button from "@mui/material/Button";

export default function AddGoalButton ({ HandleNewGoal }) {
	return (
		<div>
			<Button
				// className="new-goal-button"
				onClick={HandleNewGoal}
				variant="outlined"
				sx={{
					color: "#fff",
					backgroundColor: "#CF2F2F",
					borderRadius: "4px",
					marginTop: 3,
					width: 300,
					marginLeft: 4,
					alignSelf: "center",
					// maxWidth: "300px",
					"&:hover": {
						backgroundColor: "#a62626",
					},
				}}
			>
				Add New Goal
			</Button>
		</div>
	);
}
