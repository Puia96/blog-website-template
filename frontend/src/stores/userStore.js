import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const userStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  login: async (email, password) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", { email, password });
      set({ user: res.data.user, loading: false });
      //   set({ user: res.data, loading: false });
      toast.success("Login successfully");
      return true;
    } catch (error) {
      set({ loading: false });
      toast.error(error.message || "An error occurred");
    }
  },

  logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ user: null });
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axios.get("/auth/profile");
      set({ user: response.data, checkingAuth: false });
    } catch (error) {
      console.log(error.message);
      set({ checkingAuth: false, user: null });
    }
  },
}));
