import { BottomNavigationAction, Box } from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useLocation, useNavigate } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import { useState, useEffect } from "react";



 enum BottomEnumType {
  PROFILE = "posts",
  REPOST = "repost",
  FAVORITE = "favorite",

}
const BottomMenu: React.FC<{ pathname: string | undefined }> = ({ pathname }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState<number>();
  const currentPath = location.pathname.split("/").pop() as BottomEnumType;

  useEffect(() => {
    if (currentPath === BottomEnumType.REPOST) {
      setValue(1);
    } else if (currentPath === BottomEnumType.FAVORITE) {
      setValue(2);
    } else {
      setValue(0);
    }
  }, [currentPath]);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-around", padding: 2 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
        }}
        sx={{ width: "100%" }}
      >
        <BottomNavigationAction
          label="Posts"
          icon={<PostAddIcon />}
          onClick={() => navigate(`/profile/${pathname}`)}
        />
        <BottomNavigationAction
          label="Reposts"
          icon={<RepeatIcon />}
          onClick={() => navigate(`/profile/${pathname}/repost`)}
        />
        <BottomNavigationAction
          label="Favorites"
          icon={<FavoriteIcon />}
          onClick={() => navigate(`/profile/${pathname}/favorite`)}
        />
      </BottomNavigation>
    </Box>
  );
};

export default BottomMenu;
