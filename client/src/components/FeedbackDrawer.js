import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { Card ,TextField } from "@mui/material";

export default function TemporaryDrawer() {
  const history = useHistory();
  const [drawer, setDrawer] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);

  const toggleDrawer = (open) => (event) => {
    setDrawer(open);
  };

  const handleClick = (e) => {
    e.preventDefault();

    setDescriptionError(false);

    if (descriptionError === "") {
      setDescriptionError(true);
    }

    if (description) {
      fetch("http://localhost:8000/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      }).then(() => history.push("/mentorDashboard"));
    }
  };

  return (
    <Box sx={{ m: 2 }}>
      <Button onClick={toggleDrawer(true)} variant="outlined" sx={{ display:"inline" }}>Write Feedback </Button>
      <Drawer sx={{ m: 2 }} anchor={"right"} open={drawer} onClose={toggleDrawer(false)}>
        <form>
          <TextField
            sx={{ width: 500, m: 2 }}
            multiline
            rows={10}
            label="Write your feedback here"
            onChange = {(e)=>setDescription(e.target.value)}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{ m: 2 }}
          >
            Send
          </Button>
        </form>
        <Card>
          {description}
        </Card>
      </Drawer>
    </Box>
  );
}
