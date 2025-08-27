import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: Number,
      ref: "Post",
      required: [true, "post_id is required"],
    },
    commenter: {
      type: String,
      required: [true, "Commenter is required"],
      trim: true,
    },
    commenterEmail: {
      type: String,
      required: false,
      // required: [true, "Commenter email is required"],
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    content: {
      type: String,
      required: [true, "Comment content is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("comment", commentSchema);

export default Comment;
