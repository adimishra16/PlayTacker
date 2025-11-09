/**
 * Mongoose (MongoDB) connection
 * Used for live/volatile data such as current over, ball-by-ball events.
 */
import mongoose from "mongoose";
import logger from "../utils/logger.js";

const MONGO_URI = process.env.MONGO_URI;

export async function connectMongo() {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not set in environment.");
  }
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(MONGO_URI, {
      // options here if needed
    });
    logger.info("✅ MongoDB connected");
  } catch (err) {
    logger.error("❌ MongoDB connection error:", err.message);
    throw err;
  }
}

export default mongoose;
