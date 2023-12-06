import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import "./fonts.css";

const theme = createTheme({
  // direction: "rtl",
  typography: {
    fontFamily: "IranianSans"
  },
  palette: {
    primary: {
      main: "#888" // "#556cd6"
    },
    secondary: {
      main: "#000" //"#19857b"
    },
    error: {
      main: red.A400
    }
  }
});

export default theme;
