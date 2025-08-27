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
import UserProfile from "./pages/UserProfile";
import SignUpPage from "./pages/SignUpPage";

function App() {
  const { user, checkAuth } = userStore();

  const location = useLocation();

  const hideNavbarRoutes = ["/login", "/sign-up"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

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
              element={user ? <Post /> : <Navigate to="/login" />}
            />
            <Route
              path="/create"
              element={user ? <Create /> : <Navigate to="/login" />}
            />
            <Route
              path="/user-profile"
              element={user ? <UserProfile /> : <Navigate to="/login" />}
            />
            {/* <Route
              path="/sign-up"
              element={!user ? <SignUpPage /> : <Navigate to="/login" />}
            /> */}
            <Route path="/sign-up" element={<SignUpPage />} />

            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/dashboard" />}
            />
            <Route path="/posts/:id" element={<PostDetail />} />
          </Routes>
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default App;
