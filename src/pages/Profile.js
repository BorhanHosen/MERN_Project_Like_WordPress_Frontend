import {
  Avatar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useGetUserQuery } from "../services/UserApi";
import { getToken } from "../services/LocalStorageService";
import { useEffect, useState } from "react";
import UpdateProfilePic from "../components/UpdateProfilePic";

const Profile = () => {
  const [openPopover, setOpenPopover] = useState(false);
  const token = getToken();
  const { data, isSuccess } = useGetUserQuery(token);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    active: "",
    role: "",
    photoURL: "",
  });
  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        fullName: data.UserProfile.fullName,
        email: data.UserProfile.email,
        active: data.UserProfile.active,
        role: data.UserProfile.role,
        photoURL: data.UserProfile.photoURL,
      });
    }
  }, [data, isSuccess]);
  const handlePopover = (e) => {
    setOpenPopover(e.currentTarget);
  };

  return (
    <Box
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box sx={{ width: 400, p: 5, backgroundColor: "white" }}>
        <Typography
          sx={{ fontWeight: "bold", fontSize: 30, textAlign: "center" }}
        >
          Profile
        </Typography>
        <UpdateProfilePic
          openPopover={openPopover}
          setOpenPopover={setOpenPopover}
        />
        <Box display="flex" justifyContent="center" my={2}>
          <Tooltip title="Update" placement="right">
            <Avatar
              sx={{ width: 100, height: 100, cursor: "pointer" }}
              alt={userData.fullName}
              src={userData.photoURL}
              onClick={handlePopover}
            />
          </Tooltip>
        </Box>
        <Box display="flex" justifyContent="center">
          <Table size="small" sx={{ maxWidth: 350, bgcolor: "#bbb" }}>
            <TableBody>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell align="left">:</TableCell>
                <TableCell align="left">{userData.fullName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell align="left">:</TableCell>
                <TableCell align="left">{userData.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Role</TableCell>
                <TableCell align="left">:</TableCell>
                <TableCell align="left">{userData.role}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell align="left">:</TableCell>
                <TableCell align="left">
                  {userData.active.toString().charAt(0).toUpperCase() +
                    userData.active.toString().slice(1)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
