import { Typography, InputBase } from "@mui/material";
// import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// const useStyle = makeStyles((theme) => ({
//     editableTitleContainer: {
//         margin: theme.spacing(1),
//         display: "flex",
//     },
//     editableTitle: {
//         flexGrow: 1,
//     },
// }));
export default function PlanTitle() {
    const [open, setOpen] = useState(false);
    // const classes = useStyle();
    return (
        <div>
            {open ? (
            <div>
                <InputBase
                    value="Untitled"
                    inputProps = {{
                        // className: classes.input,
                    }}
                    fullWidth
                    onBlur={() => setOpen(!open)}
                ></InputBase>
            </div>
            ) : (
            <div
            // className={classes.editableTitleContainer}
            >
                <Typography
                    onclick={setOpen(!open)}
                    // className={classes.editableTitle}
                    >
                    Untitled
                </Typography>
                <MoreVertIcon />
            </div>
            )}
        </div>
    );
}
