import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareButton from "../components/ShareButton";
import FeedbackDrawer from "../components/feedback/FeedbackDrawer";


const ITEM_HEIGHT = 48;

export default function DropdownMenuFeedback (plan_id, user_id) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className="dropdown-icon">
			<IconButton
				aria-label="more"
				id="long-button"
				aria-controls={open ? "long-menu" : undefined}
				aria-expanded={open ? "true" : undefined}
				aria-haspopup="true"
				onClick={handleClick}
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id="long-menu"
				MenuListProps={{
					"aria-labelledby": "long-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						width: "20ch",
					},
				}}
			>
				<MenuItem
					key="shareButton"
					selected={"shareButton" === "Pyxis"}
					onClick={handleClose}
				>
					<ShareButton />
				</MenuItem>
				<MenuItem
					key="Feedbacks"
					selected={"Feedbacks" === "Pyxis"}
					onClick={handleClose}
				>
					<FeedbackDrawer plan_id={plan_id} user_id={user_id} />
				</MenuItem>
			</Menu>
		</div>
	);
}