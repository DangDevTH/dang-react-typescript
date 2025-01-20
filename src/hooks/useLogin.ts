import { CredentialResponse } from "@react-oauth/google";
import { useState } from "react";
import { API_URL } from "../constants/urls";
import client from "../constants/apollo-client";
import Cookies from "js-cookie";
import { UNKNOWN_ERROR_MESSAGE } from "../constants/errors";
import { authenticatedVar } from "../constants/all-makevar";

const useGoogleLoginAuthentication = () => {
  const [error, setError] = useState<string>('');

  const GoogleAuth = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/google-authentication`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
  
      if (!response.ok) {
        setError("Failed to authenticate with Google.");
        return;
      }
  
      const { accessToken } = await response.json();
  
      if (!accessToken) {
        setError("Failed to authenticate with Google.");
        return;
      }
      
      Cookies.set(import.meta.env.VITE_COOKIE_NAME, accessToken);
      authenticatedVar(true);

    } catch (err) {
      setError("Error fetching data from API");
      return;
    }
  };
  

  const loginGoogle = async (response: CredentialResponse) => {
    if (!response.credential) {
      setError("Credentials are not valid.");
      return;
    }
    await GoogleAuth(response.credential);
    setError(UNKNOWN_ERROR_MESSAGE);

    await client.refetchQueries({ include: "active" });
  };
  
  return { loginGoogle, error };
};

export { useGoogleLoginAuthentication };
