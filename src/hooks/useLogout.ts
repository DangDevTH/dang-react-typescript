import Cookies  from 'js-cookie';
import { API_URL } from "../constants/urls";
import { authenticatedVar } from '../constants/all-makevar';
import { useApolloClient } from '@apollo/client';
import { useDecrypt } from '../security/encryption';

const useLogout = () => {
  const client = useApolloClient();
  let token: string;
  try {
     token = useDecrypt(String(Cookies.get(import.meta.env.VITE_COOKIE_NAME))).token;
  } catch (error) {
     token = ''
  }

  const logout = async () => {
    const response = await fetch(`${API_URL}/auth/google-authentication/logout`, {
      method: "POST",
      headers: {
        Authorization: Cookies.get(import.meta.env.VITE_COOKIE_NAME) ? `Bearer ${String(token)}` : '',
      },
    });
    if (!response.ok) {
      throw new Error("Error logging out.");
    }
    const { accessToken } = await response.json();
    Cookies.set(import.meta.env.VITE_COOKIE_NAME, accessToken);
    authenticatedVar(false);
    await client.clearStore();
  };

  return { logout };
};

export { useLogout };
