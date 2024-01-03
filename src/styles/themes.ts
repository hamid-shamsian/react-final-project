import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import "./fonts.css";

const light = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "IranianSans"
  },
  palette: {
    mode: "light",
    primary: {
      main: "#888" // "#556cd6"
    },
    secondary: {
      main: "#000" // "#19857b"
    },
    error: {
      main: red.A400
    }
  }
});

const dark = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "IranianSans"
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#556cd6"
    },
    secondary: {
      main: "#19857b"
    },
    error: {
      main: red.A400
    }
  }
});

interface Themes {
  light: object;
  dark: object;
  [key: string]: object;
}

const themes: Themes = { light, dark };

export default themes;
