import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoadingSpinner = () => {
  return (
    <Box sx={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}>
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;
