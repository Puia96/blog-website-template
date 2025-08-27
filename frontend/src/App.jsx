import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useEffect } from "react";
import { userStore } from "./stores/userStore";
import Dashboard from "./pages/Dashboard";
import Create from "./pages/Create";
import Post from "./pages/Post";
import PostDetail from "./pages/PostDetail";
import { Toaster } from "react-hot-toast";

function App() {
  const { user, checkAuth } = userStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const location = useLocation();

  const hideNavbarRoutes = ["/login"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      <div className="min-h-screen overflow-hidden">
        <div>
          {shouldShowNavbar && <Navbar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/" />}
            />
            <Route
              path="/post"
              element={user ? <Post /> : <Navigate to="/post" />}
            />
            <Route
              path="/create"
              element={user ? <Create /> : <Navigate to="/create" />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/posts/:id" element={<PostDetail />} />
          </Routes>
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default App;
