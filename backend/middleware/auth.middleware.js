import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token, not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // 👈 attach to request
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Token verification failed" });
  }
};

export const adminRoute = (req, res) => {
  if (res.user && req.user?.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied = Admin only" });
  }
};
