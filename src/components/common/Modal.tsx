import { ReactElement } from "react";
import { styled } from "@mui/material/styles";
import MuiModal from "@mui/material/Modal";
import MuiBackdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import MuiBox from "@mui/material/Box";

interface ModalProps {
  open: boolean;
  onClose?: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
  children: ReactElement;
}

const Box = styled(MuiBox)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: theme.palette.background.paper,
  border: "2px solid " + (theme.palette.mode === "light" ? "#000" : "#fff"),
  borderRadius: 7,
  boxShadow: "0 0 5px #000",
  padding: 25
}));

const Backdrop = styled(MuiBackdrop)({
  backdropFilter: "blur(10px)"
});

const Modal = ({ open, onClose, children }: ModalProps) => {
  return (
    <MuiModal open={open} onClose={onClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500 } }}>
      <Fade in={open}>
        <Box>{children}</Box>
      </Fade>
    </MuiModal>
  );
};

export default Modal;
