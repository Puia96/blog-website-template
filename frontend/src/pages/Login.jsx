import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { userStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = userStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(email, password);

    if (success) {
      navigate("/");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        w={{ base: "90%", sm: "600px" }}
        p={4}
      >
        <Stack flex="1">
          <CardBody>
            <Heading size="md" className="text-center">
              ADMIN LOGIN
            </Heading>
            <div className="mt-6">
              <form onSubmit={handleLogin}>
                <FormControl isRequired>
                  <Stack spacing={3}>
                    <div>
                      <FormLabel>Email</FormLabel>
                      <Input
                        id="email"
                        placeholder="Please enter your email"
                        size="md"
                        _hover={{ borderColor: "black" }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mt-3">
                      <FormLabel>Password</FormLabel>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Please enter your password"
                        size="md"
                        className="mb-3"
                        _hover={{ borderColor: "black" }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <Button
                      variant="solid"
                      colorScheme="blue"
                      width="full"
                      type="submit"
                    >
                      Login
                    </Button>
                  </Stack>
                </FormControl>
              </form>
            </div>
          </CardBody>
        </Stack>
      </Card>
    </div>
  );
};

export default Login;
