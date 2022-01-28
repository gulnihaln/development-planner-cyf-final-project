import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { IconButton, Typography } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const PlanCard = ({ plan, handleDelete }) => {

  return (
    <div>
      <Card elevation={3} >
        <CardHeader
          action={
            <IconButton onClick={() => handleDelete(plan.id)}>
              <DeleteOutlinedIcon />
            </IconButton>
          }
          title={plan.title}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {plan.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlanCard;
