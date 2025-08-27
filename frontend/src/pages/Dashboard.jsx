import React, { useEffect, useState } from "react";
import axios from "../lib/axios";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [tags, setTags] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("posts");
      setPosts(res.data);
    } catch (error) {
      console.log("Error in fetching data", error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get("/comments");
      setComments(res.data);
    } catch (error) {
      console.log("Error in fetching data", error);
    }
  };

  const fetchTags = async () => {
    try {
      const res = await axios.get("/tags");
      setTags(res.data);
    } catch (error) {
      console.log("Error in fetching data", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchComments();
    fetchTags();
  }, []);

  return (
    <div className="mt-16 sm:mt-20 px-3 sm:px-72">
      {/* <div className="flex justify-between"> */}
      <div className="sm:grid sm:grid-cols-6 sm:gap-3 sm:py-3">
        <div className="col-span-2 border bg-green-300 py-16 rounded-2xl mb-5 sm:mb-0 mt-20 sm:mt-0">
          <div className="text-center font-bold text-2xl">No. of posts</div>
          <div className="text-center font-bold text-4xl">{posts.length}</div>
        </div>
        <div className="col-span-2 border bg-yellow-300 py-16 rounded-2xl mb-5 sm:mb-0">
          <div className="text-center font-bold text-2xl">No. of comments</div>
          <div className="text-center font-bold text-4xl">
            {comments.length}
          </div>
        </div>
        <div className="col-span-2 border bg-indigo-300 py-16 rounded-2xl mb-5 sm:mb-0">
          <div className="text-center font-bold text-2xl">No. of tags</div>
          <div className="text-center font-bold text-4xl">{tags.length}</div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Dashboard;
