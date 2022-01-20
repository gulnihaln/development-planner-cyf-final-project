import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TextField from "@mui/material/TextField";

function NewPlan() {
  const [plan, setPlan] = useState("");
  const history = useHistory();
  const [description, setDescription] = useState("");
  const [planError, setPlanError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setPlanError(false); //set the default value false to doesn't show error after fields completed
    setDescriptionError(false);

    //to show field error if fields doesn't completed
    if (plan === "") {
      setPlanError(true);
    }
    if (description === "") {
      setDescriptionError(true);
    }
    if (plan && description) {
      fetch("http://localhost:8000/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, description }),
      }).then(() => history.push("/plan"));
    }
  };

  return (
    <Container>
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        color="textSecondary"
      >
        Create a new plan
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setPlan(e.target.value)}
          margin="normal"
          sx={{ display: "block" }}
          label="Plan title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={planError}
        />
        <TextField
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          sx={{ display: "block" }}
          label="Description"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          error={descriptionError}
        />
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Create
        </Button>
      </form>
    </Container>
  );
}

export default NewPlan;
