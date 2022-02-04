import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import Paper from "@mui/material/Paper";
import TaskTicket from "./TasksTicket";
import AddTaskIcon from "./AddTaskIcon";
import Box from "@mui/material/Box";
import DropdownMenuGoal from "../utils/DropdownMenuGoal";
import EditableInput from "../utils/EditableInput";
import DatePickerDesktop from "./DatePickerDesktop";
import "../styles/Goal.css";
import { request } from "../utils/api";
import { Tooltip } from "@mui/material";

export default function GoalCard({ goal, goals, setGoals, plan_id, goal_id }) {
	const [title, setTitle] = useState(goal.title || "Goal title");
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [tasks, setTasks] = useState([]);
	// const [description, setDescription] = useState();
	// const [taskStatus, setTaskStatus] = useState();
	const [value, setValue] = useState("");
	const [isGoalCompleted, setGoalCompleted] = useState(false);

	useEffect(() => {
		request.get(`/plans/${plan_id}/goals/${goal_id}/tasks`).then((res) => {
			setTasks(res.data);
		});
	}, [goal_id, plan_id]);

	const postGoal = async () => {
		const body = { title, status, start_date: startDate, end_date: endDate };
		const response = await request.post(`/plans/${plan_id}/goals`, body, {
			headers: { "Content-Type": "application/json" },
		});
		console.log(response);
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
	React.useEffect(() => {
		if (goal.tasks.every((task) => task.status === "completed")) {
			setGoalCompleted(true);
		}
	}, [goal.tasks, setGoalCompleted]);

	console.log("goal completed", isGoalCompleted);
	const handleDeleteGoal = async (id) => {
		request.delete(`/plans/${plan_id}/goals/${goal_id}`);
		const newGoals = goals.filter((goal) => goal.goal_id !== id);
		setGoals(newGoals);
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
				backgroundColor: "#f5f5f5",
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
				<Box>
					<EditableInput title={title} setTitle={setTitle} />
				</Box>
				<DropdownMenuGoal />
			</Box>
			<Box>
				<DatePickerDesktop
					startDate={startDate}
					endDate={endDate}
					setStartDate={setStartDate}
					setEndDate={setEndDate}
				/>
			</Box>
			<CardContent>
				<TaskTicket tasks={tasks} plan_id={plan_id} goal={goal} goal_id={goal_id} setTasks={setTasks} />
			</CardContent>
			<Paper
				component="form"
				sx={{
					p: "2px 4px",
					display: "flex",
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
				<AddTaskIcon newTaskHandle={newTaskHandle} />
			</Paper>
			<CardActions
				sx={{ display: "flex", justifyContent: "flex-end" }}
				disableSpacing
			>
				<Tooltip title="Save">
					<IconButton onClick={postGoal}>
						<BookmarkBorderOutlinedIcon />
					</IconButton>
				</Tooltip>
				<Tooltip title="Delete Goal">
					<IconButton
						aria-label="share"
						onClick={() => handleDeleteGoal(goal_id)}
					>
						<DeleteOutlinedIcon />
					</IconButton>
				</Tooltip>
			</CardActions>
		</Card>
	);
}
