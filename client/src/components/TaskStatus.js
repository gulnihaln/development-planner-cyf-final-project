import * as React from "react";
import { Checkbox } from "@mui/material";

export default function TaskStatus({ task, editTask }) {
	const completed = {
		inputProps: {
			"aria-label": "Completed Checkbox",
		},
	};
	const [checked, setChecked] = React.useState(
		task.status === "completed" ? true : false
	);
	const status = !checked ? "completed" : "uncompleted";
	const description = task.description;
	const task_id = task.id;
	const handleChangeTaskStatus = (task_id, description, status) => {
		editTask(task_id, description, status)
			.then((res) => {
				setChecked(res.data.status === "completed" ? true : false);
			})
			.catch((e) => console.log(e));
	};
	return (
		<Checkbox
			sx={{
				"&:hover": {
					backgroundColor: "transparent",
				},
			}}
			color="secondary"
			{...completed}
			checked={checked}
			onChange={() => {
				handleChangeTaskStatus(task_id, description, status);
			}}
		/>
	);
}
