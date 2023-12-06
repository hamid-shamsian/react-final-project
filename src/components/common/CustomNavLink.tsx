import { NavLink } from "react-router-dom";
import { styled, Theme } from "@mui/material/styles";

interface CustomNavLinkProps {
  theme?: Theme;
  active?: "bg" | "shadow";
  colors?: {
    light: string;
    dark: string;
  };
}

const CustomNavLink = styled(NavLink)<CustomNavLinkProps>(({ theme, colors, active = "bg" }) => ({
  textDecoration: "none",
  color: colors ? (theme?.palette.mode === "light" ? colors.light : colors.dark) : "inherit",
  "&.active": {
    ...(active === "bg" && { backgroundColor: theme?.palette.mode === "light" ? "lightgray" : "#444" }),
    ...(active === "shadow" && { color: theme?.palette.mode === "light" ? "#000" : "#bbb", textShadow: "0 0 2px black" })
  }
}));

export default CustomNavLink;
