import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import DropdownMenu from "../utils/DropdownMenu";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	textAlign: "center",
	color: theme.palette.text.secondary,
	height: 60,
	lineHeight: "60px",
    width: 300,
}));

const lightTheme = createTheme({ palette: { mode: "light" } });

export default function TaskTicket ({ tasks }) {
	return (
		<div>
			{tasks.map((task) => {
                return (
									<Grid key={task.id}>
										{[lightTheme].map((theme, index) => (
											<Grid item xs={6} key={index}>
												<ThemeProvider theme={theme}>
													<Item elevation={3}>{task.title}</Item>
												</ThemeProvider>
												<DropdownMenu />
											</Grid>
										))}
									</Grid>
								);
			})}
		</div>
	);
}
