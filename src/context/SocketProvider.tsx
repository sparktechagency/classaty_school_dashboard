"use client"; // if using Next.js App Router

import { ReactNode, useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { decodedToken } from "../utils/jwt";
import { getSocketUrl } from "../helpers/config/socket-config";
import { SocketContext } from "./socket-context"; // import from new file

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  let user;
  const token = Cookies.get("classaty_accessToken");

  if (token) {
    user = decodedToken(token);
    if (!user) {
      Cookies.remove("classaty_accessToken");
      window.location.reload();
    }
  }

  const socket = useMemo(() => {
    if (!token) return null;

    const socketInstance = io(getSocketUrl(), {
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
