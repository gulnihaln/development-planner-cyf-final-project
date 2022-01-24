import { Typography, InputBase } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function PlanTitle() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("Untitled");
    return (
        <div>
            {open ? (
            <div>
                <InputBase
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    inputProps = {{
                    }}
                    fullWidth
                    onBlur={() => setOpen(!open)}
                ></InputBase>
            </div>
            ) : (
            <div
            >
                <Typography
                    onclick={setOpen(!open)}
                    >
                    {title}
                </Typography>
                <MoreVertIcon />
            </div>
            )}
        </div>
    );
}
