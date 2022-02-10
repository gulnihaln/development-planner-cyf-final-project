//this is a component to handle see feedback button in plan's page.

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Feedbacks from "./Feedbacks";
import { request } from "../../utils/api";


 function TemporaryDrawer({ plan_id, user_id }) {
	const [drawer, setDrawer] = useState(false); //set drawer open or not
	// console.log(user_id);


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
				PaperProps={{ sx: { width: 700 } }}
				anchor={"right"}
				open={drawer}
				onClose={() => setDrawer(false)}
			>
				<Feedbacks currentUserId={user_id} plan_id={plan_id} />
			</Drawer>
		</Box>
	);
}

export default React.memo(TemporaryDrawer);
