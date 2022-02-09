import GoalCard from "./GoalCard";
import { useEffect } from "react";
import AddGoalButton from "./AddGoalButton";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { request } from "../utils/api";

export default function Goals({ goals, setGoals, plan_id }) {
	const defaultDate = new Date();
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
				title: "Add your goal here...",
				status: "incomplete",
				start_date: defaultDate,
				end_date: defaultDate,
			};
			postGoal(body).then((response) =>  setGoals((prev)=>prev.concat(response.data)));
		}
	return (
		<Container>
				<AddGoalButton HandleNewGoal={HandleNewGoal} />
			<Grid container spacing={3} sx={{ marginTop: 1 }}>
				{goals
					.sort((a, b) => (a.goal_id > b.goal_id ? 1 : -1))
					.map((goal) => {
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
			</Grid>
		</Container>
	);
}