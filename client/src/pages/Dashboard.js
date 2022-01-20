import React, { useEffect, useState } from "react";
import PlanCard from "../components/PlanCard";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";

function Dashboard() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/plans")
      .then((res) => res.json())
      .then((data) => setPlans(data));
  }, []);

  //this is a function to delete plans from database
  const handleDelete = async (id) => {
    await fetch("http://localhost:8000/plans/" + id, {
      method: "DELETE",
    });

    //this is a function to update  plans in browser when delete a plan
    const newPlans = plans.filter((plan) => plan.id !== id);
    setPlans(newPlans);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {plans.map((plan) => (
          <Grid item key={plan.id} xs={12} md={6} lg={4}>
            <PlanCard plan={plan} handleDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Dashboard;
