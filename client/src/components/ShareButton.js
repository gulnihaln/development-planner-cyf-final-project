import React, { useState, useEffect } from "react";
import { Button, Tooltip } from "@mui/material";

const ShareButton = () => {
	const [pageURL, setPageURL] = useState(0);

	useEffect(() => {
		setPageURL(window.location.href);
	}, []);

	return (
		<Tooltip title="Copy link to clipboard">
			<Button
				variant="outlined"
				sx={{ ml: 1, color: "#CF2F2F", borderRadius: 10 }}
				onClick={() => navigator.clipboard.writeText(pageURL)}
			>
				Share
			</Button>
		</Tooltip>
	);
};

export default ShareButton;
