import { Router } from "express";
import healthRouter from "./v1/health.js";
import scoreRouter from "./v1/scores.js";

const router = Router();

router.use("/v1/health", healthRouter);
router.use("/v1/scores", scoreRouter);

export default router;
