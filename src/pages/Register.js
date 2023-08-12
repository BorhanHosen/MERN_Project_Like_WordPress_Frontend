import { Alert, Box, Button, Fab, TextField, Typography } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../services/UserApi";
import { storeToken } from "../services/LocalStorageService";

const Register = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const navigate = useNavigate();
  const [Register, { isSuccess }] = useRegisterMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const fullName = data.get("fullName");
    const email = data.get("email");
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");

    if (fullName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const res = await Register({
          fullName,
          email,
          password,
          confirmPassword,
        });
        console.log(res);
        storeToken(res.data.token);
        setError({
          status: true,
          msg: "Registration Succesful",
          type: "success",
        });
        navigate("/profile");
      } else {
        setError({
          status: true,
          msg: "password and Confirm Password Doesn't Match.",
          type: "error",
        });
      }
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
          Register
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
            name="fullName"
            label="Full Name"
          />
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

          <TextField
            required
            margin="normal"
            fullWidth
            name="confirmPassword"
            type="password"
            label="Confirm Password"
          />

          <Box textAlign="center">
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, px: 5 }}
            >
              Register
            </Button>
          </Box>
          {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Fab variant="extended" color="secondary" href="login">
            Login
            <NavigationIcon sx={{ ml: 1, rotate: "90deg" }} />
          </Fab>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
