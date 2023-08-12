import { Box, Typography } from "@mui/material";

const About = () => {
  return (
    <Box
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography
        sx={{ fontWeight: "bold", fontSize: 100, textAlign: "center" }}
      >
        About
      </Typography>
    </Box>
  );
};

export default About;
