import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Paper from "@mui/material/Paper";
import TaskTicket from "./TaskTicket";
import AddTaskIcon from "./AddTaskIcon";
import Box from "@mui/material/Box";
import DropdownMenuGoal from "../utils/DropdownMenuGoal";
import EditableInput from "../utils/EditableInput";
import DatePickerMobile from "./DatePickerMobile";
import DatePickerDesktop from "./DatePickerDesktop";
import "../styles/Goal.css";

export default function GoalCard({ fakeGoal }) {
	const [goal, setGoal] = useState(fakeGoal);

	const [value, setValue] = useState("");

	console.log(value);

	function newTaskHandle() {
		if (!value) {
			alert("Please enter a task!");

			return false;
		} else {
			setGoal((prev) => {
				prev.tasks.push({
					id: prev.tasks.length,

					goal_id: goal.id,

					title: value,
				});

				return { ...prev };
			});
		}
	}

	return (
		<Card
			className="goal-card"
			key={goal.id}
			sx={{
				p: "2px 4px",

				display: "flex",

				flexDirection: "column",

				justifyContent: "center",

				backgroundColor: "#F9F9F9",
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
					<EditableInput title={goal.title} />
				</Box>

				<DropdownMenuGoal />
			</Box>

			<Box>
				<DatePickerDesktop />
				<DatePickerMobile />
			</Box>

			<CardContent>
				<TaskTicket tasks={goal.tasks} />
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
				<IconButton aria-label="share">
					<DeleteOutlinedIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
}
