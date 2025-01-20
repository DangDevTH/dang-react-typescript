import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Login from "../auth/Login";
import Settings from "./Settings";
import { authenticatedVar, isLoadingVar } from "../../constants/all-makevar";
import { useReactiveVar } from "@apollo/client";
import { CircularProgress, ListItemButton } from "@mui/material";
import { ReactElement, useState } from "react";
import { Drawer, List, ListItemText } from "@mui/material";
type userType = {
  username?: string;
};

const Navbar = ({ username }: userType): ReactElement => {
  const aunthenticated = useReactiveVar(authenticatedVar);
  const isLoading = useReactiveVar(isLoadingVar);
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           DanG
          </Typography>
          {isLoading ? (
            <CircularProgress color="inherit" size={24} />
          ) : aunthenticated ? (
            <>
              {!username ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <>
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                      marginRight: 1,
                      display: { xs: "block", sm: "none" },
                    }}
                  >
                    @{username.slice(0, 6)}...
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                      marginRight: 1,
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    @{username}
                  </Typography>
                </>
              )}

              <Settings pathName={username!}/>
            </>
          ) : (
            <Login />
          )}
        </Toolbar>
      </AppBar>
      {/* Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={closeDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "50%", sm: "250px" },
          },
        }}
      >
        <Box
          sx={{ width: "100%", marginTop: 8 }}
          role="presentation"
          onClick={closeDrawer}
          onKeyDown={closeDrawer}
        >
          <List>
            <ListItemButton>
              <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Profile" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
      {/* Content Placeholder */}
      <Toolbar /> {/* This adds space below the AppBar */}
    </Box>
  );
};

export default Navbar;
