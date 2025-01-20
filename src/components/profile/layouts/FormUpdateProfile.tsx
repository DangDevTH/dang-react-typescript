import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  IconButton,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useUpdateProfile } from "../../../hooks/useUpdateProfile";
import TransitionAlerts from "../../alerts/TransitionAlerts";
// Styled components
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const FormUpdateProfile = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [name, setName] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [profileUpload, setProfileUpload] = useState<File | null>(null);
  const [backgroundUpload, setBackgroundUpload] = useState<File | null>(null);

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const [updateUser, { loading }] = useUpdateProfile();
  const theme = useTheme();
  console.log('username', typeof(username))
  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setProfileUpload(file);
      return () => URL.revokeObjectURL(imageUrl);
    }
  };

  // Handle background image upload
  const handleBackgroundImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setBackgroundImage(imageUrl);
      setBackgroundUpload(file);
      return () => URL.revokeObjectURL(imageUrl);
    }
  };

  // Remove images
  const handleRemoveProfileImage = () => {
    setProfileImage(null);
    setProfileUpload(null);
  };

  const handleRemoveBackgroundImage = () => {
    setBackgroundImage(null);
    setBackgroundUpload(null);
  };

  // Save changes
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const updateUserInput = { 
      name: name ?? null ,
      username: username ?? null,
    };

    const uploadUserImagesInputDto = {
      profileImage: profileUpload ?? null,
      backgroundImage: backgroundUpload ?? null,
    };

    try {
      handleClose();
      await updateUser({
        variables: {
          updateUserInput,
          uploadUserImagesInputDto,
        },
      });
      setAlert({
        open: true,
        message: "Profile updated successfully!",
        severity: "success",
      });
    
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error updating profile:", error.message);
      }
    }
  };

  useEffect(() => {
    if (open !== true) {
      setName(null);
      setUsername(null);
      setProfileImage(null);
      setBackgroundImage(null);
      setProfileUpload(null);
      setBackgroundUpload(null);
    }
  }, [open]);

  return (
    <>
         {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1300,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: 200, md: 300 },
            backgroundImage: backgroundImage
              ? `url(${backgroundImage})`
              : `url('https://via.placeholder.com/500')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {!backgroundImage && (
            <IconButton
              component="label"
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
              }}
            >
              <UploadIcon />
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={handleBackgroundImageChange}
              />
            </IconButton>
          )}
          {backgroundImage && (
            <IconButton
              onClick={handleRemoveBackgroundImage}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}

          {/* Profile Avatar */}
          <Box
            sx={{
              position: "absolute",
              bottom: -60,
              left: "10%",
              transform: "translateX(-10%)",
            }}
          >
            <Avatar
              src={profileImage || ""}
              sx={{ width: 120, height: 120, border: "4px solid white" }}
            >
              {!profileImage && (
                <IconButton
                  component="label"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                  }}
                >
                  <UploadIcon />
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                  />
                </IconButton>
              )}
            </Avatar>
            {profileImage && (
              <IconButton
                onClick={handleRemoveProfileImage}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        </Box>

        <DialogTitle
          sx={{
            right: 16,
            top: 16,
            textAlign: "right",
            width: "100%",
            [theme.breakpoints.down("sm")]: {
              right: 8,
              fontSize: "1rem",
            },
          }}
        >
          Edit Profile
        </DialogTitle>
        <form onSubmit={handleSave}>
          <DialogContent>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={loading} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary" disabled={(!name && !username && !profileUpload && !backgroundUpload) || loading}>
              {loading ? "Updating..." : "Update"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <TransitionAlerts
        message={alert.message}
        severity={alert.severity}
        open={alert.open}
        onClose={() => setAlert({ ...alert, open: false })}
      />
    </>
  );
};

export default FormUpdateProfile;
