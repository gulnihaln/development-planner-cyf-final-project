import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField, {
	shouldForwardProp: (props) => props !== "focusColor",
})((p) => ({
	"& .MuiInput-underline:after": {
		borderBottom: "1px solid",
		borderBottomColor: p.focusColor,
	},
}));

const EditableInput = ({ goal_id, title, setTitle, editGoal }) => {
  const [open, setOpen] = useState(false);

  return (
		<div>
			{open ? (
				<Box>
					<CssTextField
						variant="standard"
						focusColor="rgba(0, 0, 0, 0.6)"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						fullWidth
						onBlur={() => {
							editGoal(goal_id, title);
							setOpen(!open);
						}}
					/>
				</Box>
			) : (
				<Box sx={{ m: 1, display: "flex" }}>
					<Typography
						onClick={() => setOpen(!open)}
						sx={{
							flexGrow: 1,
							paddingLeft: 1,
							marginTop: 1,
							cursor: "pointer",
						}}
					>
						{title}
					</Typography>
				</Box>
			)}
		</div>
	);
};

export default EditableInput;