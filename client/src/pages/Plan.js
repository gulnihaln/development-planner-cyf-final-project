import DropdownMenuFeedback from "../utils/DropdownMenuFeedback";
import Goals from "../components/Goals";
import FeedbackDrawer from "../components/feedback/FeedbackDrawer";
import PlanTitle from "../utils/PlanTitle";
import { request } from "../utils/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Typography from "@mui/material/Typography";
import "../styles/Plan.css";
import { IconButton, Tooltip } from "@mui/material";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import ShareButton from "../components/ShareButton";
import { useCallback } from "react";

export default function Plan() {
	const { plan_id } = useParams();
	const [goals, setGoals] = useState([]);
	const [plan, setPlan] = useState(null);

	const fetchData = useCallback(() => {
		request.get(`/plans/${plan_id}`).then((res) => {
			setPlan(res.data);
		});
	}, [plan_id]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	if(plan === null ){
		return <h1>Loading</h1>;
	}

	const editPlan = async (plan_id, title, description) => {
		const body = { title, description };
			await request.put(`/plans/${plan_id}`,
			body,
			{
				headers: { "Content-Type": "application/json" },
			}
		);
	};

	return plan=== null ? <h1>Loading</h1> : (
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
						<Typography
							sx={{ paddingTop: 2, fontSize: "small", fontStyle: "italic" }}
						>
							{plan.description}
						</Typography>
					</div>
					<div className="feedback-buttons">
						<DropdownMenuFeedback />
						<div className="invite-feedback">
							<Tooltip title="Share Link">
								<IconButton>
									<ShareButton />
								</IconButton>
							</Tooltip>
							<FeedbackDrawer plan_id={plan_id} user_id={plan.user_id} />
						</div>
					</div>
				</div>
			</section>
			<section className="goals-container">
				<Goals
					goals={goals}
					setGoals={setGoals}
					plan_id={plan_id}
				/>
			</section>
		</>
	);
}
