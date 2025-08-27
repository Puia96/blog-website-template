import mongoose from "mongoose";
import Tag from "../models/tag.model.js";

export const getTag = async (req, res) => {
  try {
    const tags = await Tag.find({});
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addTag = async (req, res) => {
  const { name } = req.body;
  try {
    const tag = await Tag.create({ name });
    res.status(201).json({
      tag: {
        name: tag.name,
      },
      message: "Tag created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTag = async (req, res) => {
  const { id } = req.params;
  const tag = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid tag id" });
  }

  try {
    const updateTag = await Tag.findByIdAndUpdate(id, tag, {
      new: true,
    });
    res.status(200).json({ success: true, data: updateTag });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTag = async (req, res) => {
  const { id } = req.params;

  try {
    await Tag.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
