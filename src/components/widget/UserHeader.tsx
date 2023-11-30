import { AppBar, Toolbar, Typography, useTheme, useMediaQuery } from "@mui/material";
import BurgerMenu from "./BurgerMenu";
import Navigation from "../common/Navigation";

function UserHeader() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position='static'>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant='h4' component='h1'>
          گیک‌شاپ
        </Typography>
        {isMobile ? <BurgerMenu /> : <Navigation color='white' layout='row' />}
      </Toolbar>
    </AppBar>
  );
}

export default UserHeader;
