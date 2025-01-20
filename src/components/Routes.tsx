import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Profile from "./profile/Profile";
import Posts from "./profile/contents/Posts";
import Reposts from "./profile/contents/Reposts";
import Favorities from "./profile/contents/Favorities";

const PublicRouter = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "*",
        element: <div>Eerror</div>,
    },
]);

const ProtectedRouter = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
       path: '/profile/:username',
       element: <Profile />,
       children: [
        {
          path: "",
          element: <Posts/>,
        },
        {
          path: "repost",
          element: <Reposts />, 
        },
        {
          path: "favorite",
          element: <Favorities />, 
        },
      ],  
    },
    {
        path: "*",
        element: <div>Eerror</div>,
    },
]);

export { PublicRouter, ProtectedRouter };
