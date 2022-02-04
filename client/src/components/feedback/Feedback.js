import React from "react";
import { Box, Paper } from "@mui/material";
import FeedbackForm from "./FeedbackForm";

const Feedback = ({
	feedback,
	replies,
	currentUserId,
	deleteFeedback,
	updateFeedback,
	addFeedback,
	activeFeedback,
	setActiveFeedback,
	parentId = null,
}) => {
	const canReply = Boolean(currentUserId); // just user that logged in can Reply
	const canEdit = currentUserId === feedback.userId;
	const canDelete = currentUserId === feedback.userId;
	const createdAt = new Date(feedback.createdAt).toLocaleDateString();
	const isReplying =
		activeFeedback &&
		activeFeedback.type === "replying" &&
		activeFeedback.id === feedback.feedbackId;
	const isEditing =
		activeFeedback &&
		activeFeedback.type === "editing" &&
		activeFeedback.id === feedback.feedbackId;
	const replyId = parentId ? parentId : feedback.feedbackId;

	return (
		<Box sx={{ display: "flex", mb: 1 }}>
			<Box sx={{ width: 450, ml: 1, justifyContent: "center" }}>
				<Box sx={{ display: "flex" }}>
					<Box sx={{ mr: 1, ml: 1 }}>{feedback.username}</Box>
					<Box>{createdAt}</Box>
				</Box>
				{!isEditing && (
					<Paper
						sx={{
							fontSize: 18,
							backgroundColor: "#f5f5f5",
							pt: 0.5,
							pb: 0.5,
							pr: 1,
							pl: 1,
						}}
					>
						{feedback.description}
					</Paper>
				)}
				{isEditing && (
					<FeedbackForm
						submitLabel="Update"
						hasCancelButton
						initialText={feedback.description}
						handleSubmit={(text) => updateFeedback(text, feedback.feedbackId)}
						handleCancel={() => setActiveFeedback(null)}
					/>
				)}
				<Box
					sx={{
						display: "flex",
						fontSize: 12,
						color: "#333333",
						cursor: "pointer",
						mt: 1,
						ml: 1,
					}}
				>
					{canReply && (
						<Box
							sx={{ mr: 1 }}
							onClick={() =>
								setActiveFeedback({ id: feedback.feedbackId, type: "replying" })
							}
						>
							Reply
						</Box>
					)}
					{canEdit && (
						<Box
							sx={{ mr: 1 }}
							onClick={() =>
								setActiveFeedback({ id: feedback.feedbackId, type: "editing" })
							}
						>
							Edit
						</Box>
					)}
					{canDelete && (
						<Box
							sx={{ mr: 1 }}
							onClick={() => deleteFeedback(feedback.feedbackId)}
						>
							Delete
						</Box>
					)}
				</Box>
				{isReplying && (
					<FeedbackForm
						submitLabel="Reply"
						handleSubmit={(text) => addFeedback(text, replyId)}
					/>
				)}
				{replies.length > 0 && (
					<Box sx={{ mt: 2, ml: 3 }}>
						{replies.map((reply) => (
							<Feedback
								feedback={reply}
								key={reply.feedbackId}
								replies={[]}
								currentUserId={currentUserId}
								deleteFeedback={deleteFeedback}
								updateFeedback={updateFeedback}
								addFeedback={addFeedback}
								activeFeedback={activeFeedback}
								setActiveFeedback={setActiveFeedback}
								parentId={feedback.feedbackId}
							/>
							//empty array: our replies can't have nested feedbacks
						))}
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default Feedback;
