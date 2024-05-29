import { Server } from "socket.io";
const http = require("http");
const Express = require("express");

const app = Express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  //socket.on is used to listen for events both on client and server side
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

export { app, server };
