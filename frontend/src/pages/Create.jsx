import {
  Button,
  Card,
  FormControl,
  FormLabel,
  Heading,
  Input,
  // Select,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Editor } from "primereact/editor";
import { postStore } from "../stores/postStore";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import Select from "react-select";

const Create = () => {
  const navigate = useNavigate();
  const [tagOptions, setTagOptions] = useState([]);
  const { createPost } = postStore();

  const tagOptionsFormatted = tagOptions.map((tag) => ({
    value: tag._id,
    label: tag.name,
  }));

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get("/tags");
        setTagOptions(res.data);
      } catch (error) {
        console.log("Error fetching tags", error.message);
      }
    };

    fetchTags();
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    slug: "",
    excerp: "",
    tags: [],
  });

  const addPost = async (e) => {
    e.preventDefault();

    const slug = formData.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-") // replace spaces & special chars with -
      .replace(/^-+|-+$/g, ""); // remove leading/trailing

    const plainTextContent = formData.content.replace(/<[^>]+>/g, "");
    const excerp = plainTextContent.substring(0, 150) + "...";

    const success = await createPost({
      ...formData,
      slug,
      excerp,
    });
    if (success) {
      setFormData({
        title: "",
        content: "",
        slug: "",
        excerp: "",
        tags: [],
      });
      navigate("/post");
    }
  };

  return (
    <div className="mt-16 px-3 sm:px-72">
      {/* <div>Add new blog</div> */}
      <div>
        <Card className="py-3">
          <Stack>
            <Heading size="md" className="text-center">
              ADD NEW BLOG
            </Heading>
            <div>
              <form onSubmit={addPost}>
                <FormControl>
                  <Stack>
                    <div className="px-3">
                      <FormLabel>Title</FormLabel>
                      <Input
                        id="title"
                        type="text"
                        autoFocus
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        size="md"
                        placeholder="Please enter title"
                      />
                    </div>
                    <div className="mt-3 px-3">
                      <FormLabel>Tags</FormLabel>
                      {/* <Select
                        multiple
                        id="tags"
                        placeholder="Please select tags"
                        value={formData.tags}
                        onChange={(e) =>
                          setFormData({ ...formData, tags: [e.target.value] })
                        }
                      >
                        {tagOptions.map((tag) => {
                          return (
                            <option key={tag._id} value={tag._id}>
                              {tag.name}
                            </option>
                          );
                        })}
                      </Select> */}
                      <Select
                        isMulti
                        placeholder="Please select tags"
                        options={tagOptionsFormatted}
                        value={tagOptionsFormatted.filter((opt) =>
                          formData.tags.includes(opt.value)
                        )}
                        onChange={(selected) =>
                          setFormData({
                            ...formData,
                            tags: selected.map((opt) => opt.value),
                          })
                        }
                      />
                    </div>
                    <div className="mt-3 px-3">
                      <FormLabel>Content</FormLabel>
                      <Editor
                        value={formData.content}
                        onTextChange={(e) =>
                          setFormData({ ...formData, content: e.htmlValue })
                        }
                        style={{ height: "320px" }}
                      />
                    </div>
                    <div className="px-3 py-5">
                      <Button
                        variant="solid"
                        colorScheme="blue"
                        width="full"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </div>
                  </Stack>
                </FormControl>
              </form>
            </div>
          </Stack>
        </Card>
      </div>
    </div>
  );
};

export default Create;
