/**
 * Socket.io event setup (no domain logic here).
 * Wire this in server.js to share the `io` instance across modules if needed.
 */
import logger from "../utils/logger.js";

export function registerSocketHandlers(io) {
  io.on("connection", (socket) => {
    logger.info(`🔌 Client connected: ${socket.id}`);

    // Basic sample event for live score updates
    socket.on("score:update", (payload) => {
      // Broadcast to all except sender
      socket.broadcast.emit("score:push", payload);
    });

    socket.on("disconnect", (reason) => {
      logger.info(`🔌 Client disconnected: ${socket.id} (${reason})`);
    });
  });
}
