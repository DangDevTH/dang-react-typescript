import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLoginAuthentication } from "../../hooks/useLogin";
import React from "react";

interface AuthProps {
  onLoginSuccess: () => void; 
}

const GoogleAuth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
  const { loginGoogle, error } = useGoogleLoginAuthentication();
  return (
      <GoogleLogin
        onSuccess={(response) => {
          loginGoogle(response);
          onLoginSuccess();
        }}
        onError={() => {
          console.error("Error logging in with Google:", error);
        }}
      />
  );
};

export default GoogleAuth;
