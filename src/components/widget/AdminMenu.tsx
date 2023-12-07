import { useState, ReactNode } from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import SettingsIcon from "@mui/icons-material/Settings";
import StoreIcon from "@mui/icons-material/Store";
import CustomNavLink from "./../common/CustomNavLink";

const drawerWidth = 230;

const primaryMenuItems = [
  {
    title: "خانه",
    to: "/admin",
    icon: <HomeIcon />
  },
  {
    title: "سفارشات",
    to: "orders",
    icon: <LocalMallIcon />
  },
  {
    title: "موجودی و قیمت",
    to: "stock",
    icon: <InventoryIcon />
  },
  {
    title: "محصولات",
    to: "products",
    icon: <LocalOfferIcon />
  }
];

const secondaryMenuItems = [
  {
    title: "فروشگاه",
    to: "/",
    icon: <StoreIcon />
  },
  {
    title: "مشتریان",
    to: "customers",
    icon: <FolderSharedIcon />
  },
  {
    title: "تنظیمات",
    to: "settings",
    icon: <SettingsIcon />
  }
];

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== "open"
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginRight: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== "open" })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
  })
}));

interface AdminMenuProps {
  children: ReactNode;
}

const AdminMenu = ({ children }: AdminMenuProps) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position='fixed' open={open}>
        <Toolbar sx={{ display: "flex", justifyContent: open ? "flex-end" : "space-between" }}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='end'
            sx={{ marginLeft: 0, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='h1'>
            پنل مدیریت
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant='permanent' open={open} anchor='right'>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
        </DrawerHeader>

        {/* <Divider /> */}

        <List component='nav'>
          {primaryMenuItems.map((item, i) => (
            <ListItem key={i} disablePadding sx={{ display: "block", color: "inherit" }} component={CustomNavLink} to={item.to} end>
              <ListItemButton sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5 }}>
                <ListItemIcon sx={{ minWidth: 0, ml: open ? 3 : "auto", justifyContent: "center" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0, textAlign: "right" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        <List component='nav'>
          {secondaryMenuItems.map((item, i) => (
            <ListItem key={i} disablePadding sx={{ display: "block", color: "inherit" }} component={CustomNavLink} to={item.to}>
              <ListItemButton sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5 }}>
                <ListItemIcon sx={{ minWidth: 0, ml: open ? 3 : "auto", justifyContent: "center" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0, textAlign: "right" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default AdminMenu;
