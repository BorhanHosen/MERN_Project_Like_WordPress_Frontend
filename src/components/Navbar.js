import { NavLink, useNavigate } from "react-router-dom";
import { AppBar, Box, Button, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { removeToken } from "../services/LocalStorageService";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    removeToken("token");
    navigate("/");
  };

  return (
    <AppBar
      sx={{
        height: 50,
        display: "flex",
        alignContent: "center",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mx: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            to="/"
            component={NavLink}
            sx={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
            }}
          >
            RB's Coding
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            my: "6px",
          }}
        >
          <Button
            component={NavLink}
            to="/"
            sx={{ ml: 1 }}
            variant="filled"
            style={({ isActive }) => {
              return { backgroundColor: isActive ? "#6d1b7b" : "#24747c" };
            }}
          >
            Home
          </Button>
          <Button
            component={NavLink}
            to="/about"
            sx={{ ml: 1 }}
            variant="filled"
            style={({ isActive }) => {
              return { backgroundColor: isActive ? "#6d1b7b" : "#24747c" };
            }}
          >
            About
          </Button>
          <Button
            component={NavLink}
            to="/login"
            sx={{ ml: 1 }}
            variant="filled"
            style={({ isActive }) => {
              return { backgroundColor: isActive ? "#6d1b7b" : "#24747c" };
            }}
          >
            Login
          </Button>
          <Button
            to="/login"
            onClick={handleLogout}
            color="error"
            sx={{ ml: 1 }}
            variant="filled"
          >
            Logout
          </Button>
        </Box>
      </Box>
    </AppBar>
  );
};

export default Navbar;
