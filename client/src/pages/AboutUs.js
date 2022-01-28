import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "@mui/material/Link";
import "../styles/AboutUs.css";
import maziarmajd from "../uploads/maziarmajd.jpg";

export default function AboutUs() {
	return (
		<div className="hero-image">
			{/* <div className="background-img"> */}
			<Typography
				variant="h3"
				gutterBottom
				component="div"
				sx={{ color: "#fff", textAlign: "center", paddingTop: "15px" }}
			>
				About us
			</Typography>
			<div className="hero-text">
				<Card className="devs-card-left">
					<CardMedia
						component="img"
						height="200"
						image="https://via.placeholder.com/200x200.png"
						alt="person-photo"
					/>
					<Box className="info-box">
						<Typography
							variant="subtitle2"
							gutterBottom
							component="div"
							sx={{ fontSize: "larger", padding: "10px" }}
						>
							Ali Bavarsad
						</Typography>
						<Typography
							variant="body2"
							gutterBottom
							component="div"
							sx={{ textAlign: "center", padding: "5px" }}
						>
							body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Quos blanditiis tenetur
						</Typography>
						<Box className="devs-social-icon">
							<IconButton>
								<Link
									href="https://www.linkedin.com/in/ali-bavarsad-6ba8a916b/"
									target="blank_"
								>
									<LinkedInIcon style={{ color: "rgb(237,67,67)" }} />
								</Link>
							</IconButton>
							<IconButton>
								<Link href="https://github.com/alibvr" target="blank_">
									<GitHubIcon style={{ color: "rgb(237,67,67)" }} />
								</Link>
							</IconButton>
						</Box>
					</Box>
				</Card>
				<Card className="devs-card-right">
					<CardMedia
						component="img"
						height="200"
						image="https://media-exp1.licdn.com/dms/image/C4E03AQEDHxEjOe1CcQ/profile-displayphoto-shrink_800_800/0/1626690828269?e=1648684800&v=beta&t=qGnG1oTyMMRoDIBNveJ2DTHGch2pzZOZBKTc650AFb0"
						alt="person-photo"
					/>
					<Box className="info-box">
						<Typography
							variant="subtitle1"
							gutterBottom
							component="div"
							sx={{ fontSize: "larger", padding: "10px" }}
						>
							Gulnihal Naldoken
						</Typography>
						<Typography
							variant="body2"
							gutterBottom
							component="div"
							sx={{ textAlign: "center", padding: "5px" }}
						>
							Gulnihal is a North West trainee, former physics teacher. Her
							coding journey started with CYF. She has passion for learning.
						</Typography>
						<Box>
							<IconButton>
								<Link
									href="https://www.linkedin.com/in/gulnihalnaldoken/"
									target="blank_"
								>
									<LinkedInIcon style={{ color: "currentColor" }} />
								</Link>
							</IconButton>
							<IconButton>
								<Link href="https://github.com/gulnihaln" target="blank_">
									<GitHubIcon style={{ color: "#000000" }} />
								</Link>
							</IconButton>
						</Box>
					</Box>
				</Card>
				<Card className="devs-card-left">
					<CardMedia
						component="img"
						height="200"
						image={maziarmajd}
						alt="person-photo"
					/>
					<Box className="info-box">
						<Typography
							variant="subtitle1"
							gutterBottom
							component="div"
							sx={{ fontSize: "larger", padding: "10px" }}
						>
							Maziar Majd
						</Typography>
						<Typography
							variant="body2"
							gutterBottom
							component="div"
							sx={{ textAlign: "center", padding: "5px" }}
						>
							body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Quos blanditiis tenetur
						</Typography>
						<Box>
							<IconButton>
								<Link
									href="https://uk.linkedin.com/in/maziarmajd"
									target="blank_"
								>
									<LinkedInIcon style={{ color: "rgb(237,67,67)" }} />
								</Link>
							</IconButton>
							<IconButton>
								<Link href="https://github.com/Maziarmajd" target="blank_">
									<GitHubIcon style={{ color: "rgb(237,67,67)" }} />
								</Link>
							</IconButton>
						</Box>
					</Box>
				</Card>
				<Card className="devs-card-right">
					<CardMedia
						component="img"
						height="200"
						image="https://via.placeholder.com/200x200.png"
						alt="person-photo"
					/>
					<Box className="info-box">
						<Typography
							variant="subtitle1"
							gutterBottom
							component="div"
							sx={{ fontSize: "larger", padding: "10px" }}
						>
							Morteza Khojasteh
						</Typography>
						<Typography
							variant="body2"
							gutterBottom
							component="div"
							sx={{ textAlign: "center", padding: "5px" }}
						>
							body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Quos blanditiis tenetur
						</Typography>
						<Box>
							<IconButton>
								<Link
									href="https://github.com/gulnihaln/development-planner-cyf-final-project"
									target="blank_"
								>
									<LinkedInIcon style={{ color: "rgb(237,67,67)" }} />
								</Link>
							</IconButton>
							<IconButton>
								<Link
									href="https://github.com/gulnihaln/development-planner-cyf-final-project"
									target="blank_"
								>
									<GitHubIcon style={{ color: "rgb(237,67,67)" }} />
								</Link>
							</IconButton>
						</Box>
					</Box>
				</Card>
			</div>
			<Typography
				variant="body1"
				gutterBottom
				sx={{
					color: "#fff",
					textAlign: "center",
					padding: "20px",
					width: "100%",
					maxWidth: 800,
					margin: "auto",
				}}
			>
				Special thanks to our leads Vlad Ene and Elena Cavallero who have been
				supporting us to develop this application voluntarily. Also, our
				gratitude to CodeYourFuture for giving us this opportunity to learn
				programming languages and professional skills which are valuable for the
				tech industry.
			</Typography>
		</div>
		// </div>
	);
}
