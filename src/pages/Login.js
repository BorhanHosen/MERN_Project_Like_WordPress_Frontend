import { Alert, Box, Button, Fab, TextField, Typography } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "../services/UserApi";
import { storeToken } from "../services/LocalStorageService";

const Login = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const [Login, { isSuccess }] = useLoginMutation();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    if (email && password) {
      const res = await Login({ email, password });
      console.log(res);
      storeToken(res.data.token);
      setError({
        status: true,
        msg: "Registration Successful",
        type: "success",
      });
      navigate("/profile");
    } else
      setError({ status: true, msg: "All Feilds Are Required", type: "error" });
  };
  return (
    <Box
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box sx={{ width: 300, p: 5, backgroundColor: "white" }}>
        <Typography
          sx={{ fontWeight: "bold", fontSize: 30, textAlign: "center" }}
        >
          Login
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          id="registration-form"
          onSubmit={handleSubmit}
        >
          <TextField
            required
            margin="normal"
            fullWidth
            name="email"
            label="Email Address"
          />
          <TextField
            required
            margin="normal"
            fullWidth
            type="password"
            name="password"
            label="Password"
          />

          <Box textAlign="center">
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, px: 5 }}
            >
              Login
            </Button>
          </Box>

          {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Fab variant="extended" color="secondary" href="register">
            Register
            <NavigationIcon sx={{ ml: 1, rotate: "90deg" }} />
          </Fab>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
