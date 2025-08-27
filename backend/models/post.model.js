import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    postId: {
      type: Number,
      required: true,
      unique: true,
    }, // numeric ID

    title: {
      type: String,
      required: [true, "Title is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
    },
    excerp: {
      type: String,
      required: [true, "Excerp is required"],
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        required: true,
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
