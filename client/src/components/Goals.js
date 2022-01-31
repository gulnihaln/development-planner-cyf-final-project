import GoalCard from "./GoalCard";
import { useState } from "react";
import AddGoalButton from "./AddGoalButton";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

export default function Goals ({ fakeGoals, planId }) {
	const [goals, setGoals] = useState(fakeGoals);
	function newGoalHandle (){
		setGoals((prev) => {
			return goals.concat({
				id: 1111,
				// plan_id: ,
				title: "new goal",
				tasks: [],
			});
		});
	}
	console.log(goals);
	return (
		<Container>
			<Grid container spacing={3} sx={{ marginTop: 1 }}>
					{goals.map((goal, index) => {
						return (
							<Grid
								key={index}
								item
								lg={5}
								md={6}
								xs={12}
							>
								<GoalCard planId={planId} fakeGoal={goal} />
							</Grid>
						);
					})}
				<AddGoalButton newGoalHandle={newGoalHandle} />
			</Grid>
		</Container>
	);
}