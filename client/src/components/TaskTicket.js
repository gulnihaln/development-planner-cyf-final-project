import * as React from "react";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import { request } from "../utils/api";
import IconButton from "@mui/material/IconButton";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { Tooltip } from "@mui/material";
import EditableTask from "../utils/EditableTask";
import TaskStatus from "./TaskStatus";

export default function TaskTicket({ tasks, plan_id, goal, setTasks, setTasksAndUpdateGoal }) {
	const handleDeleteTask = async (task_id) => {
		request.delete(`/plans/${plan_id}/goals/${goal.goal_id}/tasks/${task_id}`);
		const newTasks = tasks.filter((task) => task.id !== task_id);
		setTasks(newTasks);
	};
	const editTask = async (task_id, description, status) => {
		const body = { description, status };
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
			setTasksAndUpdateGoal(newTasks);
			return newTasks;
		});
		return response;
	};

	return (
		<>
			<Box>
				{tasks
					.sort((a, b) => (a.id > b.id ? 1 : -1))
					.map((task) => {
						return (
							<Card
								key={task.id}
								sx={{
									display: "flex",
									justifyContent: "space-between",
									width: "100%",
									marginTop: 2,
									padding: 0,
								}}
							>
								<Box sx={{ display: "flex" }}>
									<TaskStatus task={task} editTask={editTask} />
									<CardHeader
										sx={{ padding: 0 }}
										subheader={<EditableTask task={task} editTask={editTask} />}
									/>
								</Box>
								<Tooltip title="Remove task">
									<IconButton
										onClick={() => handleDeleteTask(task.id)}
										sx={{
											alignSelf: "flex-start",
											color: "rgba(0, 0, 0, 0.54)",
										}}
									>
										<ClearOutlinedIcon sx={{ fontSize: "medium" }} />
									</IconButton>
								</Tooltip>
							</Card>
						);
					})}
			</Box>
		</>
	);
}
