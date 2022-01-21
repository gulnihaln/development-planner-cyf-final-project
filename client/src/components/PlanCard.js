import React from "react";
import { useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { IconButton, Typography } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const PlanCard = ({ plan, handleDelete }) => {
    const history = useHistory();

  return (
    <div>
      <Card elevation={3} onClick={() => {
          history.push("/newplan");
      }}>
        <CardHeader
          action={
            <IconButton onClick={() => handleDelete(plan.id)}>
              <DeleteOutlinedIcon />
            </IconButton>
          }
          title={plan.plan}
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
