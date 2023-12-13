import { List, ListItem, ListItemText, Box, Typography, Switch } from "@mui/material";
import { useDispatch } from "react-redux";
import CustomNavLink from "./CustomNavLink";
import useUser from "../../hooks/useUser";
import useTheme from "../../hooks/useTheme";
import { themeActions } from "../../redux/features/themeSlice";

const staticLinks = [
  { name: "خانه", href: "/" },
  { name: "سبدخرید", href: "/cart" }
];

const loggedOutLinks = [
  { name: "ورود", href: "/login" },
  { name: "ثبت‌نام", href: "/signup" }
];

const userLinks = [
  { name: "پروفایل", href: "/profile" },
  { name: "خروج", href: "/logout" }
];

const adminLinks = [
  { name: "پنل‌مدیریت", href: "/admin" },
  { name: "خروج", href: "/logout" }
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

      <List component='nav' sx={{ display: "flex", flexDirection: layout, paddingLeft: layout === "row" ? 0 : 20 }}>
        {links.map((link, i) => (
          <ListItem key={i} onClick={onItemClick}>
            <CustomNavLink to={link.href} active='shadow'>
              <ListItemText primary={link.name} />
            </CustomNavLink>
          </ListItem>
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
