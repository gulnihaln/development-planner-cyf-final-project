import { Typography, InputBase } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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
					<div>
						<Typography
							onclick={setOpen(!open)}
							>
							{title}
						</Typography>
						<MoreVertIcon />
					</div>
				)}
			</div>
		);
}
