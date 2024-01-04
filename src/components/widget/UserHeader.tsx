import { AppBar, Toolbar, Typography, useTheme, useMediaQuery } from "@mui/material";
import BurgerMenu from "./BurgerMenu";
import Navigation from "../common/Navigation";
import LoadingSpinner from "../common/LoadingSpinner";
import useAuth from "../../hooks/useAuth";

function UserHeader() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isPending } = useAuth();

  return (
    <AppBar position='sticky'>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant='h4' component='h1'>
          گیک‌شاپ
        </Typography>
        {isPending ? <LoadingSpinner /> : isMobile ? <BurgerMenu /> : <Navigation layout='row' />}
      </Toolbar>
    </AppBar>
  );
}

export default UserHeader;
