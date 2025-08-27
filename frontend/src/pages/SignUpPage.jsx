import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { userStore } from "../stores/userStore";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signup } = userStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await signup(formData);

    if (success) {
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 xl:px-44">
      <Card bg="gray.100">
        <CardBody>
          <p className="text-center mb-10 text-3xl">Create Account</p>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <div className="mb-4">
                <FormLabel className="text-black">Name</FormLabel>
                <Input
                  id="name"
                  type="text"
                  required
                  autoFocus
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Name"
                  borderColor="black"
                  _hover={{ borderColor: "black" }}
                />
              </div>
              <div className="mb-4">
                <FormLabel className="text-black">Email</FormLabel>
                <Input
                  id="email"
                  placeholder="Email"
                  size="md"
                  borderColor="black"
                  _hover={{ borderColor: "black" }}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <FormLabel className="text-black">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  borderColor="black"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  _hover={{ borderColor: "black" }}
                />
              </div>
              <div className="mb-4">
                <FormLabel className="text-black">Confirm Password</FormLabel>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  borderColor="black"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  _hover={{ borderColor: "black" }}
                />
              </div>
              <div className="text-end">
                <Button
                className="mt-6"
                  type="submit"
                  width="full"
                  bgGradient="linear(to-r, blue.400, black)"
                  color={"white"}
                  _hover={{
                    bgGradient: "linear(to-l, blue.400, black)",
                  }}
                >
                  Submit
                </Button>
              </div>
            </FormControl>
          </form>
          <div className="mt-7 text-center">
            <div className="hover:text-blue-600 hover:underline">
              <Link to="/login">Go to login page!</Link>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default SignUpPage;
