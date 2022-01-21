import GoalCard from "./GoalCard";
import { useState } from "react";
import AddGoalButton from "./AddGoalButton";


export default function Goals ({ fakeGoals }) {
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
		<div className="goals-container">
			{goals.map((goal, index) => {
				return <GoalCard key={index} fakeGoal={goal} />;
			})}
			<AddGoalButton newGoalHandle={newGoalHandle} />
		</div>
	);
}
