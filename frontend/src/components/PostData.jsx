import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "../lib/axios";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { postStore } from "../stores/postStore";
import { CiShoppingTag } from "react-icons/ci";
import Select from "react-select";
import { Editor } from "primereact/editor";

const PostData = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [deletingPost, setDeletingPost] = useState(null);
  const [tagOptions, setTagOptions] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [size] = useState({ base: "full", md: "lg", lg: "4xl" });

  const { updatePost, deletePost } = postStore();

  const tagOptionsFormatted = tagOptions.map((tag) => ({
    value: tag._id,
    label: tag.name,
  }));

  const {
    isOpen: isDetailOpen,
    onOpen: openDetail,
    onClose: closeDetail,
  } = useDisclosure();

  const {
    isOpen: isEditOpen,
    onOpen: openEdit,
    onClose: closeEdit,
  } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onOpen: openDelete,
    onClose: closeDelete,
  } = useDisclosure();

  const fetchPost = async () => {
    try {
      const response = await axios.get("/posts");
      setPosts(response.data);
    } catch (error) {
      console.log("Error in fetching post data", error.message);
    }
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get("/tags");
        setTagOptions(res.data);
      } catch (error) {
        console.log("Error in fetching tag data", error);
      }
    };

    fetchPost();
    fetchTags();
  }, []);

  const gotoAddPage = async () => {
    await navigate("/create");
  };

  const handleRowClick = (postData) => {
    setSelectedPost(postData);
    openDetail();
  };

  const handleEditClick = (p) => {
    // setEditingPost(p);
    setEditingPost({
      ...p,
      tags: Array.isArray(p.tags) ? p.tags : [p.tags], // always array
    });
    openEdit();
  };

  const postUpdate = async (e) => {
    e.preventDefault();
    const success = await updatePost(editingPost);

    if (success) {
      closeEdit();
      fetchPost();
    }
  };

  const handleDeleteClick = (p) => {
    setDeletingPost(p);
    openDelete();
  };

  const postDelete = async (e) => {
    e.preventDefault();
    const success = await deletePost(deletingPost);

    if (success) {
      closeDelete();
      fetchPost();
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="w-full border mr-2 px-2 pt-1 rounded-md font-bold">
          Post list
        </div>
        <div>
          <button
            className="bg-blue-600 rounded-md px-3 text-white py-1"
            onClick={gotoAddPage}
          >
            <span className="flex items-center gap-1">
              Add <span className="text-lg font-bold">+</span>
            </span>
          </button>
        </div>
      </div>
      <div className="mt-3">
        <TableContainer>
          <Table size={"md"}>
            <Thead className="bg-gray-300 rounded-lg">
              <Tr>
                <Th>Title</Th>
                <Th>Tags</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {posts.map((p, index) => (
                <Tr
                  key={p._id}
                  onClick={() => handleRowClick(p)}
                  cursor="pointer"
                >
                  <Td>{p.title}</Td>
                  <Td>{p.tags?.map((tag) => tag.name).join(", ")}</Td>
                  {/* <Td>{p.excerp}</Td> */}
                  <Td textAlign={"right"}>
                    <ButtonGroup size={"sm"}>
                      <Button>
                        <MdOutlineEdit
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(p);
                          }}
                        />
                      </Button>
                      <Button>
                        <MdDelete
                          color="red"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(p);
                          }}
                        />
                      </Button>
                    </ButtonGroup>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>

      <Modal isOpen={isDetailOpen} onClose={closeDetail} size={size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-center">Post Details</ModalHeader>
          <hr className="mb-2" />
          <ModalCloseButton />
          <ModalBody>
            {selectedPost && (
              <div>
                <p>
                  <strong>Title:</strong> {selectedPost.title}
                </p>
                <p>
                  <strong>Tags:</strong>{" "}
                  {selectedPost.tags?.map((tag) => tag.name).join(", ")}
                </p>
                <p>
                  <strong>Content:</strong>
                </p>
                <Editor
                  value={selectedPost.content || ""}
                  readOnly={true}
                  style={{ height: "300px" }}
                />

                {/* <div
                  dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                /> */}
                <p className="mt-2">
                  <strong>Author: {selectedPost.author?.name}</strong>
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(selectedPost.createdAt).toLocaleString()}
                </p>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={closeDetail}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isEditOpen} onClose={closeEdit} isCentered size={size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="bg-gray-300">
            <div className="flex items-center">
              <CiShoppingTag className="mr-2" />
              Edit Tag
            </div>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={postUpdate}>
              <FormControl isRequired>
                <div className="mt-2">
                  <Input
                    id="title"
                    type="text"
                    autoFocus
                    className="mb-5"
                    value={editingPost?.title || ""}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, title: e.target.value })
                    }
                    placeholder="Enter tag title"
                    borderColor={"black"}
                  />
                </div>
                <div className="mb-5">
                  <Select
                    isMulti
                    placeholder="Please select tags"
                    borderColor={"black"}
                    options={tagOptionsFormatted}
                    value={
                      Array.isArray(editingPost?.tags)
                        ? tagOptionsFormatted.filter((opt) =>
                            editingPost.tags.some((t) => t._id === opt.value)
                          )
                        : []
                    }
                    onChange={(selected) =>
                      setEditingPost({
                        ...editingPost,
                        tags: selected.map((opt) => ({
                          _id: opt.value,
                          name: opt.label,
                        })),
                      })
                    }
                  />
                </div>
                <div className="mb-5">
                  <Editor
                    id="content"
                    value={editingPost?.content || ""}
                    onTextChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        content: e.htmlValue,
                      })
                    }
                    placeholder="Enter content"
                  />
                </div>
                <div className="text-end mb-5">
                  <Button
                    type="submit"
                    variant="solid"
                    colorScheme="blue"
                    width={"full"}
                  >
                    Submit
                  </Button>
                </div>
              </FormControl>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isDeleteOpen} onClose={closeDelete}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>Are you sure you want to delete?</div>
          </ModalBody>
          {/* <ModalFooter className="gap-3"> */}
          <form onSubmit={postDelete}>
            <FormControl isRequired>
              <div className="flex gap-3 justify-center mb-4 mx-2">
                <Button colorScheme="blue" onClick={closeDelete} width={"full"}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant={"solid"}
                  colorScheme="red"
                  width={"full"}
                >
                  Delete
                </Button>
              </div>
            </FormControl>
          </form>
          {/* </ModalFooter> */}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PostData;
