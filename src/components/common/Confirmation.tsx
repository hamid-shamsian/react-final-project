import { ReactElement } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface ConfirmationProps {
  message: string | ReactElement;
  confirmTerm: string;
  onConfirm: (id?: any) => void;
  onCancel: () => void;
}

const Confirmation = ({ message, confirmTerm = "تایید", onConfirm, onCancel }: ConfirmationProps) => {
  return (
    <div>
      <Typography sx={{ mb: 4 }}>{message}</Typography>

      <Button variant='contained' color='error' onClick={onConfirm}>
        {confirmTerm}
      </Button>
      <Button variant='outlined' sx={{ ml: 2 }} onClick={onCancel}>
        انصراف
      </Button>
    </div>
  );
};

export default Confirmation;
