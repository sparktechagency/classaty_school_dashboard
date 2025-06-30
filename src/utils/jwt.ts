/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const decodedToken = (token: string) => {
  try {
    return jwtDecode(token);
  } catch (error: any) {
    Cookies.remove("classaty_accessToken");
    localStorage.removeItem("persist:classaty");
    window.location.reload();
    return null; // Return null instead of crashing the app
  }
};
