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
import { useHistory } from "react-router-dom/cjs/react-router-dom";
export function SearchBar(props) {
  const { variant, background, children, placeholder, borderRadius, ...rest } = props;
  let name = localStorage.getItem("name")
  const history = useHistory()
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
        {
          name ? (<Button>
            {name}
          </Button>) :
            <Button onClick={() =>{history.push('/auth/sign-in')}}>
              Login
            </Button>
        }



      </NavLink>
    </InputGroup>
  );
}
