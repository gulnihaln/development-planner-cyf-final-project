import GoalCard from "./GoalCard";
import { useEffect } from "react";
import AddGoalButton from "./AddGoalButton";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { request } from "../utils/api";

export default function Goals({ goals, setGoals, plan_id }) {
	console.log({goals});
	useEffect(() => {
		request.get(`/plans/${plan_id}/goals`).then((res) => {
			setGoals(res.data);
		});
	}, [plan_id, setGoals]);
	const postGoal = async (body) => {
		const response = await request.post(`/plans/${plan_id}/goals`, body, {
			headers: { "Content-Type": "application/json" },
		});
		return response;
	};
	function HandleNewGoal() {
			const body = {
				title: "Goal title",
				status: "incomplete",
				start_date: "2022-02-02",
				end_date: "2022-02-02",
			};
			postGoal(body).then((response) =>  setGoals((prev)=>prev.concat(response.data)));
		}
	return (
		<Container>
			<Grid container spacing={3} sx={{ marginTop: 1 }}>
				{goals.map((goal) => {
					return (
						<Grid key={goal.goal_id} item lg={4} md={6} xs={12}>
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