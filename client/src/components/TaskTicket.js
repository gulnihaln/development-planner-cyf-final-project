import * as React from "react";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import { request } from "../utils/api";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { Tooltip } from "@mui/material";

export default function TaskTicket ( { tasks, plan_id, goal, setTasks }) {
	const handleDeleteTask = async (task_id) => {
		console.log({ task_id });
		request.delete(`/plans/${plan_id}/goals/${goal.goal_id}/tasks/${task_id}`);
		const newTasks = tasks.filter((task) => task.id !== task_id);
		setTasks(newTasks);
	};

	return (
		<>
			<Box>
				{tasks.map((task) => {
					return (
						<Card key={task.id} sx={{ width: "90%" }}>
							<CardHeader
								action={
									<Box
										sx={{
											display: "flex",
											flexDirection: "column",
											padding: 0,
											width: "100%",
										}}
									>
										<Tooltip title="Edit">
											<IconButton
												sx={{
													display: "flex",
													flexDirection: "column",
													color: "rgba(0, 0, 0, 0.54)",
												}}
											>
												<ModeEditOutlineOutlinedIcon
													sx={{ fontSize: "medium" }}
												/>
											</IconButton>
										</Tooltip>
										<Tooltip title="Remove task">
											<IconButton
												onClick={() => handleDeleteTask(task.id)}
												sx={{
													display: "flex",
													flexDirection: "column",
													color: "rgba(0, 0, 0, 0.54)",
												}}
											>
												<ClearOutlinedIcon sx={{ fontSize: "medium" }} />
											</IconButton>
										</Tooltip>
									</Box>
								}
								subheader={task.description}
							/>
						</Card>
					);
				})}
			</Box>
		</>
	);
}