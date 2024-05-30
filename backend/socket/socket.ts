import { Server } from "socket.io";
const http = require("http");
const Express = require("express");

const app = Express();

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId: string): string => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;

  if (typeof userId === "string" && userId !== "") {
    userSocketMap[userId] = socket.id;
  }

  //socket.emit is used to send events to the client
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //socket.on is used to listen for events both on client and server side
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);

    if (typeof userId === "string" && userId !== "")
      delete userSocketMap[userId];

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server };
