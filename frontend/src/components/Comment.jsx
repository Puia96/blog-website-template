import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { commentStore } from "../stores/commentStore";
import {
  // useNavigate,
  useParams,
} from "react-router-dom";

const Comment = ({ fetchComment }) => {
  // const navigate = useNavigate();
  const { createComment } = commentStore();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    // postId: "",
    commenter: "",
    commenterEmail: "",
    content: "",
  });

  const submitComment = async (e) => {
    e.preventDefault();
    const success = await createComment(id, formData);

    if (success) {
      setFormData({
        // postId: "",
        commenter: "",
        commenterEmail: "",
        content: "",
      });
      fetchComment();
      // navigate(`/posts/${id}`);
    }
  };

  return (
    <div className="mt-5 py-4 mb-10">
      <div>Leave a comment</div>
      <form onSubmit={submitComment}>
        <FormControl>
          <div>
            <FormLabel>Comment *</FormLabel>
            <textarea
              id="comment"
              name="comment"
              className="w-full border border-black p-2 resize-none rounded-md"
              rows={6}
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
            ></textarea>
          </div>
          <div className="mt-3">
            <FormLabel>Name *</FormLabel>
            <Input
              id="commenter"
              placeholder="Please enter your name"
              value={formData.commenter}
              onChange={(e) =>
                setFormData({ ...formData, commenter: e.target.value })
              }
            />
          </div>
          <div className="mt-3">
            <FormLabel>Email</FormLabel>
            <Input
              id="commenterEmail"
              placeholder="Please enter your email"
              value={formData.commenterEmail}
              onChange={(e) =>
                setFormData({ ...formData, commenterEmail: e.target.value })
              }
            />
          </div>
          <div className="py-5">
            <Button
              type="submit"
              className="w-full"
              variant="solid"
              colorScheme="blue"
            >
              Post comment
            </Button>
          </div>
        </FormControl>
      </form>
    </div>
  );
};

export default Comment;
