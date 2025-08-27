import React, { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await axios.get("/posts");
      setPosts(res.data);
    } catch (error) {
      console.log("Error in fetching data", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const openDetailPost = async (id) => {
    await navigate(`/posts/${id}`);
  };

  return (
    <div className="mt-16 sm:mt-20 px-3 sm:px-72">
      <div className="grid grid-cols-6 gap-2 py-2">
        <div className="col-span-6 sm:col-span-4">
          <div>
            {posts.length === 0 ? (
              <p>Post not available</p>
            ) : (
              posts.map((post) => (
                <div
                  key={post._id}
                  className="border px-2 mb-4 hover:bg-gray-100 cursor-pointer"
                  onClick={() => openDetailPost(post.postId)}
                >
                  <div className="text-3xl font-bold mt-2">{post.title}</div>
                  <div className="mt-2">
                    <div className="flex gap-2 justify-between text-gray-600 text-sm">
                      <p>{post.tags.map((tag) => tag.name).join(", ")}</p>
                      <p>
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="py-2 text-justify">{post.excerp}</div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="col-span-6 sm:col-span-2 -mt-1">
          <div className="bg-gray-300 text-center mt-1 mb-2 font-bold text-lg">
            Recent post
          </div>
          <hr />
          <div>
            {posts
              .slice(-5)
              .reverse()
              .map((post) => (
                <div key={post.postId}>
                  <div className="px-5 py-2">
                    <Link
                      to={`/posts/${post.postId}`}
                      className="hover:underline hover:text-blue-500"
                    >
                      {" "}
                      # {post.title}
                      <span className="ml-3">
                        (
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                        )
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
