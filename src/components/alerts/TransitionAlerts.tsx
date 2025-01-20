import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

interface TransitionAlertsProps {
  message: string;
  severity: "error" | "warning" | "info" | "success";
  open: boolean;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

const TransitionAlerts: React.FC<TransitionAlertsProps> = ({
  message,
  severity,
  open,
  onClose,
  autoClose = true,
  duration = 3000,
}) => {
  useEffect(() => {
    if (open && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [open, autoClose, duration, onClose]);

  return (
    <Box sx={{
      position: 'fixed',
      bottom: 16,
      left: 16,
      zIndex: 1200,
    }}>
      <Collapse in={open}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={onClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
};

export default TransitionAlerts;
