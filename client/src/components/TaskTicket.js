import * as React from "react";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import { request } from "../utils/api";
import IconButton from "@mui/material/IconButton";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { Tooltip } from "@mui/material";
import EditableTask from "../utils/EditableTask";

export default function TaskTicket ( { tasks, plan_id, goal, setTasks }) {
	// const [description, setDescription] = useState();
	// const [taskStatus, setTaskStatus] = useState();
	const handleDeleteTask = async (task_id) => {
		console.log({ task_id });
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
			const index = prev.findIndex((task)=> task.id === task_id);
			const newTasks = [...prev];
			newTasks[index] = response.data;
			return newTasks;
		});
	};
	return (
		<>
			<Box>
				{tasks.map((task) => {
					return (
						<Card key={task.id} sx={{ width: "90%", marginTop: 2, padding: 0 }}>
							<CardHeader
								action={
									<Box
										sx={{
											display: "flex",
											flexDirection: "column",
											padding: 0,
											width: "100%",
											margin: 0,
										}}
									>
									
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
									</Box>
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