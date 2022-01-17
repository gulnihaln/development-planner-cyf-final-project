import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


export default function Navbar() {
  return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Box
						component="img"
						sx={{
							height: 50,
						}}
						alt="Your logo."
						src="https://scontent.fman5-1.fna.fbcdn.net/v/t1.6435-9/115304643_110414290764387_107868348379648400_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=aAImRmMtvZ4AX97qWbF&_nc_ht=scontent.fman5-1.fna&oh=00_AT_PE6LuDYHnpA1SwsC3YbhdHKHxZSDcjsYkjFD5bIxH2Q&oe=620CB0CD"
					/>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					></IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Development Planner
					</Typography>
					<Button variant="text" size="small" sx={{ color: "#fff"}}>
						Sign Up
					</Button>
					<MenuIcon sx={{display: "none"}} />
				</Toolbar>
			</AppBar>
		</Box>
	);
}