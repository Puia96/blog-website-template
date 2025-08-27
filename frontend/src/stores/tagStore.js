import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const tagStore = create((set) => ({
  tags: [],
  loading: false,

  setTags: (tags) => set({ tags }),

  createTag: async (tagData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/tags", tagData);
      set((prevState) => ({
        tags: [...prevState.tags, res.data],
        loading: false,
      }));
      toast.success("Successfully added");
      return true;
    } catch (error) {
      toast.error(error.message);
      set({ loading: false });
    }
  },

  updateTag: async (tag) => {
    try {
      const res = await axios.put(`/tags/${tag._id}`, tag);
      const updated = res.data.data;

      set((prevState) => ({
        tags: prevState.tags.map((t) => (t._id === updated._id ? updated : t)),
      }));
      toast.success("Successfully udpated");
      return true;
    } catch (error) {
      toast.error("Update failed!", error);
      return false;
    }
  },

  deleteTag: async (tag) => {
    try {
      const res = await axios.delete(`/tags/${tag._id}`);

      if (res.status === 200) {
        toast.success("Successfully deleted");

        // optional: update state immediately
        set((prev) => ({
          tags: prev.tags.filter((t) => t._id !== tag._id),
        }));

        return true;
      }
      return false;
    } catch (error) {
      console.log("Delete failed", error);
      toast.error("Delete failed!");
      return false;
    }
  },
}));
