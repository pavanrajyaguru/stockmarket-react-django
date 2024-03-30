/* eslint-disable */

import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
// import { useToast } from "@chakra-ui/react";

// Chakra imports
import {
  Box,
  Button,
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
  Select,
} from "@chakra-ui/react";
// Custom components
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import axios from "axios";

function Register() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [uname,setuname] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState(""); 
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
//   const toast = useToast();
  const handleSignIn = () => {
    
    axios.post("http://127.0.0.1:8000/register_action", {
        uname : uname,
        email : email,
      password : password,
      gender : gender,

    })
      .then((response) => {
      
        console.log(response.data);
        // toast({
        //     title: "Registration Successful",
        //     status: "success",
        //     duration: 3000,
        //     isClosable: true,
        // });
      })
      .catch((error) => {
      
        console.error("Error:", error);
        // toast({
        //     title: "Registration Error",
        //     description: "An error occurred during registration.",
        //     status: "error",
        //     duration: 3000,
        //     isClosable: true,
        // });
      });
  };    

  return (
    <DefaultAuth>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w='100%'
        mx={{ base: "auto", lg: "0px" }}
        me='auto'
        h='100%'
        alignItems='start'
        justifyContent='center'
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection='column'>
        <Box me='auto'>
          <Heading color={textColor} fontSize='36px' mb='10px'>
            Sign Up
          </Heading>
          <br />
        </Box>
        <Flex
          zIndex='2'
          direction='column'
          w={{ base: "100%", md: "420px" }}
          maxW='100%'
          background='transparent'
          borderRadius='15px'
          mx={{ base: "auto", lg: "unset" }}
          me='auto'
          mb={{ base: "20px", md: "auto" }}>
          
          <FormControl>
          <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'>
              UserName<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
               value={uname}
               onChange={(e) => setuname(e.target.value)}
              isRequired={true}
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              type='text'
              placeholder='enter user name'
              mb='24px'
              fontWeight='500'
              size='lg'
            />
            <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'>
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
               value={email}
               onChange={(e) => setEmail(e.target.value)}
              isRequired={true}
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              type='email'
              placeholder='enter email'
              mb='24px'
              fontWeight='500'
              size='lg'
            />
            <FormLabel
            
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              display='flex'>
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size='md'>
              <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
                isRequired={true}
                fontSize='sm'
                placeholder='Min. 8 characters'
                mb='24px'
                size='lg'
                type={show ? "text" : "password"}
                variant='auth'
              />
              <InputRightElement display='flex' alignItems='center' mt='4px'>
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              display="flex"
            >
              Gender
            </FormLabel>
            <Select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              placeholder="Select gender"
              variant="auth"
              fontSize="sm"
              mb="24px"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
            <Flex justifyContent='space-between' align='center' mb='24px'>
            </Flex>
            <Button
              onClick={handleSignIn}
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              w='100%'
              h='50'
              mb='24px'>
              Register
            </Button>
          </FormControl>
         
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default Register;
