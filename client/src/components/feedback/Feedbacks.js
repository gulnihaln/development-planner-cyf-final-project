import React, { useEffect, useState } from "react";
import {
	getFeedbacks,
	createFeedback,
	deleteFeedback as deleteFeedbackApi,
    updateFeedback as updateFeedbackApi,
} from "./temporaryApi";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Feedback from "./Feedback";
import FeedbackForm from "./FeedbackForm";

const Feedbacks = ({ currentUserId }) => {
	const [backendFeedbacks, setBackendFeedbacks] = useState([]); //store all the feedbacks that get from backend
    const [activeFeedback, setActiveFeedback] = useState(null); // this means we are in replying state or editing state
	const rootFeedbacks = backendFeedbacks.filter(
		(backendFeedback) => backendFeedback.parentId === null
	); // store root feedbacks and filter replies

	// the function below is for getting replies for specific feedback
	const getReplies = (feedbackId) => {
		return backendFeedbacks
			.filter((backendFeedback) => backendFeedback.parentId === feedbackId)
			.sort(
				//sort our feedbacks ascended
				(a, b) =>
					new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() //sort replies
			);
	};

	const addFeedback = (text, parentId) => {
		// console.log("addFeedback", text, parentId);
		createFeedback(text, parentId).then((feedback) => {
			setBackendFeedbacks([feedback, ...backendFeedbacks]); //modify array of feedbacks inside state
            setActiveFeedback(null);
		});
	};

	const deleteFeedback = (feedbackId) => {
		if (window.confirm("Are you sure you want to remove this feedback?")) {
			deleteFeedbackApi(feedbackId).then(() => {
				const updatedBackendFeedbacks = backendFeedbacks.filter(
					(backendFeedback) => backendFeedback.feedbackId !== feedbackId
				);
				setBackendFeedbacks(updatedBackendFeedbacks);
			});
		}
	};

    const updateFeedback = (text, id) => {
        updateFeedbackApi(text, id).then(() => {
            const updatedBackendFeedbacks = backendFeedbacks.map((backendFeedback) => {
                if (backendFeedback.feedbackId === id) {
                    return { ...backendFeedback, description: text };
                }
                return backendFeedback;
            });
            setBackendFeedbacks(updatedBackendFeedbacks);
            setActiveFeedback(null);
        });
    };

	useEffect(() => {
		getFeedbacks().then((data) => {
			setBackendFeedbacks(data);
		});
	}, []);

	return (
		<Box sx={{ mt: 2 }}>
			<Typography variant="h5" fontWeight="bold" sx={{ mb: 2, ml: 2 }}>
				Feedbacks
			</Typography>
			<Box sx={{ fontSize: 24, ml: 2 }} />
			<FeedbackForm submitLabel="Send Feedback" handleSubmit={addFeedback} />
			<Box sx={{ mt: 5 }}>
				{rootFeedbacks.map((rootFeedback) => (
					<Feedback
						key={rootFeedback.feedbackId}
						feedback={rootFeedback}
						replies={getReplies(rootFeedback.feedbackId)}
						currentUserId={currentUserId}
						deleteFeedback={deleteFeedback}
                        updateFeedback={updateFeedback}
                        activeFeedback={activeFeedback}
                        setActiveFeedback={setActiveFeedback} //change the state of our parent
                        addFeedback={addFeedback}
					/>
				))}
			</Box>
		</Box>
	);
};

export default Feedbacks;
