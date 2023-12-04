import { Link } from "react-router-dom";
import { styled, Theme } from "@mui/material/styles";

interface CustomLinkProps {
  theme?: Theme;
  decor?: "none" | "underline";
  colors?: {
    light: string;
    dark: string;
  };
}

const CustomLink = styled(Link)<CustomLinkProps>(({ theme, decor = "none", colors }) => ({
  textDecoration: decor,
  color: colors ? (theme?.palette.mode === "light" ? colors.light : colors.dark) : "inherit"
}));

export default CustomLink;
