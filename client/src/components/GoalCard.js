import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Paper from "@mui/material/Paper";
import TaskTicket from "./TaskTicket";
import AddTaskIcon from "./AddTaskIcon";
import Box from "@mui/material/Box";
import EditableInput from "../utils/EditableInput";
import DatePickerDesktop from "./DatePickerDesktop";
import DatePickerMobile from"./DatePickerMobile";
import { request } from "../utils/api";
import { Tooltip } from "@mui/material";

export default function GoalCard({ goal, goals, setGoals, plan_id, goal_id, canSee }) {
	const [title, setTitle] = useState(goal.title || "Goal title");
	const [startDate, setStartDate] = useState(goal.start_date);
	const [endDate, setEndDate] = useState(goal.end_date);
	const [tasks, setTasks] = useState([]);
	const [value, setValue] = useState("");

	useEffect(() => {
		request.get(`/plans/${plan_id}/goals/${goal_id}/tasks`).then((res) => {
			setTasks(res.data);
		});
	}, [goal_id, plan_id]);

	const updateGoal = (tasks) => {
		const allTasksCompleted = tasks.every(
			(task) => task.status === "completed"
		);
		const status = allTasksCompleted ? "completed" : "uncompleted";
		const body = { title, status, start_date: startDate, end_date: endDate };
		request.put(`/plans/${plan_id}/goals/${goal_id}`, body, {
			headers: { "Content-Type": "application/json" },
		});
	};
	const postTask = async () => {
		const description = value;
		const status = "incomplete";
		const body = { description, status };
		const response = await request.post(
			`/plans/${plan_id}/goals/${goal_id}/tasks`,
			body,
			{
				headers: { "Content-Type": "application/json" },
			}
		);
		return response;
	};

	function newTaskHandle() {
		if (!value) {
			alert("Please enter a task!");
			return false;
		} else {
			postTask().then((response) => {
				response.status === 200 && setValue("");
				setTasks((prev) => prev.concat(response.data));
			});
		}
	}

	const handleDeleteGoal = async (id) => {
		request.delete(`/plans/${plan_id}/goals/${goal_id}`);
		const newGoals = goals.filter((goal) => goal.goal_id !== id);
		setGoals(newGoals);
	};

	const editGoal = async () => {
		const body = { title, status, start_date: startDate, end_date: endDate };
		await request.put(`/plans/${plan_id}/goals/${goal_id}`, body, {
			headers: { "Content-Type": "application/json" },
		});
	};

	return (
		<Card
			className="goal-card"
			key={goal.id}
			sx={{
				p: "2px 4px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				backgroundColor: "#EFEFEF",
			}}
		>
			<Box
				sx={{
					p: "2px 4px",
					display: "flex",
					justifyContent: "space-between",
					width: "100%",
				}}
			>
				<Box sx={{ cursor: "pointer" }}>
					<EditableInput
						goal_id={goal_id}
						title={title}
						setTitle={setTitle}
						editGoal={editGoal}
					/>
				</Box>
			</Box>
			<Box sx={{ margin: 1, borderRadius: "4px" }}>
				<Box sx={{ marginTop: 2 }}>
					<Box display={{ xs: "none", sm: "none", md: "block" }}>
						<DatePickerDesktop
							goal_id={goal_id}
							startDate={startDate}
							endDate={endDate}
							setStartDate={setStartDate}
							setEndDate={setEndDate}
						/>
					</Box>
					<Box display={{ xs: "block", sm: "block", md: "none" }}>
						<DatePickerMobile
							goal_id={goal_id}
							startDate={startDate}
							endDate={endDate}
							setStartDate={setStartDate}
							setEndDate={setEndDate}
						/>
					</Box>
				</Box>
				<CardContent sx={{ overflowY: "scroll", maxHeight: 330, padding: 1 }}>
					<TaskTicket
						tasks={tasks}
						plan_id={plan_id}
						goal={goal}
						goal_id={goal_id}
						setTasks={setTasks}
						updateGoal={updateGoal}
					/>
				</CardContent>
				<Paper
					component="form"
					sx={{
						p: "2px 4px",
						display: `${canSee ? "flex" : "none"}`,
					}}
				>
					<InputBase
						sx={{ ml: 1, flex: 1 }}
						placeholder="Add new task"
						inputProps={{ "aria-label": "new task" }}
						value={value}
						onChange={(event) => setValue(event.target.value)}
					/>

					<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
					<AddTaskIcon newTaskHandle={newTaskHandle} value={value} />
				</Paper>
			</Box>
			<CardActions
				sx={{ display: "flex", justifyContent: "space-between" }}
				disableSpacing
			>
				<Button
					sx={{
						display: `${canSee ? "flex" : "none"}`,
						color: "rgba(0, 0, 0, 0.54)",
						border: "1px solid rgba(0, 0, 0, 0.54)",
						"&:hover": {
							backgroundColor: "transparent",
							color: "rgb(50, 154, 78)",
							border: "1px solid rgb(50, 154, 78)",
						},
					}}
					onClick={editGoal}
					variant="outlined"
				>
					Save
				</Button>
				<Tooltip title="Delete Goal">
					<IconButton
						sx={{ display: `${canSee ? "flex" : "none"}` }}
						aria-label="delete"
						onClick={() => handleDeleteGoal(goal_id)}
					>
						<DeleteOutlinedIcon />
					</IconButton>
				</Tooltip>
			</CardActions>
		</Card>
	);
}
