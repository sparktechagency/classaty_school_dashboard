// hooks/useUserData.ts
import { useMemo } from "react";
import Cookies from "js-cookie";
import { decodedToken } from "../utils/jwt";
import { IUser } from "../types";

const useUserData = () => {
  const token = Cookies.get("classaty_accessToken");

  const user = useMemo(() => {
    if (!token) return null;

    const decoded = decodedToken(token) as IUser | null;
    return decoded;
  }, [token]);

  return user;
};

export default useUserData;
