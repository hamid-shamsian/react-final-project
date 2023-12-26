import { ReactNode } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";

interface FlexContainerProps {
  children: ReactNode;
  align?: "responsive" | "center";
}

const FlexContainer = ({ children, align = "responsive" }: FlexContainerProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        flexWrap: "wrap",
        gap: 2,

        ...(align === "responsive" && {
          [theme.breakpoints.up("md")]: {
            justifyContent: "end"
          }
        })
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
