import { ReactNode, useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { decodedToken } from "../utils/jwt"; // Adjust path as needed
import { getSocketUrl } from "../helpers/config/socket-config"; // Adjust path as needed
import { SocketContext } from "./socket-context"; // Adjust path as needed

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const token = Cookies.get("classaty_accessToken");
  let user;

  if (token) {
    user = decodedToken(token);
    if (!user) {
      Cookies.remove("classaty_accessToken");
      // Optionally redirect to login or handle invalid token
      toast.error("Invalid token. Please log in again.");
    }
  }

  const socket = useMemo(() => {
    if (!token) return null;

    const socketInstance = io(getSocketUrl(), {
      autoConnect: true,
      withCredentials: true,
      transports: ["websocket"],
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketInstance.on("connect", () =>
      toast.success("Connected to socket server")
    );
    socketInstance.on("disconnect", () =>
      toast.error("Disconnected from socket server")
    );
    socketInstance.on("connect_error", (error) =>
      toast.error(`Connection error: ${error.message}`)
    );

    return socketInstance;
  }, [token]);

  useEffect(() => {
    return () => {
      if (socket && socket.connected) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
