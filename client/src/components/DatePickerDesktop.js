import React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import DesktopDateRangePicker from "@mui/lab/DesktopDateRangePicker";
import "../styles/Goal.css";

export default function DatePickerDesktop() {
	const [value, setValue] = React.useState([null, null]);
	return (
		<div>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<Stack spacing={3} className="desktop-datepicker">
					<DesktopDateRangePicker
						startText="Desktop start"
						value={value}
						onChange={(newValue) => {
							setValue(newValue);
						}}
						renderInput={(startProps, endProps) => (
							<React.Fragment>
								<TextField {...startProps} />
								<Box sx={{ mx: 2 }}> to </Box>
								<TextField {...endProps} />
							</React.Fragment>
						)}
					/>
				</Stack>
			</LocalizationProvider>
		</div>
	);
}
