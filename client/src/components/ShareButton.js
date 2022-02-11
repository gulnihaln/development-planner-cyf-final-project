import React, { useState, useEffect } from "react";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Popper } from "@mui/material";
import Typography from "@mui/material/Typography";

const ShareButton = () => {
	const [pageURL, setPageURL] = useState(0);
	const [anchorEl, setAnchorEl] = useState(null);

	useEffect(() => {
		setPageURL(window.location.href);
	}, []);

	const handlePopoverOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popper" : undefined;

	return (
		<div>
			<ShareOutlinedIcon
				aria-describedby={id}
				onClick={() => navigator.clipboard.writeText(pageURL)}
				onClose={handlePopoverClose}
				sx={{ color: "#CF2F2F" }}
			/>
			<Popper id={id} open={open} anchorEl={anchorEl}>
				<Typography
					onMouseEnter={handlePopoverOpen}
					onMouseLeave={handlePopoverClose}
					sx={{ fontSize: 12 }}
				>
					Link copied
				</Typography>
			</Popper>
		</div>
	);
};

export default ShareButton;
