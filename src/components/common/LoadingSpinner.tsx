import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoadingSpinner = ({ size, mt }: { size?: number; mt?: number }) => {
  return (
    <Box sx={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center", mt }}>
      <CircularProgress size={size ?? 40} />
    </Box>
  );
};

export default LoadingSpinner;
