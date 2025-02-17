import React, { useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTheme as useMode } from "../../context/Theme.context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction, logoutAuth } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function Header({ Ref }) {
  const theme = useTheme();
  const borderColor = theme.palette.border.secondary;
  const headerBG = theme.palette.background.paper;
  const { toggleTheme, toggleNav, isOpen } = useMode();

  const iconColor = theme.palette.icon.primary;
  const btnColor = theme.palette.text.isActive;

  const circle = {
    backgroundColor: `${btnColor}15`,
    borderRadius: "50%",
    width: 40,
    height: 40,
    minWidth: 0,
    padding: 0,
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const { isAuth, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(logoutAction());
    dispatch(logoutAuth());
    navigate("/login");
  };

  return (
    <header
      style={{
        backgroundColor: `${headerBG}90`,
        borderBottom: `2px solid ${borderColor}20`,
      }}
      className={`top-0 sticky px-5 md:px-10 py-3 h-[4.5rem] flex justify-between items-center z-30 transition-all duration-500 backdrop-blur`}
    >
      <div className="text-xl opacity-80">
        <span className="hidden lg:block">Dashboard</span>
        <span className="lg:hidden">Digital Shop</span>
      </div>
      <div className="flex gap-2 md:gap-4">
        <Button onClick={toggleTheme} sx={circle}>
          <LightModeOutlinedIcon sx={{ color: iconColor, fontSize: 18 }} />
        </Button>
        <Button
          ref={Ref}
          onClick={toggleNav}
          sx={{ display: { lg: "none" }, ...circle }}
        >
          <MenuIcon sx={{ color: iconColor, fontSize: 19 }} />
        </Button>

        <Button sx={circle}>
          <NotificationsNoneIcon sx={{ color: iconColor, fontSize: 21 }} />
        </Button>

        {/* start the profile section */}
        {isAuth ? (
          <Button
            onClick={handleClick}
            sx={{
              color: theme.palette.text.primary,
              minWidth: 0,
              height: 40,
            }}
          >
            <div className="h-[2.1rem] w-[2.1rem] ring rounded-full border">
              <img
                className="h-full w-full object-cover rounded-full"
                src={user?.avatar}
                alt="avatar"
              />
            </div>
            <p className="text-left leading-tight hidden md:block ml-2">
              <span className="font-semibold opacity-80">{user?.fullname}</span>{" "}
              <br />
              <span className="lowercase text-xs opacity-80">
                @{user?.email.split("@")[0]}
              </span>
            </p>
          </Button>
        ) : null}
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
        {/* end the profile section */}
      </div>
    </header>
  );
}
