import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { ContactMail, Person } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const menuData = [
  {
    title: "Home",
    url: "/",
    icon: <InboxIcon />,
  },

  {
    title: "About",
    url: "about",
    icon: <ContactMail />,
  },
  {
    title: "Profile",
    url: "profile",
    icon: <Person />,
  },
  {
    title: "Create Post",
    url: "createpost",
    icon: <Person />,
  },
  {
    title: "All Post",
    url: "allpost",
    icon: <Person />,
  },
];

const Sidebar = ({ isSidebarOpen, drawerWidth }) => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={isSidebarOpen}
    >
      <Box sx={{ paddingTop: "50px" }}>
        <List>
          {menuData.map((item, index) => {
            return (
              <ListItem
                component={NavLink}
                to={item.url}
                key={index}
                style={({ isActive }) => {
                  return {
                    backgroundColor: isActive ? "#6d1b7b" : "",
                    color: isActive ? "white" : "black",
                  };
                }}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <List />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
