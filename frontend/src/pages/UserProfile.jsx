import React, { useEffect, useState } from "react";
import axios from "../lib/axios";
import { userStore } from "../stores/userStore";
import toast from "react-hot-toast";

const ProfilePage = () => {
  // const [user, setUser] = useState({});
  const { user, updateUser } = userStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [
    // message,
    setMessage,
  ] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email, password: "" });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/auth/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      updateUser(res.data.user);
      // setMessage(res.data.message);
      toast.success("Profile successfully updated");
      setFormData({ ...formData, password: "" }); // clear password
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error updating profile");
    }
  };

  return (
    <div className="mt-16 sm:mt-20 px-3 sm:px-72">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>
      {/* {message && <p className="mb-2 text-green-600">{message}</p>} */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block">
            Password (leave blank to keep current):
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
