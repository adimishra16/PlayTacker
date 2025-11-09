import { Router } from "express";
import { getScores, postScore } from "../../controllers/scoreController.js";

const router = Router();

router.get("/", getScores);
router.post("/", postScore);

export default router;
