import * as React from "react";
import DropdownMenuTask from "../utils/DropdownMenuTask";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";

export default function TaskTicket ({ tasks }) {
	return (
		<Box>
			{tasks.map((task) => {
				return (
					<Card key={task.id}
					sx={{ width: "90%" }}
					>
						<CardHeader
							action={
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										padding: 0,
									}}
								>
									<DropdownMenuTask />
								</Box>
							}
							subheader={task.title}
						/>
					</Card>
				);
			})}
		</Box>
	);
}