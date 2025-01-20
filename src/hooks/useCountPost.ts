import Cookies from 'js-cookie';
import { useCallback, useEffect, useState } from "react";
import { API_URL } from "../constants/urls";
import { snackVar } from "../constants/snack";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../constants/errors";
import { useDecrypt } from "../security/encryption";

const useCountPosts = (param: string) => {
  const [postsCount, setPostsCount] = useState<number | undefined>();

  let token: string;
  try {
     token = useDecrypt(String(Cookies.get(import.meta.env.VITE_COOKIE_NAME))).token;
  } catch (error) {
     token = ''
  }
  const countPosts = useCallback(async () => {
    const res = await fetch(`${API_URL}/posts/count/${param}`, {
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
    });
    if (!res.ok) {
      snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
      return;
    }
    setPostsCount(parseInt(await res.text()));
  }, []);

  useEffect(() => {
    countPosts();
  }, [param, countPosts]);

  console.log('number', postsCount)
  return { postsCount, countPosts };
};

export { useCountPosts };
