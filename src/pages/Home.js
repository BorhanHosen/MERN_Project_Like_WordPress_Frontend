import { Box, Typography } from "@mui/material";

const Home = () => {
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
        Home
      </Typography>
    </Box>
  );
};

export default Home;
