import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PlanCard from "../components/PlanCard";
import Grid from "@mui/material/Grid";
import { Button, Container } from "@mui/material";
import { request } from "../utils/api";
import AddIcon from "@mui/icons-material/Add";
import Masonry from "react-masonry-css";
import "../styles/Masonry.css";

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

	const breakpoints = {
		default: 3,
		1100: 2,
		700: 1,
	};

	return (
		<div>
			<Button
				color="inherit"
				variant="contained"
				sx={{ mt: 2, ml: 17, mb: 3, p: 1 }}
				onClick={() => history.push("/newplan")}
			>
				<AddIcon />
				Create Plan
			</Button>
			<Container>
				{/* <Grid container spacing={3}> */}
				<Masonry
					breakpointCols={breakpoints}
					className="my-masonry-grid"
					columnClassName="my-masonry-grid_column"
				>
					{plans.map((plan) => (
						<div key={plan.id}>
							<PlanCard plan={plan} handleDelete={handleDelete} />
						</div>
					))}
				</Masonry>
				{/* </Grid> */}
			</Container>
		</div>
	);
}

export default Dashboard;
