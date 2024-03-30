import React from "react";
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
export function SearchBar(props) {
  const { variant, background, children, placeholder, borderRadius, ...rest } =props;
  const handleLogout = () =>{
    axios.post("http://127.0.0.1:8000/logout")
      .then((response) => {
      
        console.log(response.data);
      })
      .catch((error) => {
      
        console.error("Error:", error);
      });
  }
  return (
    <InputGroup>
      {/* <InputLeftElement
        children={
          <IconButton
            bg='inherit'
            borderRadius='inherit'
            _hover='none'
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
            icon={
              <SearchIcon color={searchIconColor} w='15px' h='15px' />
            }></IconButton>
        }
      /> */}
      {/* <Input
        variant='search'
        fontSize='sm'
        bg={background ? background : inputBg}
        color={inputText}
        fontWeight='500'
        _placeholder={{ color: "gray.400", fontSize: "14px" }}
        borderRadius={borderRadius ? borderRadius : "30px"}
        placeholder={placeholder ? placeholder : "Search..."}
      /> */}
      <NavLink to="/admin/default"> 
      <Button onClick={handleLogout}>
        LogOut
      </Button>
      </NavLink>
    </InputGroup>
  );
}
