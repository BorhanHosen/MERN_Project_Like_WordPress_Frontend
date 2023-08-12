import { Box, Button } from "@mui/material";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import {
  useGetUserQuery,
  useUpdateProfilePicMutation,
} from "../services/UserApi";
import { getToken } from "../services/LocalStorageService";

export default function UpdateProfilePic({ openPopover, setOpenPopover }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedName, setSelectedName] = useState("No file selected...");
  const token = getToken();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedName(file.name);
    // Additional validation logic
  };
  const { data, refetch } = useGetUserQuery(token);
  const [UpdateProfilePic] = useUpdateProfilePicMutation();
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("ProfilePic", selectedFile);
    const res = await UpdateProfilePic({ token, formData });
    refetch();
    setOpenPopover(!openPopover);
    alert(res.data.message);
  };

  const open = Boolean(openPopover);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <Popover
        open={openPopover}
        onClose={() => setOpenPopover(false)}
        id={id}
        anchorEl={openPopover}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Box sx={{ p: 2, width: 400, height: 200 }}>
          <Typography
            sx={{ textAlign: "center", fontWeight: "bold", fontSize: "25px" }}
          >
            Update Profile Picture
          </Typography>
          <Box
            component="form"
            onSubmit={handleUpdate}
            encType="multipart/form-data"
          >
            <input
              className="UpdateProfilePicInput"
              type="file"
              onChange={handleFileChange}
              id="UpdateProfilePicInput"
              name="ProfilePic"
            />
            <div className="input">
              <label className="inputButton" htmlFor="UpdateProfilePicInput">
                Select File
              </label>
              <label htmlFor="UpdateProfilePicInput" className="inputLabel">
                {selectedName}
              </label>
            </div>
            <Box
              sx={{
                height: "50%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                gap: 2,
              }}
            >
              <Button
                variant="contained"
                onClick={(prev) => {
                  setOpenPopover(!prev);
                }}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Update
              </Button>
            </Box>
          </Box>
        </Box>
      </Popover>
    </div>
  );
}
