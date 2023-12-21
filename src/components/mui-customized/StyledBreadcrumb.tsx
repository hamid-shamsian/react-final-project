import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor = theme.palette.mode === "light" ? theme.palette.grey[300] : theme.palette.grey[800];
  return {
    cursor: "pointer",
    backgroundColor,
    height: theme.spacing(4),
    color: theme.palette.text.primary,
    fontWeight: "900",
    fontSize: 15,

    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.16)
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12)
    }
  };
}) as typeof Chip;

export default StyledBreadcrumb;
