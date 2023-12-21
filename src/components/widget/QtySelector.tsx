import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";
import { farsify } from "../../utils/utilityFuncs";

interface QtySelectorProps {
  qty: number;
  onChange: (qty: number) => void;
  max: number;
}

const QtySelector = ({ qty, onChange, max }: QtySelectorProps) => {
  const handleIncrement = () => {
    onChange(Math.min(qty + 1, max));
  };

  const handleDecrement = () => {
    onChange(Math.max(qty - 1, 1));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <IconButton onClick={handleDecrement} disabled={qty === 1}>
        <RemoveIcon />
      </IconButton>

      <Typography
        sx={{
          width: "50px",
          textAlign: "center",
          fontWeight: "bold",
          border: "1px solid #999",
          borderRadius: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mx: 1
        }}
      >
        {farsify(qty)}
      </Typography>

      <IconButton onClick={handleIncrement} disabled={qty === max}>
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default QtySelector;
