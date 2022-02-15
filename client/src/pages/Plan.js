import DropdownMenuFeedback from "../utils/DropdownMenuFeedback";
import Goals from "../components/Goals";
import FeedbackDrawer from "../components/feedback/FeedbackDrawer";
import PlanTitle from "../utils/PlanTitle";
import { request } from "../utils/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import "../styles/Plan.css";
import { Box, IconButton, Typography } from "@mui/material";
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
			console.log(res.data);
		});
	}, [plan_id]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	if (plan === null) {
		return (
			<>
				<IconButton sx={{ marginLeft: 2 }}>
					<HourglassEmptyOutlinedIcon />
					Loading
				</IconButton>
			</>
		);
	}
	const currentUserId = localStorage.getItem("user_id");
	const canSee = currentUserId !== plan.user_id;

	const editPlan = async (plan_id, title, description) => {
		const body = { title, description };
		await request.put(`/plans/${plan_id}`, body, {
			headers: { "Content-Type": "application/json" },
		});
	};

	return (
		<>
			<section className="plan-container">
				<div className="plan-intro-container">
					<div className="title-progress-container">
						<PlanTitle
							plan_id={plan_id}
							editPlan={editPlan}
							description={plan.description}
							title={plan.title}
							setTitle={(newTitle) =>
								setPlan((prev) => {
									return {
										...prev,
										title: newTitle,
									};
								})
							}
							setDescription={(newDescription) =>
								setPlan((prev) => {
									return {
										...prev,
										description: newDescription,
									};
								})
							}
						/>
					</div>
					<Box className="feedback-buttons">
						<DropdownMenuFeedback plan_id={plan_id} user_id={plan.user_id} />
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-end",
								mr: 2,
							}}
						>
							{canSee && (
								<Typography sx={{ m: "auto", maxWidth: 480 }}>
									{`You are seeing ${plan.first_name} ${plan.last_name}'s plan`}
								</Typography>
							)}
							<Box className="invite-feedback">
								<FeedbackDrawer
									currentUserId={currentUserId}
									plan_id={plan_id}
								/>
								<ShareButton />
							</Box>
						</Box>
					</Box>
				</div>
			</section>
			<section className="goals-container">
				<Goals goals={goals} setGoals={setGoals} plan_id={plan_id} canSee={canSee} />
			</section>
		</>
	);
}
