import express from "express";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../controllers/post.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", protect, createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.get("/:id", getPostById);

export default router;
