import * as React from "react";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import { request } from "../utils/api";
import IconButton from "@mui/material/IconButton";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { Tooltip, Checkbox } from "@mui/material";
import EditableTask from "../utils/EditableTask";

const completed = { inputProps: {
	"aria-label": "Completed Checkbox",
	},
};

export default function TaskTicket ({ tasks, plan_id, goal, goal_id, setTasks }) {
	// const [description, setDescription] = useState();
	// const [taskStatus, setTaskStatus] = useState();
	const [checked, setChecked] = React.useState(false);

	const handleDeleteTask = async (task_id) => {
		request.delete(`/plans/${plan_id}/goals/${goal.goal_id}/tasks/${task_id}`);
		const newTasks = tasks.filter((task) => task.id !== task_id);
		setTasks(newTasks);
	};
	const editTask = async (task_id, description, taskStatus) => {
		const body = { description, status: taskStatus };
		const response = await request.put(
			`/plans/${plan_id}/goals/${goal.goal_id}/tasks/${task_id}`,
			body,
			{
				headers: { "Content-Type": "application/json" },
			}
		);

		setTasks((prev) => {
			const index = prev.findIndex((task) => task.id === task_id);
			const newTasks = [...prev];
			newTasks[index] = response.data;
			return newTasks;
		});
	};

	const handleChangeTaskStatus = (task_id, event) => {
		setChecked(event.target.checked);
		const status = checked ? "completed" : "uncompleted";
		editTask(plan_id, goal_id, task_id, status)
			.then((res) => {
				console.log(res);
			})
			.catch((e) => console.log(e));
	};


	return (
		<>
			<Box>
				{tasks.map((task) => {
					return (
						<Card
							key={task.id}
							sx={{ width: "100%", marginTop: 2, padding: 0 }}
						>
							<Checkbox
								{...completed}
								checked={checked}
								onChange={(e) => {
									handleChangeTaskStatus(task.task_id, e);
								}}
							/>
							<CardHeader
								action={
									<Tooltip title="Remove task">
										<IconButton
											onClick={() => handleDeleteTask(task.id)}
											sx={{
												color: "rgba(0, 0, 0, 0.54)",
											}}
										>
											<ClearOutlinedIcon sx={{ fontSize: "medium" }} />
										</IconButton>
									</Tooltip>
								}
								subheader={<EditableTask task={task} editTask={editTask} />}
							/>
						</Card>
					);
				})}
			</Box>
		</>
	);
}
