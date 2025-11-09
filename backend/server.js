/**
 * Entry point: Express + Socket.io + DB connections
 * ES Modules syntax enabled via package.json `"type": "module"`.
 */
import "dotenv/config.js";
import http from "node:http";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import routes from "./routes/index.js";
import { ensureLocalDbDirs } from "./utils/dbCheck.js";
import logger from "./utils/logger.js";
import { connectMongo } from "./config/mongo.js";
import { connectMySQL } from "./config/mysql.js";
import { registerSocketHandlers } from "./sockets/index.js";

// App init
const app = express();
app.use(cors({
  origin: (process.env.SOCKET_CORS_ORIGINS || "").split(",").map(s => s.trim()).filter(Boolean) || "*",
}));
app.use(express.json());
app.use(morgan("dev"));

// Basic root route
app.get("/", (req, res) => res.json({ name: "live-cricket-scoreboard-backend", status: "running" }));

// API routes
app.use("/api", routes);

// Ensure local data folders exist
ensureLocalDbDirs();

// Create HTTP server and attach Socket.io
const server = http.createServer(app);
import { Server as SocketIOServer } from "socket.io";
const io = new SocketIOServer(server, {
  cors: {
    origin: (process.env.SOCKET_CORS_ORIGINS || "").split(",").map(s => s.trim()).filter(Boolean) || "*",
    methods: ["GET", "POST"],
  },
});

// Register socket handlers
registerSocketHandlers(io);

// DB connections
(async () => {
  try {
    await connectMongo();
    await connectMySQL();
  } catch (err) {
    logger.error("Startup DB connection failed. Exiting.", err);
    process.exit(1);
  }
})();

// Start server
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
server.listen(PORT, () => {
  logger.info(`🚀 Server listening on http://localhost:${PORT}`);
});
