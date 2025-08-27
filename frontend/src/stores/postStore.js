import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const postStore = create((set) => ({
  posts: [],
  loading: false,

  setPosts: (posts) => set({ posts }),

  createPost: async (postData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/posts", postData);
      set((prevState) => ({
        posts: [...prevState.posts, res.data],
        loading: false,
      }));
      toast.success("Successfully added");
      return true;
    } catch (error) {
      toast.error(error.message);
      set({ loading: false });
    }
  },

  updatePost: async (post) => {
    try {
      const payload = {
        ...post,
        tags: post.tags?.map((tag) => tag._id),
      };

      const res = await axios.put(`/posts/${post._id}`, payload);
      const updated = res.data.message;

      set((prevState) => ({
        posts: prevState.posts.map((p) =>
          p._id === updated._id ? updated : p
        ),
      }));
      toast.success("Successfully updated");
      return true;
    } catch (error) {
      toast.error("Update fail!", error);
      return false;
    }
  },

  deletePost: async (post) => {
    try {
      const res = await axios.delete(`/posts/${post._id}`);

      if (res.status === 200) {
        toast.success("Successfully deleted");

        // update state without re-fetch
        set((prevState) => ({
          posts: prevState.posts.filter((p) => p._id !== post._id),
        }));

        return true;
      }
      return false;
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("Delete failed!");
      return false;
    }
  },
}));
