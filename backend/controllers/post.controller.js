import mongoose from "mongoose";
import Post from "../models/post.model.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("tags", "name")
      .populate("author", "name");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findOne({ postId: Number(id) })
      .populate("tags", "name")
      .populate("author", "name");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const { title, content, slug, excerp, tags } = req.body;

  try {
    // find last post to get the next ID
    const lastPost = await Post.findOne().sort({ postId: -1 });
    const nextId = lastPost ? lastPost.postId + 1 : 1;

    const post = await Post.create({
      postId: nextId,
      title,
      content,
      slug,
      excerp,
      tags,
      author: req.user._id,
    });
    res.status(201).json({
      post: {
        postId: post.postId,
        title: post.title,
        content: post.content,
        slug: post.slug,
        excerp: post.excerp,
        tags: post.tags,
        author: post.author,
      },
      message: "Post created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid post id" });
  }

  try {
    const updatePost = await Post.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.status(200).json({ success: true, message: updatePost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid post id" });
  }

  try {
    await Post.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
