import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow connections from any domain
  }
});

io.on("connection", (socket) => {
  socket.on("join", (room) => {
    socket.join(room);
  });

  socket.on("offer", (room, offer) => {
    socket.to(room).emit("offer", offer);
  });

  socket.on("answer", (room, answer) => {
    socket.to(room).emit("answer", answer);
  });

  socket.on("ice-candidate", (room, candidate) => {
    socket.to(room).emit("ice-candidate", candidate);
  });
});

httpServer.listen(3000, () => {
  console.log("Signaling server running on port 3000");
});
