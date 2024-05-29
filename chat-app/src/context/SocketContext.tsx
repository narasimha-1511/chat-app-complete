import { createContext, ReactNode, useEffect, useState } from "react";
import React from "react";
import { useAuthContext } from "./AuthContext";
import { io, Socket } from "socket.io-client";
import toast from "react-hot-toast";

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: string[] | [];
}

interface SocketContextProviderProps {
  children: ReactNode;
}

export const SocketContext = createContext<SocketContextType | null>(null);

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser?.fullName !== "") {
      const socket = io("http://localhost:4000");
      try {
        setSocket(socket);
      } catch (error) {
        console.log(error);
        toast.error("Error connecting to the Socket");
      } finally {
        return () => {
          socket.close();
        };
      }
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
