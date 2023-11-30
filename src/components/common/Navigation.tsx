import { styled } from "@mui/material/styles";
import { List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const links = [
  { name: "خانه", href: "/" },
  { name: "سبدخرید", href: "/cart" },
  { name: "ورود", href: "/login" },
  { name: "ثبت‌نام", href: "/signup" }
];

interface Props {
  onItemClick?: () => void;
  color?: string;
  layout?: string;
}

const Navigation = ({ onItemClick, color, layout = "column" }: Props) => {
  const NavLink = styled(Link)({
    textDecoration: "none",
    color
  });

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
