import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../lib/axios";
import Comment from "../components/Comment";
import { RxAvatar } from "react-icons/rx";
import { FaTrashAlt } from "react-icons/fa";
import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { CiShoppingTag } from "react-icons/ci";
import { commentStore } from "../stores/commentStore";
import { userStore } from "../stores/userStore";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [deletingComment, setDeletingComment] = useState(null);
  const { deleteComment } = commentStore();
  const { user } = userStore();
  const isAdmin = user?.role === "admin";

  const {
    isOpen: isDeleteOpen,
    onOpen: openDelete,
    onClose: closeDelete,
  } = useDisclosure();

  const fetchPost = async () => {
    try {
      const res = await axios.get(`/posts/${id}`);
      setPost(res.data);
    } catch (error) {
      console.log("Error in fetching data", error);
    }
  };

  const fetchComment = async () => {
    try {
      const res = await axios.get(`/posts/${id}/comments`);
      setComments(res.data);
    } catch (error) {
      console.log("Error in fetching data", error);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComment();
  }, [id]);

  const openDeleteDialog = (c) => {
    setDeletingComment(c);
    openDelete();
  };

  const commentDelete = async (e) => {
    e.preventDefault();
    const success = await deleteComment(deletingComment);

    if (success) {
      closeDelete();
      fetchPost();
      fetchComment();
    }
  };

  return (
    <div className="mt-16 sm:mt-20 px-3 sm:px-72 my-4">
      <div className="text-3xl font-bold">{post.title}</div>
      <div>
        <div className="text-gray-500 py-1">
          {post.tags?.map((tag) => tag.name).join(", ")}
        </div>
        <div
          className="text-justify py-2 items-center [&_img]:mx-auto [&_img]:block [&_img]:my-4"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        {/* {post.content} */}
      </div>
      <div>
        <div>
          {comments.length > 0 ? (
            comments.map((c) => (
              <div key={c._id} className="border-b py-2">
                <div className="flex gap-3">
                  <div className="col-span-2">
                    <RxAvatar size="50px" />
                  </div>
                  <div className="flex flex-col justify-between">
                    <strong>{c.commenter}</strong>
                    <div className="text-xs">
                      {new Date(c.createdAt).toLocaleTimeString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                      {/* ({c.commenterEmail}) */}
                    </div>
                  </div>
                </div>
                <div className="px-12 ml-3 py-3 text-justify">{c.content}</div>
                {isAdmin && (
                  <div className="px-12 ml-3">
                    <Button
                      bgColor={"red"}
                      size={"sm"}
                      color={"white"}
                      variant={"red"}
                      onClick={() => openDeleteDialog(c)}
                    >
                      <span className="flex gap-2 items-center">
                        <FaTrashAlt />
                        Delete
                      </span>
                    </Button>
                  </div>
                )}
              </div>
            ))
          ) : (
            // <div className="text-lg mt-5 border-b">No comments yet!</div>
            <div></div>
          )}
        </div>
      </div>
      <div>
        <Comment fetchComment={fetchComment} />
      </div>

      <Modal isOpen={isDeleteOpen} onClose={closeDelete} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="bg-gray-300">
            <div className="flex items-center">
              <CiShoppingTag className="mr-2" />
              Delete Comment
            </div>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={commentDelete}>
              <FormControl isRequired>
                <div className="mt-2 mb-3">
                  Are you sure you want to delete?
                </div>
                <div className="text-end mb-5">
                  <Button
                    type="submit"
                    variant="solid"
                    colorScheme="blue"
                    width={"full"}
                  >
                    Delete
                  </Button>
                </div>
              </FormControl>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PostDetail;
