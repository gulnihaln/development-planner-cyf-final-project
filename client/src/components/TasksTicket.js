import * as React from "react";
import Box from "@mui/material/Box";
import SingleTask from "./SingleTask";
export default function TaskTicket({ tasks, goalId, planId }) {
	const [goalTasks, setTasks] = React.useState(tasks);


	return (
		<Box>
			{tasks.map((task) => {
				return <SingleTask taskTitle={task.title} key={task.id} taskId={task.id} planId={planId} goalId={goalId} />;
			})}
		</Box>
	);
}
