import { ReactNode } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";

const StyledSection = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();

  return (
    <Box
      component='section'
      sx={{
        mx: 1,
        my: 4,
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 3,
        backgroundColor: "divider",

        [theme.breakpoints.up("md")]: {
          flexDirection: "row",
          justifyContent: "space-between",
          m: 5
        }
      }}
    >
      {children}
    </Box>
  );
};

export default StyledSection;
