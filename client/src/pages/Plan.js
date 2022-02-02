import Button from "@mui/material/Button";
import DropdownMenuFeedback from "../utils/DropdownMenuFeedback";
import Goals from "../components/Goals";
import FeedbackDrawer from "../components/FeedbackDrawer";
import PlanTitle from "../utils/PlanTitle";
import { request } from "../utils/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import "../styles/Plan.css";

export default function Plan() {
	const { plan_id } = useParams();
	const [goals, setGoals] = useState([]);
	const [plan, setPlan] = useState(null);

	useEffect(() => {
		request.get(`/plans/${plan_id}`).then((res) => {
			setPlan(res.data);
		});
	}, [plan_id]);
	if(plan === null ){
		return <h1>Loading</h1>;
	}
	return (
		<>
			<section className="plan-container">
				<div className="plan-intro-container">
					<div className="title-progress-container">
							<PlanTitle
								title={plan.title}
								setTitle={(newTitle) =>
									setPlan((prev) => {
										return {
											...prev,
											title: newTitle,
										};
									})
								}
							/>
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
							<FeedbackDrawer />
						</div>
					</div>
				</div>
			</section>
			<section className="goals-container">
				<Goals goals={goals} setGoals={setGoals} plan_id={plan_id} />
			</section>
		</>
	);
}