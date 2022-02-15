import GoalCard from "./GoalCard";
import { useEffect } from "react";
import AddGoalButton from "./AddGoalButton";
import Container from "@mui/material/Container";
import { request } from "../utils/api";
import Masonry from "react-masonry-css";
import "../styles/Masonry.css";

export default function Goals({ goals, setGoals, plan_id, canSee }) {
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
		postGoal(body).then((response) =>
			setGoals((prev) => prev.concat(response.data))
		);
	}

	const breakpoints = {
		default: 3,
		1100: 2,
		700: 1,
	};
	return (
		<Container sx={{ mt: 2 }} >
			<AddGoalButton HandleNewGoal={HandleNewGoal} canSee={canSee} />
			<Masonry
				breakpointCols={breakpoints}
				className="my-masonry-grid"
				columnClassName="my-masonry-grid_column"
			>
				{goals
					.sort((a, b) => (a.goal_id > b.goal_id ? 1 : -1))
					.map((goal) => {
						return (
							<GoalCard
								key={goal.goal_id}
								goal={goal}
								goals={goals}
								setGoals={setGoals}
								plan_id={plan_id}
								goal_id={goal.goal_id}
								sx={{ mt: 1 }}
								canSee={canSee}
							/>
						);
					})}
			</Masonry>
		</Container>
	);
}
