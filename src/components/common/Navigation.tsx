import { useSelector } from "react-redux";
import { List, ListItem, ListItemText } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CustomNavLink from "./CustomNavLink";

const staticLinks = [
  { name: "خانه", href: "/" },
  { name: "سبدخرید", href: "/cart" }
];

const loggedInLinks = [
  { name: "پروفایل", href: "/profile" },
  { name: "خروج", href: "/logout" }
];
const loggedOutLinks = [
  { name: "ورود", href: "/login" },
  { name: "ثبت‌نام", href: "/signup" }
];

interface NavigationProps {
  onItemClick?: () => void;
  layout?: "column" | "row";
}

const Navigation = ({ onItemClick, layout = "column" }: NavigationProps) => {
  const user = useSelector((state: any) => state.user);

  const links = staticLinks.concat(user ? loggedInLinks : loggedOutLinks);

  return (
    <Box sx={{ display: "flex", flexDirection: layout, alignItems: "center", gap: 10 }}>
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
