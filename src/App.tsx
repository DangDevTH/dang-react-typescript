import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client from "./constants/apollo-client";
import Guard from "./components/auth/Guard";
import { authenticatedVar } from "./constants/all-makevar";
import { ProtectedRouter, PublicRouter } from "./components/Routes";
import { GoogleOAuthProvider } from "@react-oauth/google";




const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#907514',
      },
    },
  });
  
  const isAuthenticated = useReactiveVar(authenticatedVar);
  console.log("App.tsx:", isAuthenticated);
  return (
    <ApolloProvider client={client}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ThemeProvider  theme={theme}>
      <CssBaseline />
      <Container>
          <Guard>
              <RouterProvider router={isAuthenticated ? ProtectedRouter : PublicRouter } />
          </Guard>
      </Container>
    </ThemeProvider>
    </GoogleOAuthProvider>
    </ApolloProvider>
  );
};

export default App;