import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Avatar,
  Typography,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { useCreatePost } from "../../../hooks/useCreatePost";
import { useReactiveVar } from "@apollo/client";
import { userNameVar } from "../../../constants/all-makevar";


interface FormPostProps {
  userName: string;
  onClose: () => void;
  setAlert: React.Dispatch<React.SetStateAction<{ open: boolean; message: string; severity: "success" | "error" }>>;
}

const FormPost: React.FC<FormPostProps> = ({ userName, onClose, setAlert }) => {
  const [content, setContent] = useState("");
  const [featuredImageUrl, setImage] = useState<File | null>(null);
  const locationUsername = useReactiveVar(userNameVar);
  const [createPost, { loading }] = useCreatePost(locationUsername);
  const [error, setError] = useState<string | null>(null);

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      await createPost({
        variables: {
          createPostInputDto: { content, featuredImageUrl: null },
        },
      });

      setAlert({
        open: true,
        message: 'Post created successfully!',
        severity: 'success',
      });
      setContent('');
      onClose();
    } catch (error) {
      if(error instanceof Error) {
        setError(error.message);
        return;
      }
      setAlert({
        open: true,
        message: 'Failed to create post!',
        severity: 'error',
      });
    }
  };

  return (
    <Card sx={{ width: "100%", position: "relative" }}>
      <IconButton
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 10,
        }}
        onClick={onClose}
        disabled={loading}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2 }}>
          <Avatar>{userName[0]?.toUpperCase()}</Avatar>
          <Typography sx={{ fontSize: "95%" }}>{userName}</Typography>
        </Box>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <TextField
            label="What's on your mind?"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={content}
            disabled={loading}
            onChange={handleContentChange}
            inputProps={{
              pattern: "[A-Za-z0-9\u0E00-\u0E7F\\s]*",
              title: "กรุณากรอกเฉพาะตัวอักษรภาษาไทย ภาษาอังกฤษ ตัวเลข หรือช่องว่าง",
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <input
                accept="image/*"
                id="upload-image"
                type="file"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <label htmlFor="upload-image">
                <IconButton color="primary" component="span"  disabled={loading}>
                  <ImageIcon />
                </IconButton>
              </label>
              {featuredImageUrl && (
                <Typography variant="caption" color="text.secondary">
                  {featuredImageUrl.name}
                </Typography>
              )}
            </Box>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              type="submit"
              disabled={!content.trim() && !featuredImageUrl || loading}
            >
              {loading ? 'Posting...' : 'Post'}
            </Button>
          </Box>
          {error && (
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 0 }}>
              <Typography color="error" variant="caption" sx={{ fontSize: "0.8rem" }}>
                {error}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default FormPost;
