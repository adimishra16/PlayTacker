/**
 * Example Mongo model representing a live score snapshot.
 * Keep this minimal; expand later with ball-by-ball schema.
 */
import mongoose from "../../config/mongo.js";

const LiveScoreSchema = new mongoose.Schema(
  {
    matchId: { type: String, required: true, index: true },
    battingTeam: String,
    bowlingTeam: String,
    score: String, // e.g., "128/3"
    over: String,  // e.g., "15.2"
    lastUpdateAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("LiveScore", LiveScoreSchema);
