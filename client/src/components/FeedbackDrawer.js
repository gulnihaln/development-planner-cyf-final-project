import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Card , Stack, TextField } from "@mui/material";
import { request } from "../utils/api";

export default function TemporaryDrawer() {
  const history = useHistory();
  const [drawer, setDrawer] = useState(false);
  const [description, setDescription] = useState("");
  const [newFeedback, setNewFeedback] = useState([]);
  const isMentor = true;

  const toggleDrawer = (open) => (event) => setDrawer(open);

  const fetchData = useCallback(() => {
    request.get("http://localhost:8000/feedback")
      .then((response) => {
        console.log(response);
        setNewFeedback(response.data);
      });
  }, [setNewFeedback])

  useEffect(() => {
   fetchData();
  },[]);

  const handleClick = () => {

    if (description) {
      fetch("http://localhost:8000/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      }).then(() => history.push("/plan"));
    }



    const feedbacks = newFeedback.concat([{ description }]);
    setNewFeedback(feedbacks);
    setDescription("");

  };

  return (
    <Box>
        {isMentor? <Button onClick={toggleDrawer(true)} variant="outlined"
        sx={{
          color: "primary.main",
          bgColor: "#FFFFFF",
          borderRadius: 10 }}
      >
          Write Feedback
      </Button> : 
      <Button onClick={toggleDrawer(true)} variant="outlined"
        sx={{
          color: "primary.main",
          bgColor: "#FFFFFF",
          borderRadius: 10,
          pr: 3
        }}
      >
          See Feedbacks
      </Button>}
      <Drawer sx={{ width: 500 }} anchor={"right"} open={drawer} onClose={toggleDrawer(false)}>
         {isMentor? 
         <>
           <TextField
            sx={{ ml: 2, mr: 2, mt: 2 }}
            variant="filled"
            multiline
            rows={10}
            label="Write your feedback here"
            value={description}
            onChange={(e) => setDescription(e.target.value)} /><Button
              type="button"
              variant="contained"
              sx={{ ml: 2, mr: 2, mt: 2, backgroundColor: "#D12F2F" }}
              onClick={handleClick}
            >
              Send Feedback
            </Button><Stack sx={{ m: 2 }}>
              {newFeedback.map((item, index) =>
                <Card key={index} elevation={2} sx={{ ml: 2, mr: 2, mt: 2, p: 1, backgroundColor: "#F9F9F9", width: 500 }}>
                  <Typography sx={{ ml: 2 }}>
                    {item.description}
                  </Typography>
                </Card>
              )}
            </Stack>
          </>
             : <Stack sx={{ m: 2 }}>
              {newFeedback.map((item, index) =>
                 <Card key={index} elevation={2} sx={{ ml: 2, mr: 2, mt: 2, p: 1, backgroundColor: "#F9F9F9", width: 500 }}>
                    <Typography sx={{ ml: 2 }}>
                      {item.description}
                    </Typography>
                   </Card>
              )}
          </Stack> }    
      </Drawer>
    </Box>
  );
}
