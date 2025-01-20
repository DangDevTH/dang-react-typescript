import { useState } from "react";
import { PropsWithChildren, ReactNode } from "react";
import Navbar from "../header/Navbar";
import { Box, Fab, Modal, Backdrop, Fade } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useReactiveVar } from "@apollo/client";
import { authenticatedVar } from "../../constants/all-makevar";
import FormPost from "../profile/layouts/FormPost";
import TransitionAlerts from "../alerts/TransitionAlerts";

type User = {
  me: {
    username: string;
    id: string;
  };
};

type BodyProps = PropsWithChildren<{ data: User | undefined }>;

const Body = ({ data, children }: BodyProps): ReactNode => {
  const authenticated = useReactiveVar(authenticatedVar);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Navbar username={data?.me.username} />
      <Box sx={{ p: 3 }}>{children}</Box>

      {authenticated ? (
        <>
          <Fab
            color="primary"
            aria-label="edit"
            onClick={handleOpen}
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
              zIndex: 1000,
              "& .MuiFab-iconSizeSmall": {
                fontSize: "1.2rem",
              },
              "@media (max-width:600px)": {
                fontSize: "0.9rem",
                width: 40,
                height: 40,
                "& .MuiFab-iconSizeSmall": {
                  fontSize: "0.8rem",
                },
              },
            }}
          >
            <EditIcon />
          </Fab>

          <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "100%",
                  maxWidth: 500,
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  borderRadius: 2,
                }}
              >
                <FormPost
                  userName={data?.me.username!}
                  onClose={handleClose}
                  setAlert={setAlert}
                />
              </Box>
            </Fade>
          </Modal>

          {/* แสดงการแจ้งเตือนในตำแหน่งล่างซ้าย */}
          <TransitionAlerts
            message={alert.message}
            severity={alert.severity}
            open={alert.open}
            onClose={() => setAlert({ ...alert, open: false })}
          />
        </>
      ) : null}
    </>
  );
};

export default Body;
