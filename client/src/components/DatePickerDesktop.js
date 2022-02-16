import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import DesktopDateRangePicker from "@mui/lab/DesktopDateRangePicker";
import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField, {
	shouldForwardProp: (props) => props !== "focusColor",
})((p) => ({
	"& .MuiOutlinedInput-root": {
		"&.Mui-focused fieldset": {
			border: "1px solid",
			borderColor: p.focusColor,
		},
	},
}));

export default function DatePickerDesktop({ startDate, endDate, setStartDate, setEndDate }) {
	const [value, setValue] = useState([startDate, endDate]);
	const today = new Date();
	const [onTime, setOnTime] = useState(today > endDate);

	return (
		<div>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<Stack spacing={2} className="desktop-datepicker" sx={{ padding: 2 }}>
					<DesktopDateRangePicker
						minDate={today}
						startText="Start"
						value={value}
						onChange={(newValue) => {
							setValue(newValue);
							setStartDate(newValue[0]);
							setEndDate(newValue[1]);
						}}
						// onBlur={() => {
						// 	editGoal(startDate, endDate, goal_id);
						// }}
						renderInput={(startProps, endProps) => (
							<React.Fragment>
								<CssTextField
									focusColor="rgba(0, 0, 0, 0.6)"
									label="Start"
									id={value.index}
									size="small"
									// color={onTime ? "primary" : "warning"}
									{...startProps}
									InputLabelProps={{ style: { color: "rgba(0, 0, 0, 0.6)" } }}
								/>
								<Box sx={{ mx: 1 }}> to </Box>
								<CssTextField
									focusColor="rgba(0, 0, 0, 0.6)"
									label="End"
									id={value.index}
									size="small"
									color={onTime ? "primary" : "warning"}
									{...endProps}
									// InputProps={{
									// 	style: {
									// 		fontSize: "12px",
									// 		paddingLeft: "5px",
									// 		paddingRight: "5px",
									// 	},
									// }}
									InputLabelProps={{ style: { color: "rgba(0, 0, 0, 0.6)" } }}
								/>
							</React.Fragment>
						)}
					/>
				</Stack>
			</LocalizationProvider>
		</div>
	);
}
