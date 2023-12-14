import { ReactElement } from "react";
import MuiModal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";

interface ModalProps {
  open: boolean;
  onClose?: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
  children: ReactElement;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: 2,
  boxShadow: 14,
  p: 4
};

const Modal = ({ open, onClose, children }: ModalProps) => {
  return (
    <MuiModal open={open} onClose={onClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500 } }}>
      <Fade in={open}>
        <Box sx={style}>{children}</Box>
      </Fade>
    </MuiModal>
  );
};

export default Modal;
