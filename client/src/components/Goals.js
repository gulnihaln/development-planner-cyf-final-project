import GoalCard from "./GoalCard";
import { useEffect } from "react";
import AddGoalButton from "./AddGoalButton";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { request } from "../utils/api";

export default function Goals({ goals, setGoals, plan_id }) {
	useEffect(() => {
		request.get(`/plans/${plan_id}/goals`).then((res) => {
			setGoals(res.data);
		});
	}, [plan_id, setGoals]);

	function HandleNewGoal() {
		setGoals((prev) => {
			return goals.concat({
				title: "",
				status:"",
				startDate:"",
				endDate:"",
				tasks: [],
			});
		});
	}
	return (
		<Container>
			<Grid container spacing={3} sx={{ marginTop: 1 }}>
				{goals.map((goal, index) => {
					return (
						<Grid key={index} item lg={4} md={6} xs={12}>
							<GoalCard
								goal={goal}
								goals={goals}
								setGoals={setGoals}
								plan_id={plan_id}
								goal_id={goal.goal_id}
							/>
						</Grid>
					);
				})}
				<AddGoalButton HandleNewGoal={HandleNewGoal} />
			</Grid>
		</Container>
	);
}