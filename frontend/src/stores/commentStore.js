import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const commentStore = create((set) => ({
  comments: [],
  loading: false,

  setComments: (comments) => set({ comments }),

  createComment: async (postId, commentData) => {
    set({ loading: true });

    try {
      const res = await axios.post(`/posts/${postId}/comments`, commentData);
      set((prevState) => ({
        comments: [...prevState.comments, res.data.comment],
        loading: false,
      }));
      toast.success("Successfully added");
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  },

  deleteComment: async (comment) => {
    try {
      const res = await axios.delete(
        `/posts/${comment.postId}/comments/${comment._id}`
      );
      if (res.status === 200) {
        toast.success("SUccessfully deleted");

        set((prev) => ({
          comments: prev.comments.filter((c) => c._id !== comment._id),
        }));

        return true;
      }
    } catch (error) {
      console.log("Delete failed!", error);
      toast.error("Delete failed");
      return false;
    }
  },
}));
