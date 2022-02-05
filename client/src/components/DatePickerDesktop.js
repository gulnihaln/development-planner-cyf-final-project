import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import DesktopDateRangePicker from "@mui/lab/DesktopDateRangePicker";
import "../styles/Goal.css";


export default function DatePickerDesktop({ startDate, endDate, setStartDate, setEndDate }) {
	const [value, setValue] = React.useState([startDate, endDate]);
	const today = new Date();
	const [onTime, setOnTime] = useState(today > endDate);

	return (
		<div>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<Stack spacing={2} className="desktop-datepicker" sx= {{ padding: 2 }}>
					<DesktopDateRangePicker
						minDate={today}
						startText="Start"
						value={value}
						onChange={(newValue) => {
							setValue(newValue);
							// onChange(newValue);
							setStartDate(newValue[0]);
							setEndDate(newValue[1]);
						}}
						renderInput={(startProps, endProps) => (
							<React.Fragment>
								<TextField
									label="Size"
									id="outlined-size-small"
									size="small"
									color={onTime ? "primary" : "warning"}
									{...startProps}
								/>
								<Box sx={{ mx: 1 }}> to </Box>
								<TextField
									label="Size"
									id="outlined-size-small"
									size="small"
									color={onTime ? "primary" : "warning"}
									{...endProps}
								/>
							</React.Fragment>
						)}
					/>
				</Stack>
			</LocalizationProvider>
		</div>
	);
}
