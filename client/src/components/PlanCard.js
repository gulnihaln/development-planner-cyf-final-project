import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { IconButton, Typography } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Link } from "react-router-dom";

const PlanCard = ({ plan, handleDelete }) => {

	return (
		<div>
			<Link to={`/plan/${plan.id}`} style={{ textDecoration: "none" }}>
				<Card elevation={3} sx={{ backgroundColor: "#efefef" }}>
					<CardHeader
						action={
							<IconButton
								onClick={(e) => {
									e.preventDefault();
									handleDelete(plan.id);
								}}
							>
								<DeleteOutlinedIcon />
							</IconButton>
						}
						title={plan.title}
					/>
					<CardContent>
						<Typography variant="body2" color="textSecondary">
							{plan.description}
						</Typography>
					</CardContent>
				</Card>
			</Link>
		</div>
	);
};

export default PlanCard;
