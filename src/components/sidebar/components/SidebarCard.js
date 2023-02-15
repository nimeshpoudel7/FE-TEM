import {
  Button,
  Flex,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import logoWhite from "assets/img/layout/logoWhite.png";
import React from "react";
import { useHistory } from "react-router-dom";
import TokenService from "service/user-service";

export default function SidebarDocs() {
  const navigate=useHistory()
  const bgColor = "linear-gradient(135deg, #868CFF 0%, #4318FF 100%)";
  const borderColor = useColorModeValue("white", "navy.800");
const logout=()=>{
  console.log("hey")
  TokenService.clearAuthToken()
  navigate.push("/auth/login")
}
  return (
    <Flex
      justify='center'
      direction='column'
      align='center'
      bg={bgColor}
      borderRadius='30px'
      me='20px'
      display={{sm:"none"}}
      position='relative'>
        <Button
          bg={bgColor}
          _hover={{ bg: "whiteAlpha.200" }}
          _active={{ bg: "whiteAlpha.100" }}
          // mb={{ sm: "16px", xl: "24px" }}
          color={"white"}
          fontWeight='regular'
          fontSize='sm'
          minW='185px'
          mx='auto'
          onClick={logout}
          >
          lOGOUT
        </Button>
    </Flex>
  );
}
