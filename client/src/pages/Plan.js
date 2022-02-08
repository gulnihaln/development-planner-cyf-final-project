// import Button from "@mui/material/Button";
import DropdownMenuFeedback from "../utils/DropdownMenuFeedback";
import Goals from "../components/Goals";
import FeedbackDrawer from "../components/feedback/FeedbackDrawer";
import PlanTitle from "../utils/PlanTitle";
import { request } from "../utils/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import "../styles/Plan.css";
import { IconButton, Tooltip } from "@mui/material";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { CopyToClipboard } from "react-copy-to-clipboard";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";

export default function Plan() {
	const { plan_id } = useParams();
	const [goals, setGoals] = useState([]);
	const [plan, setPlan] = useState(null);
	const url = window.location.href;

	useEffect(() => {
		request.get(`/plans/${plan_id}`).then((res) => {
			setPlan(res.data);
		});
	}, [plan_id]);
	if(plan === null ){
		return <>
		<IconButton sx={{ marginLeft: 2 }}>
			<HourglassEmptyOutlinedIcon />
			Loading
		</IconButton>
		</>;
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

	return (
		<>
			<section className="plan-container">
				<div className="plan-intro-container">
					<div className="title-progress-container" style={{ width: "50%" }}>
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
					<div className="feedback-buttons">
						<DropdownMenuFeedback />
						<div className="invite-feedback">
							<CopyToClipboard text={url}>
							<Tooltip title="Share Link">
								<IconButton>
									<ShareOutlinedIcon sx={{ color: "#CF2F2F" }} />
								</IconButton>
							</Tooltip>
							</CopyToClipboard>
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