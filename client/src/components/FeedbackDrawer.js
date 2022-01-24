import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

export default function TemporaryDrawer() {
  const [state, setState] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    setState(open);
  };

  return (
    <div>
      <Button onClick={toggleDrawer(true)} />
      <Drawer sx={{ m: 2 }} anchor={"right"} open={state} onClose={toggleDrawer(false)}>
        <TextField
          sx={{ width: 500, m: 2 }}
          multiline
          rows={10}
          label="Write your feedback here"
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{ m: 2 }}
        >
          Send
        </Button>
      </Drawer>
    </div>
  );
}
