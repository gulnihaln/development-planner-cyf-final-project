import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PlanCard from "../components/PlanCard";
import Grid from "@mui/material/Grid";
import { Button, Container } from "@mui/material";
import { request } from "../utils/api";
import AddIcon from "@mui/icons-material/Add";

function Dashboard() {
	const [plans, setPlans] = useState([]);
	const history = useHistory();

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

	return (
		<div>
			<Button
				color="inherit"
				variant="contained"
				sx={{ mt: 2, ml: 1 }}
				onClick={() => history.push("/newplan")}
			>
				<AddIcon />
				Create Plan
			</Button>
			<Container>
				<Grid container spacing={3}>
					{plans.map((plan) => (
						<Grid item key={plan.id} xs={12} md={6} lg={4}>
							<PlanCard plan={plan} handleDelete={handleDelete} />
						</Grid>
					))}
				</Grid>
			</Container>
		</div>
	);
}

export default Dashboard;
