import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const RTLTextField = styled(TextField)({
  "& label": {
    transformOrigin: "right !important",
    left: "inherit !important",
    right: "1.75rem !important",
    overflow: "unset"
  },
  "& legend": { textAlign: "right" }
});

export default RTLTextField;
