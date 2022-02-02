import * as React from "react";
import DropdownMenuTask from "../utils/DropdownMenuTask";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";

export default function TaskTicket ( { tasks }) {

	return (
		<Box>
			{tasks.map((task, index) => {
				return (
					<Card key={index}
					sx={{ width: "90%" }}
					>
						<CardHeader
							action={
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										padding: 0,
										width: "100%",
									}}
								>
									<DropdownMenuTask />
								</Box>
							}
							subheader={task.description}
						/>
					</Card>
				);
			})}
		</Box>
	);
}