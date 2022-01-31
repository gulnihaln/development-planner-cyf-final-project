import React from "react";
import DropdownMenuTask from "../utils/DropdownMenuTask";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Checkbox } from "@mui/material";
import { editTask } from "../utils/api";
const completed = { inputProps: { "aria-label": "Completed Checkbox" } };


function SingleTask({ planId, taskId, goalId, taskTitle }) {
    const [checked, setChecked] = React.useState(false);
const handleChange = (id, event) => {
    setChecked(event.target.checked);
    const status = checked ? "completed" : "uncompleted";
    editTask(planId, goalId, id, status).then((res) => {
        console.log(res);
    }).catch((e) => console.log(e));
};
	return (
		<Card
			sx={{
				width: "90%",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<div style={{ display: "flex" }}>
				<Checkbox
					{...completed}
					checked={checked}
					onChange={(e) => {
						handleChange(taskId, e);
					}}
				/>
				<CardHeader
					action={
						<Box
							sx={{
								padding: 0,
							}}
						></Box>
					}
					subheader={taskTitle}
				/>
			</div>
			<DropdownMenuTask />
		</Card>
	);
}

export default SingleTask;
