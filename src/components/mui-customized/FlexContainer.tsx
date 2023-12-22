import { ReactNode } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";

const FlexContainer = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        flexWrap: "wrap",
        gap: 2,

        [theme.breakpoints.up("md")]: {
          justifyContent: "end"
        }
        // padding: 3,
        // borderRadius: 2,
        // backgroundColor: theme.palette.background.paper
      }}
    >
      {children}
    </Box>
  );
};

export default FlexContainer;
