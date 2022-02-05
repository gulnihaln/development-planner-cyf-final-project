import { Typography, InputBase } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";

export default function PlanTitle({ title, setTitle }) {
    const [open, setOpen] = useState(false);

    return (
			<div>
				{open ? (
					<div>
						<InputBase
							value={title}
							onChange={(event) => setTitle(event.target.value)}
							inputProps={{}}
							fullWidth
							onBlur={() => setOpen(!open)}
						></InputBase>
					</div>
				) : (
					<Box>
						<Typography
							onclick={setOpen(!open)}
							sx={{ cursor: "pointer" }}>
							{title}
						</Typography>
						<MoreVertIcon />
					</Box>
				)}
			</div>
		);
}
