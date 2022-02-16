import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import MobileDateRangePicker from "@mui/lab/MobileDateRangePicker";
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

export default function DatePickerMobile({ startDate, endDate, setStartDate, setEndDate }) {
	const [value, setValue] = React.useState([startDate, endDate]);
	const [onTime, setOnTime] = useState(today > endDate);
	const today = new Date();

	return (
		<div>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<Stack spacing={3} className="mobile-datepicker" sx={{ padding: 2 }}>
					<MobileDateRangePicker
						minDate={today}
						startText="Start"
						value={value}
						onChange={(newValue) => {
							setValue(newValue);
							setStartDate(newValue[0]);
							setEndDate(newValue[1]);
						}}
						renderInput={(startProps, endProps) => (
							<React.Fragment>
								<CssTextField
									focusColor="rgba(0, 0, 0, 0.6)"
									label="Start"
									id={value.index}
									size="small"
									{...startProps}
									InputLabelProps={{ style: { color: "rgba(0, 0, 0, 0.6)" } }}
								/>
								<Box sx={{ mx: 2 }}> to </Box>
								<CssTextField
									focusColor="rgba(0, 0, 0, 0.6)"
									label="End"
									id={value.index}
									size="small"
									color={onTime ? "primary" : "warning"}
									{...endProps}
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
