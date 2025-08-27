import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userStore } from "../stores/userStore";
import { ImExit } from "react-icons/im";

const Navbar = () => {
  const { user, logout, checkingAuth } = userStore();
  const isAdmin = user?.role === "admin";
  const navigate = useNavigate();
  const location = useLocation();

  const linkClass = (path) =>
    location.pathname === path
      ? "text-blue-500 font-bold border-b-2 border-blue-500"
      : "hover:text-blue-400";

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (checkingAuth) {
    return (
      <div className="text-center py-2">
        <span className="text-sm">Checking Authentication</span>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full z-40 transition-all duration-300 border-b py-4 px-4 sm:px-72 backdrop-blur-2xl">
      <div className="flex flex-wrap justify-between items-center">
        <div className="font-bold">
          <Link to="/" className="sm:text-3xl">
            My Blog
          </Link>
        </div>
        <div className="flex gap-4">
          <Link to="/" className={linkClass("/")}>
            Home
          </Link>
          {isAdmin && (
            <Link to="/dashboard" className={linkClass("/dashboard")}>
              Dashboard
            </Link>
          )}
          {isAdmin && (
            <Link to="/post" className={linkClass("/post")}>
              Post
            </Link>
          )}
          {isAdmin && (
            <div className="font-bold bg-green-300 px-2 rounded-md">
              <Link to="/user-profile">{user?.name}</Link>
            </div>
          )}
          {/* <Link to="/dashboard">Dashboard</Link> */}
          {isAdmin && (
            <button onClick={handleLogout} title="Logout">
              <ImExit size={"22px"} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
