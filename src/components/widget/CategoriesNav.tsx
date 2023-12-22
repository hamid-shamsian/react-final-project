import { Fragment, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import { ListItemProps } from "@mui/material/ListItem";
import CustomNavLink from "../common/CustomNavLink";
import { Category } from "../../services/catService";

interface CategoriesNavProps {
  categories: Category[];
}

interface ListItemLinkProps extends ListItemProps {
  to: string;
  name: string;
  open?: boolean;
  index?: number;
}

const CategoriesNav = ({ categories }: CategoriesNavProps) => {
  const [opens, setOpens] = useState<boolean[]>([]);

  useEffect(() => {
    setOpens(categories.map(_ => Boolean(false)));
  }, [categories]);

  const handleClick = (i: number) => setOpens(prevOpens => prevOpens.map((o, index) => (index === i ? !o : o)));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: 230 }}>
      <Box
        sx={{
          bgcolor: "background.paper",
          mt: 1
        }}
        component='nav'
      >
        <List>
          {categories.map((cat, i) => (
            <Fragment key={i}>
              <ListItemLink to={`/categories/${cat.slugname}`} name={cat.name} open={opens[i]} index={i} />
              <Collapse component='li' in={opens[i]} timeout='auto' unmountOnExit>
                <List disablePadding>
                  {cat.subcategories?.map((subCat, j) => (
                    <ListItemLink key={`${i}${j}`} to={`/categories/${cat.slugname}/${subCat.slugname}`} name={subCat.name} sx={{ pr: 5 }} />
                  ))}
                </List>
              </Collapse>
            </Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );

  function ListItemLink({ to, open, name, index, ...other }: ListItemLinkProps) {
    let icon = null;
    if (open != null) {
      icon = open ? <ExpandLess /> : <ExpandMore />;
    }

    return (
      <li>
        <ListItemButton component={CustomNavLink} to={to} {...other}>
          <ListItemText primary={name} sx={{ textAlign: "right" }} />
          <IconButton
            onClick={e => {
              e.preventDefault();
              index != null && handleClick(index);
            }}
          >
            {icon}
          </IconButton>
        </ListItemButton>
      </li>
    );
  }
};

export default CategoriesNav;
