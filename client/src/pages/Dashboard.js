import React, { useEffect, useState } from "react";
import PlanCard from "../components/PlanCard";
import { Container } from "@mui/material";
import { request } from "../utils/api";
import AddIcon from "@mui/icons-material/Add";
import Masonry from "react-masonry-css";
import "../styles/Masonry.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { CardActionArea } from "@mui/material";

function Dashboard() {
	const [plans, setPlans] = useState([]);

	useEffect(() => {
		request.get("/plans").then((res) => {
			setPlans(res.data);
		});
	}, []);

	//this is a function to delete plans from database
	const handleDelete = async (id) => {
		request.delete("/plans/" + id);

		//this is a function to update  plans in browser when delete a plan
		const newPlans = plans.filter((plan) => plan.id !== id);
		setPlans(newPlans);
	};

	const breakpoints = {
		default: 4,
		1100: 2,
		700: 1,
	};

	return (
		<div>
			<Container sx={{ marginTop: 4 }}>
				<Masonry
					breakpointCols={breakpoints}
					className="my-masonry-grid"
					columnClassName="my-masonry-grid_column"
				>
					<Link to={"/dashboard/newPlan"} style={{ textDecoration: "none" }}>
						<Card
							elevation={3}
							sx={{
								display: "flex",
								flexDirection: "column",
								backgroundColor: "#efefef",
								alignItems: "center",
								justifyContent: "center",
								// height: "100px",
								marginBottom: 4,
							}}
						>
							{/* <CardActionArea> */}
								<CardHeader
									action={<AddIcon sx={{ color: "green", fontSize: "38px" }} />}
								/>

								<CardContent>
									<Typography variant="body2" color="textSecondary">
										Create new plan
									</Typography>
								</CardContent>
							{/* </CardActionArea> */}
						</Card>
					</Link>
					{plans
						.sort((a, b) => (a.id < b.id ? 1 : -1))
						.map((plan) => (
							<div key={plan.id}>
								<PlanCard plan={plan} handleDelete={handleDelete} />
							</div>
						))}
				</Masonry>
			</Container>
		</div>
	);
}

export default Dashboard;
