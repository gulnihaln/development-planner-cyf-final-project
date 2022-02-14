import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Feedback from "./Feedback";
import FeedbackForm from "./FeedbackForm";
import { request } from "../../utils/api";

const Feedbacks = ({ currentUserId, plan_id }) => {
	const [backendFeedbacks, setBackendFeedbacks] = useState([]);
	const [activeFeedback, setActiveFeedback] = useState(null); // this means we are in replying state or editing state
	const rootFeedbacks = backendFeedbacks.filter(
		(backendFeedback) => backendFeedback.parent_id === null
	); // store root feedbacks and filter replies

	// the function below is for getting replies for specific feedback
	const getReplies = (feedback_id) => {
		return backendFeedbacks
			.filter((backendFeedback) => backendFeedback.parent_id === feedback_id)
			.sort(
				//sort our feedbacks ascended
				(a, b) =>
					new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() //sort replies
			);
	};


	const addFeedback = async (text, parent_id) => {
		const response = await request.post(
			`/plans/${plan_id}/feedbacks`,
			JSON.stringify({ description: text, parent_id }),
			{
				headers: { "Content-Type": "application/json" },
			}
			);
			setActiveFeedback(null);
		if (response.status === 200) {
			loadFeedbacks();
		}
		return response;
	};

	const deleteFeedback = async (feedback_id) => {
		if (window.confirm("Are you sure you want to remove this feedback?")) {
			const response = await request.delete(
				`/plans/${plan_id}/feedbacks/${feedback_id}`
			);
			if (response.status === 200) {
				loadFeedbacks();
			}
			return response;
		}
	};

	const updateFeedback = async (text, feedback_id) => {
		const response = await request.put(
			`/plans/${plan_id}/feedbacks/${feedback_id}`,
			JSON.stringify({ description: text }),
			{
				headers: { "Content-Type": "application/json" },
			}
		);
		if (response.status === 200) {
			loadFeedbacks();
		}
		return response;
	};

	const loadFeedbacks = () => {
		request.get(`/plans/${plan_id}/feedbacks`).then((res) => {
			setBackendFeedbacks(res.data);
		});
	};

	useEffect(loadFeedbacks, [plan_id]);

	return (
		<Box sx={{ mt: 2 }}>
			<Typography variant="h5" fontWeight="bold" sx={{ mb: 2, ml: 2 }}>
				Feedbacks
			</Typography>
			<Box sx={{ fontSize: 24, ml: 2 }} />
			<FeedbackForm submitLabel="Send Feedback" handleSubmit={addFeedback} />
			<Typography sx={{ mt: 5 }}>
				{rootFeedbacks.map((rootFeedback) => (
					<Feedback
						key={rootFeedback.feedback_id}
						feedback={rootFeedback}
						replies={getReplies(rootFeedback.feedback_id)}
						currentUserId={currentUserId}
						deleteFeedback={deleteFeedback}
						updateFeedback={updateFeedback}
						activeFeedback={activeFeedback}
						setActiveFeedback={setActiveFeedback} //change the state of our parent
						addFeedback={addFeedback}
					/>
				))}
			</Typography>
		</Box>
	);
};

export default Feedbacks;
