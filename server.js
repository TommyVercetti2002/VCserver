import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*"
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

// ✅ Use the Render-provided PORT or fallback to 3000 locally
const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`Signaling server running on port ${PORT}`);
});
