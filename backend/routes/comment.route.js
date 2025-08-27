import express from "express";
import {
  CreateComment,
  deleteComment,
  getComment,
  getCommentByPost,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/", getComment);
router.post("/:postId/comments", CreateComment);
router.get("/:postId/comments", getCommentByPost);
router.delete("/:postId/comments/:id", deleteComment);

export default router;
