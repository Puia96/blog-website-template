import express from "express";
import {
  addTag,
  deleteTag,
  getTag,
  updateTag,
} from "../controllers/tag.controller.js";

const router = express.Router();

router.get("/", getTag);
router.post("/", addTag);
router.put("/:id", updateTag);
router.delete("/:id", deleteTag);

export default router;
