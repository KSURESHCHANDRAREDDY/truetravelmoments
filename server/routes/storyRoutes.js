import express from "express";
import { getStories, createStory, toggleLike } from "../controllers/storyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getStories);
router.post("/", protect, createStory);
router.post("/:id/like", protect, toggleLike);

export default router;
