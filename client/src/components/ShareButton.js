import React, { useState, useEffect } from "react";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Box } from "@mui/material";

const ShareButton = () => {
	const [pageURL, setPageURL] = useState(0);

	useEffect(() => {
		setPageURL(window.location.href);
	}, []);

	return (
		<Box>
			<ShareOutlinedIcon
				onClick={() => navigator.clipboard.writeText(pageURL)}
				sx={{ color: "#CF2F2F" }}
			/>
		</Box>
	);
};

export default ShareButton;
