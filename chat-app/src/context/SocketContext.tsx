import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
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

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }
  return context;
};

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser?.fullName !== "" && authUser?._id !== undefined) {
      try {
        const socket = io("http://localhost:4000", {
          query: {
            userId: authUser._id,
          },
        });

        setSocket(socket);

        //socket.on is used to listen for events both on client and server side
        socket.on("getOnlineUsers", (users) => {
          setOnlineUsers(users);
        });

        return () => {
          socket.close();
        };
      } catch (error) {
        console.log(error);
        toast.error("Error connecting to the Socket");
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
