import React from 'react'
import { NavLink } from "react-router-dom";
// Chakra imports
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
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/lendenAuth.jpg";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import Card from "components/card/Card";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import TextInput from "components/forms/TextInput";
const EmailLogin = ({handleSubmit,onSubmitHandler,control,show,setOTP,OTP,handleClick}) => {
    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = "gray.400";
    const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
    const textColorBrand = useColorModeValue("brand.500", "white");
    const brandStars = useColorModeValue("brand.500", "brand.400");
    const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
    const googleText = useColorModeValue("navy.700", "white");
    const googleHover = useColorModeValue(
      { bg: "gray.200" },
      { bg: "whiteAlpha.300" }
    );
    const googleActive = useColorModeValue(
      { bg: "secondaryGray.300" },
      { bg: "whiteAlpha.200" }
    );
  return (
    <>
    <form onSubmit={handleSubmit(onSubmitHandler)}>
   <TextInput
   name={"email"} 
   control={control}
   type= {"email"} 
   label={"Email"}
   placeholder= {'mail@lendenclub.com'}
  //  onIconClick={handleOtp}
   
 />
   <InputGroup size='md'>
   <TextInput
   name={"password"}
   control={control}
   placeholder={"Password"}
   type={show ? "text" : "password"}

   label={"Password"}
 />
     <InputRightElement display='flex' alignItems='center' mt='32px'>
       <Icon
         color={textColorSecondary}
         _hover={{ cursor: "pointer" }}
         as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
         onClick={handleClick}
       />
     </InputRightElement>
   </InputGroup>
   <Flex justifyContent='space-between' align='center' mb='24px'>
       <FormLabel
         onClick={()=>{setOTP(true)}}
         mb='0'
         fontWeight='normal'
         color={textColorBrand}
         fontSize='sm'>
         {OTP?"Login with password":"Login with OTP"}
       </FormLabel>
     <NavLink to='/auth/forgot-password'>
       <Text
         color={textColorBrand}
         w='124px'
         fontWeight='normal'
         fontSize='sm'>
         Forgot password?
       </Text>
     </NavLink>
   </Flex>
   <Button
     fontSize='sm'
     variant='brand'
     fontWeight='500'
     w='100%'
     h='50'
     type="submit"
     mb='24px'>
     Sign In
   </Button>
   </form>

 <Flex
   flexDirection='column'
   justifyContent='center'
   alignItems='start'
   maxW='100%'
   mt='0px'>
   <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
     Not registered yet?
     <NavLink to='/auth/sign-up'>
       <Text
         color={textColorBrand}
         as='span'
         ms='5px'
         fontWeight='500'>
         Create an Account
       </Text>
     </NavLink>
   </Text>
 </Flex>
 </>
  )
}

export default EmailLogin