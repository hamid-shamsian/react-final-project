import { useDispatch } from "react-redux";
import { List, Box, Typography, Switch } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import CustomNavLink from "./CustomNavLink";
import { themeActions } from "../../redux/features/themeSlice";
import useUser from "../../hooks/useUser";
import useTheme from "../../hooks/useTheme";

const staticLinks = [
  { title: "خانه", icon: <HomeIcon />, href: "/" },
  { title: "سبدخرید", icon: <ShoppingCartIcon />, href: "/cart" }
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
  const user = useUser();
  const theme = useTheme();

  const links = staticLinks.concat(!user ? loggedOutLinks : user.role === "ADMIN" ? adminLinks : userLinks);

  return (
    <Box sx={{ display: "flex", flexDirection: layout, alignItems: "center", gap: layout === "row" ? 10 : 2 }}>
      <Box sx={{ order: layout === "row" ? 0 : 1 }}>
        <Typography variant='caption'>حالت شب</Typography>
        <Switch checked={theme === "dark"} onChange={() => dispatch(themeActions.toggle())} />
      </Box>

      <List
        component='nav'
        sx={{
          display: "flex",
          flexDirection: layout,
          alignItems: layout === "row" ? "center" : "start",
          gap: 5,
          pl: layout === "row" ? 3 : 10,
          pr: layout === "row" ? 0 : 5,
          py: layout === "row" ? 0 : 5
        }}
      >
        {links.map((link, i) => (
          <CustomNavLink to={link.href} active='shadow' key={i} onClick={onItemClick}>
            <Box display='flex' alignItems='center' gap={1}>
              {link.icon}
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
