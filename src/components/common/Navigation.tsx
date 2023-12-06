import { useSelector } from "react-redux";
import { List, ListItem, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";

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

interface Props {
  onItemClick?: () => void;
  color?: string;
  layout?: string;
}

const Navigation = ({ onItemClick, layout = "column" }: Props) => {
  const user = useSelector((state: any) => state.auth);

  const links = staticLinks.concat(user ? loggedInLinks : loggedOutLinks);

  return (
    <List component='nav' sx={{ display: "flex", flexDirection: layout, paddingLeft: layout === "row" ? 0 : 10 }}>
      {links.map((link, i) => (
        <ListItem key={i} onClick={onItemClick}>
          <NavLink to={link.href}>
            <ListItemText primary={link.name} />
          </NavLink>
        </ListItem>
      ))}
    </List>
  );
};

export default Navigation;
