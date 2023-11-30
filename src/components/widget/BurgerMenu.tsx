import { useState } from "react";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Navigation from "../common/Navigation";

function BurgerMenu() {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Navigation onItemClick={() => setOpenDrawer(false)} />
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon sx={{ fontSize: 50, color: "white" }} />
      </IconButton>
    </>
  );
}

export default BurgerMenu;
