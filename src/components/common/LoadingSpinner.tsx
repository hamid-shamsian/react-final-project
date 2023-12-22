import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoadingSpinner = ({ size, mt, mb }: { size?: number; mt?: number; mb?: number }) => {
  return (
    <Box sx={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center", mt, mb }}>
      <CircularProgress size={size ?? 40} />
    </Box>
  );
};

export default LoadingSpinner;
