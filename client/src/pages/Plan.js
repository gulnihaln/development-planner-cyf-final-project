import Button from "@mui/material/Button";
import "../styles/Plan.css";
import DropdownMenuFeedback from "../utils/DropdownMenuFeedback";
import PlanTitle from "../utils/PlanTitle";
import Goals from "../components/Goals";

const fakeGoals = [
	{
		id: 1,
		// plan_id: ,
		title: "New goal",
		tasks: [
			{
				id: 102,
				goal_id: 1,
				title: "New Task2",
				status: "in progress",
			},
		],
	},
	{
		id: 2,
		// plan_id: ,
		title: "New goal2",
		tasks: [
			{
				id: 103,
				goal_id: 1,
				title: "New Task3",
				status: "in progress",
			},
		],
	},
];

export default function Plan() {
	return (
		<>
			<section className="plan-container">
				<div className="plan-intro-container">
					<div className="title-progress-container">
						<PlanTitle />
						<article className="progress-bar"></article>
					</div>
					<div className="feedback-buttons">
						<DropdownMenuFeedback />
						<div className="invite-feedback">
							<Button
								variant="outlined"
								sx={{
									color: "primary.main",
									bgColor: "#FFFFFF",
									borderRadius: 10,
								}}
							>
								Invite Reviewer
							</Button>
							<Button
								variant="outlined"
								sx={{
									color: "primary.main",
									bgColor: "#FFFFFF",
									borderRadius: 10,
								}}
							>
								See Feedbacks
							</Button>
						</div>
					</div>
				</div>
			</section>
			<section className="goals-container">
				<Goals fakeGoals={fakeGoals} />
			</section>
		</>
	);
}