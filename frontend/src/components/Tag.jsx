import React, { useState } from "react";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { CiShoppingTag } from "react-icons/ci";
import { tagStore } from "../stores/tagStore";
import axios from "../lib/axios";
import { useEffect } from "react";
import { MdOutlineEdit, MdDelete, MdClear } from "react-icons/md";

const Tag = () => {
  const [tags, setTags] = useState([]);
  const [editingTag, setEditingTag] = useState(null);
  const [deletingTag, setDeletingTag] = useState(null);

  const {
    isOpen: isAddOpen,
    onOpen: openAdd,
    onClose: closeAdd,
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

  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    fetchTag();
  }, []);

  const { createTag, updateTag, deleteTag } = tagStore();

  const fetchTag = async () => {
    try {
      const response = await axios.get("/tags");
      setTags(response.data);
    } catch (error) {
      console.log("Error in fetching data", error.message);
    }
  };

  const addTag = async (e) => {
    e.preventDefault();
    const success = await createTag(formData);

    if (success) {
      setFormData({
        name: "",
      });
      closeAdd();
      fetchTag();
    }
  };

  const handleEditClick = (t) => {
    setEditingTag(t);
    openEdit();
  };

  const tagUpdate = async (e) => {
    e.preventDefault();
    const success = await updateTag(editingTag);

    if (success) {
      closeEdit();
      fetchTag();
    }
  };

  const handleDeleteClick = (t) => {
    setDeletingTag(t);
    openDelete();
  };

  const tagDelete = async (e) => {
    e.preventDefault();
    const success = await deleteTag(deletingTag);

    if (success) {
      closeDelete();
      fetchTag();
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="w-full border mr-2 px-2 pt-1 rounded-md font-bold">
          Tag list
        </div>
        <div>
          <button
            className="bg-blue-600 rounded-md px-3 text-white py-1"
            onClick={openAdd}
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
                <Th>Name</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {tags.map((t, index) => (
                <Tr key={t._id}>
                  <Td>{t.name}</Td>
                  <Td textAlign={"right"}>
                    <ButtonGroup size={"sm"}>
                      <Button>
                        <MdOutlineEdit
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(t);
                          }}
                        />
                      </Button>
                      <Button>
                        <MdDelete
                          color="red"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(t);
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

      <Modal isOpen={isAddOpen} onClose={closeAdd} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="bg-gray-300">
            <div className="flex items-center">
              <CiShoppingTag className="mr-2" />
              New Tag
            </div>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={addTag}>
              <FormControl isRequired>
                <div className="mt-2">
                  <Input
                    id="name"
                    type="text"
                    autoFocus
                    className="mb-5"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter tag name"
                    borderColor={"black"}
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

      <Modal isOpen={isEditOpen} onClose={closeEdit} isCentered>
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
            <form onSubmit={tagUpdate}>
              <FormControl isRequired>
                <div className="mt-2">
                  <Input
                    id="name"
                    type="text"
                    autoFocus
                    className="mb-5"
                    value={editingTag?.name || ""}
                    onChange={(e) =>
                      setEditingTag({ ...editingTag, name: e.target.value })
                    }
                    placeholder="Enter tag name"
                    borderColor={"black"}
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

      <Modal isOpen={isDeleteOpen} onClose={closeDelete} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="bg-gray-300">
            <div className="flex items-center">
              <CiShoppingTag className="mr-2" />
              Delete Tag
            </div>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={tagDelete}>
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

export default Tag;
