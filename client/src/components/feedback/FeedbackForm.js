import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

const FeedbackForm = ({
	handleSubmit,
	submitLabel,
	hasCancelButton = false,
	initialText = "",
	handleCancel,
}) => {
	const [text, setText] = useState(initialText); //store our text that we are typing
	const isTextareaDisabled = text.length === 0;
	const onSubmit = (event) => {
		event.preventDefault();
		handleSubmit(text);
		setText("");
	};

	return (
		<form onSubmit={onSubmit}>
			<TextField
				variant="standard"
				placeholder="Write your feedback here..."
				sx={{
					width: "90%",
					height: 80,
					m: "auto",
					display: "flex",
					justifyContent: "center",
				}}
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<Button
				type="submit"
				sx={{ ml: 2, p: 1, borderRadius: 10, width: 450 }}
				disabled={isTextareaDisabled}
			>
				{submitLabel}
			</Button>
			{hasCancelButton && (
				<Button
					type="button"
					sx={{ width: 450, p: 1, ml: 2, mt: 1, borderRadius: 5 }}
					onClick={handleCancel}
				>
					Cancel
				</Button>
			)}
		</form>
	);
};

export default FeedbackForm;
