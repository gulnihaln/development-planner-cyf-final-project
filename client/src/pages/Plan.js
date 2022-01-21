import Button from "@mui/material/Button";
import "../styles/Plan.css";
import DropdownMenu from "../utils/DropdownMenu";
import PlanTitle from "../utils/PlanTitle";
import Goals from "../components/Goals";
// import { ThemeProvider } from "styled-components";
// import { makeStyles } from "@mui/styles";
// import { useTheme } from "@material-ui/core/styles";

const fakeGoals = [
	{
		id: 1,
		// plan_id: ,
		title: "New goal",
		tasks: [
			{
				id: 102,
				goal_id: 1,
				title: "New Task2",
				status: "in progress",
			},
		],
	},
	{
		id: 2,
		// plan_id: ,
		title: "New goal2",
		tasks: [
			{
				id: 103,
				goal_id: 1,
				title: "New Task3",
				status: "in progress",
			},
		],
	},
];

// const useStyle = makeStyles((theme) => ({
// 	root: {
// 		width: "300px",
// 	},
// }));

export default function Plan() {
	// const theme = useTheme();
	// const classes = useStyle();
	return (
		<>
			{/* <ThemeProvider
			theme={theme} */}
			{/* // className={classes.root} */}
			{/* > */}
			<section className="plan-container">
				<div className="plan-intro-container">
					<div className="title-progress-container">
						{/* <h2>{fakeTasks[0].title}</h2> */}
						<PlanTitle />
						<article className="progress-bar"></article>
					</div>
					<div className="feedback-buttons">
						<DropdownMenu />
						<div className="invite-feedback">
							<Button
								variant="outlined"
								sx={{
									color: "primary.main",
									bgColor: "#FFFFFF",
									borderRadius: 10,
								}}
							>
								Invite Reviewer
							</Button>
							<Button
								variant="outlined"
								sx={{
									color: "primary.main",
									bgColor: "#FFFFFF",
									borderRadius: 10,
								}}
							>
								See Feedbacks
							</Button>
						</div>
					</div>
				</div>
			</section>
			<section className="goals-container">
				<Goals fakeGoals={fakeGoals} />
			</section>
			{/* </ThemeProvider> */}
		</>
	);
}