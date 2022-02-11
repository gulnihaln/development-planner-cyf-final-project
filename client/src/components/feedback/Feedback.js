import React from "react";
import { Avatar, Box, Paper } from "@mui/material";
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
	parent_id = null,
}) => {
	const canReply = Boolean(currentUserId); // just user that logged in can Reply
	const canEdit = currentUserId === feedback.user_id;
	const canDelete = currentUserId === feedback.user_id;
	const createdAt = new Date(feedback.create_date).toLocaleDateString();
	const isReplying =
		activeFeedback &&
		activeFeedback.type === "replying" &&
		activeFeedback.id === feedback.feedback_id;
	const isEditing =
		activeFeedback &&
		activeFeedback.type === "editing" &&
		activeFeedback.id === feedback.feedback_id;
	const replyId = parent_id ? parent_id : feedback.feedback_id;

	return (
		<Box sx={{ display: "flex", mb: 1 }}>
			<Avatar sx={{ ml: 1, mt: 1 }}></Avatar>
			<Box sx={{ width: "90%", ml: 1 }}>
				<Box sx={{ display: "flex" }}>
					<Box
						sx={{ mr: 1, ml: 1 }}
					>{`${feedback.first_name} ${feedback.last_name}`}</Box>
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
						handleSubmit={async (text) => {
							await updateFeedback(text, feedback.feedback_id);
							setActiveFeedback(null);
						}}
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
								setActiveFeedback({
									id: feedback.feedback_id,
									type: "replying",
								})
							}
						>
							Reply
						</Box>
					)}
					{canEdit && (
						<Box
							sx={{ mr: 1 }}
							onClick={() =>
								setActiveFeedback({ id: feedback.feedback_id, type: "editing" })
							}
						>
							Edit
						</Box>
					)}
					{canDelete && (
						<Box
							sx={{ mr: 1 }}
							onClick={() => deleteFeedback(feedback.feedback_id)}
						>
							Delete
						</Box>
					)}
				</Box>
				{isReplying && (
					<Box sx={{ width: 400, justifyContent: "center" }}>
					<FeedbackForm
						submitLabel="Reply"
						handleSubmit={(text) => addFeedback(text, replyId)}
					/>
					</Box>
				)}
				{replies.length > 0 && (
					<Box sx={{ mt: 2, ml: 3 }}>
						{replies.map((reply) => (
							<Feedback
								feedback={reply}
								key={reply.feedback_id}
								replies={[]}
								currentUserId={currentUserId}
								deleteFeedback={deleteFeedback}
								updateFeedback={updateFeedback}
								addFeedback={addFeedback}
								activeFeedback={activeFeedback}
								setActiveFeedback={setActiveFeedback}
								parent_id={feedback.feedback_id}
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
