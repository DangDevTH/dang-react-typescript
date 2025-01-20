import React, { useState } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GoogleAuth from './GoogleAuth';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 400 },
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};
const Login: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Login
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box sx={style}>
          <Button
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              minWidth: 0,
              padding: 0.5,
            }}
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </Button>

          <Typography id="modal-title" variant="h6" component="h2">
            Login with Google
          </Typography>
          <Box sx={{ mt: 2 }}>
            <GoogleAuth onLoginSuccess={handleClose}/>
          </Box>
          <Typography id="modal-description" sx={{ mt: 2 }}>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Login;
