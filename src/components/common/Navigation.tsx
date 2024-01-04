import { useDispatch } from "react-redux";
import { List, Box, Typography, Badge } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import CustomNavLink from "./CustomNavLink";
import ThemeModeSwitch from "../mui-customized/ThemeModeSwitch";
import useAuth from "../../hooks/useAuth";
import useThemeMode from "../../hooks/useThemeMode";
import useCart from "../../hooks/useCart";
import { themeModeActions } from "../../redux/features/themeModeSlice";
import { CartItem } from "../../redux/features/cartSlice";
import { farsify } from "../../utils/utilityFuncs";

const staticLinks = [
  { title: "خانه", icon: <HomeIcon />, href: "/" },
  {
    title: "سبدخرید",
    content: (cart: CartItem[]) => (
      <Badge color='info' badgeContent={cart.length && farsify(cart.length)}>
        <ShoppingCartIcon />
      </Badge>
    ),
    href: "/cart"
  }
];

const loggedOutLinks = [
  { title: "ورود", icon: <LoginIcon />, href: "/login" },
  { title: "عضویت", icon: <PersonAddAltIcon />, href: "/signup" }
];

const userLinks = [
  { title: "پروفایل", icon: <AccountCircleIcon />, href: "/profile" },
  { title: "خروج", icon: <LogoutIcon />, href: "/logout" }
];

const adminLinks = [
  { title: "مدیریت", icon: <DashboardIcon />, href: "/admin" },
  { title: "خروج", icon: <LogoutIcon />, href: "/logout" }
];

interface NavigationProps {
  onItemClick?: () => void;
  layout?: "column" | "row";
}

const Navigation = ({ onItemClick, layout = "column" }: NavigationProps) => {
  const dispatch = useDispatch();
  const themeMode = useThemeMode();
  const cart = useCart();
  const { user } = useAuth();

  const links = staticLinks.concat(!user ? loggedOutLinks : user.role === "ADMIN" ? adminLinks : userLinks);

  return (
    <Box sx={{ display: "flex", flexDirection: layout, alignItems: "center", gap: layout === "row" ? 10 : 2 }}>
      <ThemeModeSwitch checked={themeMode === "dark"} onChange={() => dispatch(themeModeActions.toggle())} sx={{ order: layout === "row" ? 0 : 1 }} />

      <List
        component='nav'
        sx={{
          display: "flex",
          flexDirection: layout,
          alignItems: layout === "row" ? "center" : "start",
          gap: 5,
          pr: layout === "row" ? 3 : 10,
          pl: layout === "row" ? 0 : 5,
          py: layout === "row" ? 0 : 5
        }}
      >
        {links.map((link, i) => (
          <CustomNavLink to={link.href} active='shadow' key={i} onClick={onItemClick}>
            <Box display='flex' alignItems='center' gap={1}>
              {link.icon ?? link.content(cart)}
              {link.title}
            </Box>
          </CustomNavLink>
        ))}
      </List>

      {user && (
        <Typography order={layout === "column" ? -1 : 0} padding={layout === "column" ? "20px 50px" : 0}>
          سلام {user.firstname} {user.lastname}!
        </Typography>
      )}
    </Box>
  );
};

export default Navigation;
