import mongoose from "mongoose";
import Comment from "../models/comment.model.js";

export const getComment = async (req, res) => {
  try {
    const comments = await Comment.find({});
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCommentByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ postId: Number(postId) });
    res.json(comments);
  } catch (error) {
    console.log("Error in fetching data", error);
  }
};

export const CreateComment = async (req, res) => {
  const { commenter, commenterEmail, content } = req.body;
  const { postId } = req.params;
  try {
    const comment = await Comment.create({
      postId,
      commenter,
      commenterEmail,
      content,
    });
    res.status(201).json({
      comment: {
        postId: comment.postId,
        commenter: comment.commenter,
        commenterEmail: comment.commenterEmail,
        content: comment.content,
      },
      message: "Comment created successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    await Comment.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
