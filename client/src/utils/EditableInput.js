import React, { useState } from "react";
import { Box, InputBase, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const EditableInput = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("first goal");

  return (
    <div>
      {open ? (
        <Box>
          <InputBase
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            onBlur={() => setOpen(!open)}
            InputProps
          />
        </Box>
      ) : (
        <Box sx={{ m: 1, display: "flex" }}>
          {/* if else is to make the goal's title editable or just show the title */}
          <Typography onClick={() => setOpen(!open)} sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <EditOutlinedIcon sx={{ color: "#9e9e9e" }} onClick={() => setOpen(!open)} />
        </Box>
      )}
    </div>
  );
};

export default EditableInput;