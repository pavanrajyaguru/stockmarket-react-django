import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8001/auth_user", {
        email: email,
        password: password,
      });
      console.log(response.data);
      // Handle response accordingly
    } catch (error) {
      console.error("Error:", error);
      // Handle error accordingly
    }
  };

  return (
    <Flex
      maxW={{ base: "100%", md: "max-content" }}
      w="100%"
      mx={{ base: "auto", lg: "0px" }}
      me="auto"
      h="100%"
      alignItems="start"
      justifyContent="center"
      mb={{ base: "30px", md: "60px" }}
      px={{ base: "25px", md: "0px" }}
      mt={{ base: "40px", md: "14vh" }}
      flexDirection="column"
    >
      <Box me="auto">
        <Heading color="navy.700" fontSize="36px" mb="10px">
          Sign In
        </Heading>
        <Text
          mb="36px"
          ms="4px"
          color="gray.400"
          fontWeight="400"
          fontSize="md"
        >
          Enter your email and password to sign in!
        </Text>
      </Box>
      <Flex
        zIndex="2"
        direction="column"
        w={{ base: "100%", md: "420px" }}
        maxW="100%"
        background="transparent"
        borderRadius="15px"
        mx={{ base: "auto", lg: "unset" }}
        me="auto"
        mb={{ base: "20px", md: "auto" }}
      >
        <form onSubmit={handleSubmit}>
          {/* Google Sign-in Button */}
          {/* Other Sign-in options */}
          {/* Email and Password Inputs */}
          <FormControl>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color="navy.700"
              mb="8px"
            >
              Email<Text color="brand.500">*</Text>
            </FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="mail@simmmple.com"
              value={email}
              onChange={handleInputChange}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              mb="24px"
              fontWeight="500"
              size="lg"
            />
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color="navy.700"
              display="flex"
            >
              Password<Text color="brand.500">*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={password}
                onChange={handleInputChange}
                variant="auth"
                fontSize="sm"
                mb="24px"
                size="lg"
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color="gray.400"
                  _hover={{ cursor: "pointer" }}
                  as={showPassword ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClickShowPassword}
                />
              </InputRightElement>
            </InputGroup>
            {/* Other options */}
            <Button
              type="submit"
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
            >
              Sign In
            </Button>
          </FormControl>
        </form>
      </Flex>
    </Flex>
  );
}

export default SignIn;
