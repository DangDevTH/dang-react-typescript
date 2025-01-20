
import { Box, Avatar, Typography, Button, Grid,  Divider } from "@mui/material";
import BottomMenu from "./layouts/BottomMenu";
import { Outlet, useParams } from "react-router-dom";
import { useGetUsername } from "../../hooks/useGetUsername";
import ErrorNotFound from "../error/ErrorNotFound";
import { ReactElement, useEffect, useState } from "react";
import { useReactiveVar } from "@apollo/client";
import { userIdVar } from "../../constants/all-makevar";
import FormUpdateProfile from "./layouts/FormUpdateProfile";

interface UserType {
  username: {
    id: string;
    name: string;
    username: string;
    profileImage?: string | null;
    backgroundImage?: string | null;
  };
}

const Profile = (): ReactElement => {
  const param = useParams();
  const { username } = param;
 
  if(!username) return <ErrorNotFound />;
  const {  data ,loading, error } = useGetUsername(username);
  const [userData, setUserData] = useState<UserType>();
  const userId = useReactiveVar(userIdVar);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleEditProfileClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };


  useEffect(() => {
    if(data){
      setUserData(data);
    }
  }, [data]);
  console.log(userId);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <ErrorNotFound />;
  }

  return (<>
    {data ? (
      <Box>
      {/* Profile Layout */}
      <Box sx={{ width: "100%", height: { xs: 500, md: 500 }, backgroundImage: `url(${userData?.username.backgroundImage ?? 'https://via.placeholder.com/500'})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
        <Avatar src={userData?.username.profileImage ?? "https://via.placeholder.com/150"} alt="Profile Picture" sx={{ width: 120, height: 120, border: "4px solid white", position: "absolute", bottom: -60, left: { xs: "50%", md: 40 }, transform: { xs: "translateX(-50%)", md: "none" } }} />
      </Box>
      {/* User Info */}
      <Box sx={{ marginTop: 8, padding: { xs: 2, md: 4 } }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h5">{data.username.name}</Typography>
            <Typography variant="body1" color="textSecondary">@{data.username.username}</Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: "center", md: "right" } }}>
            {userData?.username.id == userId ? (
               <Button variant="contained" onClick={handleEditProfileClick}>
               Edit Profile
             </Button>
            ):
              <Button variant="contained">Follow</Button>
            }
            
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" }, gap: 2, marginTop: 2 }}>
          <Typography variant="body2"><strong>150</strong> Followers</Typography>
          <Typography variant="body2"><strong>100</strong> Following</Typography>
        </Box>
      </Box>

      {/* Bottom Menu with Icons to Switch Content */}
      <BottomMenu pathname={username}/>
      
     <Divider sx={{ marginBottom: 2 }}/>
     <Outlet />
    </Box>
    ): <div>Not foud user</div>} 
    
    <FormUpdateProfile open={openModal} handleClose={handleCloseModal} />
    </>
    
  );
};

export default Profile;
