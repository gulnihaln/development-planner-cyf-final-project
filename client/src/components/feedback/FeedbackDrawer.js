//this is a component to handle see feedback button in plan's page.

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Feedbacks from "./Feedbacks";

export default function TemporaryDrawer() {
	const [drawer, setDrawer] = useState(false); //set drawer open or not

	return (
		<Box>
			<Button
				onClick={() => setDrawer(true)}
				variant="outlined"
				sx={{
					color: "primary.main",
					bgColor: "#FFFFFF",
					borderRadius: 10,
				}}
			>
				Write Feedback
			</Button>
			<Drawer
				PaperProps={{ sx: { width: 500 } }}
				anchor={"right"}
				open={drawer}
				onClose={() => setDrawer(false)}
			>
				<Feedbacks currentUserId= "1" />
			</Drawer>
		</Box>
	);
}
