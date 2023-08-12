import { useState } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const drawerWidth = 250;

const Main = styled("div")(({ theme, isSidebarOpen }) => ({
  backgroundColor: "skyblue",
  flexGrow: 1,
  marginLeft: `-${drawerWidth}px`,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(isSidebarOpen && {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    width: `calc(100% - ${drawerWidth}px)`,
  }),
}));

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Box>
          <Navbar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </Box>
        <Box sx={{ display: "flex", mt: "50px", flexGrow: 1 }}>
          <Box sx={{ display: "flex" }}>
            <Sidebar
              drawerWidth={drawerWidth}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </Box>
          <Main isSidebarOpen={isSidebarOpen}>
            <Outlet />
          </Main>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
