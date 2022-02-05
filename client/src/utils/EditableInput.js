import React, { useState } from "react";
import { Box, InputBase, Typography } from "@mui/material";


const EditableInput = ({ title, setTitle }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {open ? (
        <Box>
          <InputBase
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            onBlur={() => setOpen(!open)}
            // inputProps
          />
        </Box>
      ) : (
        <Box sx={{ m: 1, display: "flex" }}>
          {/* if else is to make the goal's title editable or just show the title */}
          <Typography onClick={() => setOpen(!open)} sx={{ flexGrow: 1, paddingLeft: 1, marginTop: 1 }}>
            {title}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default EditableInput;