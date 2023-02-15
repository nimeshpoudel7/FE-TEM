

import React from "react";
import { NavLink, useHistory } from "react-router-dom";
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
import EmailLogin from "./EmailLogin";
import OtpLogin from "./OtpLogin";
import { useLoggedInUserOTP } from "service/login";
import { usePasswordLogin } from "service/login";
import { useFetchChecklistDetails } from "service/kyc";
import { useFetchUserChecklistDetails } from "service/login";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter email"),
  password: Yup.string().required("Password is required"),
});

const verifySchema=Yup.object().shape({
  mobile_number:Yup.string()
  .nullable()
  .typeError("That doesn't look like a phone number")
  .min(10, "A phone number should be 10 digits")
  .max(10,"A phone number should be 10 digits")
  .required("A phone number is required")
  .matches(/^\d{10}$/, "Enter a 10 digit valid phone number"),
  otp:Yup.string()
  .nullable()
  .typeError("That doesn't look like an OTP")
  .min(6, "OTP should be 6 digits")
  .max(6,"OTP should be 6 digits")
  .required("A phone number is required")
  .matches(/^\d{6}$/, "Enter a 6 digit valid OTP"),
})
function LogIn() {
  const navigate=useHistory()
  const {mutateAsync:mutateLogin,isLoading,isSuccess}=usePasswordLogin()
  const {mutateAsync:mutateSendOTP,isSuccess:isSuccessOTP}=useLoggedInUserOTP();
  const {data:userData}=useFetchUserChecklistDetails(isSuccess||isSuccessOTP);

  console.log(isSuccess)
  const [OTP, setOTP] = React.useState(false);
    const defaultValues = {
    email: "",
    password: "",
  };
  const verifyDefaultValues={
    mobile_number:"",
    otp:""
  }
  const {control, handleSubmit,reset} = useForm({
    defaultValues: {
      ...defaultValues,
    },
    resolver: yupResolver(schema),
  });
  const {control:verifyControl,handleSubmit:verifyHandleSubmit,formState,getValues} = useForm({
    defaultValues: {
      ...verifyDefaultValues,
    },
    resolver: yupResolver(verifySchema),
  });
  const onSubmitHandler = async(data) => {
    console.log(data)
    const response= await mutateLogin(data)
    if(response?.data?.code===1){
      // userRoleHandler()
      navigate.push("/admin")
      console.log("respo",response)
      ///call checklist
    }else{
      
    }
  };

const userRoleHandler = async() => {
  const response= userData
  console.log("resonse",response)
  if(response?.code===1){
  if(response?.check_list?.status=="COMPLETED"){
      navigate.push("/admin")
  }else{
    navigate.push("/auth/kycdetails")
  }
}else{
  //toast
}
}

  const verifyOnSubmitHandler=async(data)=>{
    
    const response= await mutateSendOTP({action:"verify_otp",mobile_number:data?.mobile_number,purpose:"login",key:data?.otp})
    if(response?.data?.code===1){
      console.log("respo",response)
      ///call checklist
      navigate.push("/admin")

      // userRoleHandler()
    }else{
      
    }
  
    //toast
   }
  // Chakra color mode
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
const OTPClicked=()=>{
    setOTP(!OTP)
}
const handleOtp=async()=>{
  const values= getValues()
  if(values?.mobile_number?.length===10){
   //call api
  const response= await mutateSendOTP({action:"send_otp",mobile_number:values?.mobile_number,purpose:"login"})
   
  }else{
   //toast
  }
 }
  
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <Box w={"100%"} h="100%" display="flex" flexDirection={"column"} className="hh">
     <Box flex={{lg:0.45,sm:1}}>
     
     <Flex alignItems='center' flexDirection='column'   >
     <Flex
     maxW={{ base: "100%", md: "max-content" }}
     w='100%'
     mx={{ base: "auto", lg: "0px" }}
     me='auto'
     h='100%'
     alignItems='center'
     justifyContent='center'
     mb={{ base: "30px", md: "60px" }}
     px={{ base: "25px", md: "25px" }}
     mt={{ base: "14vh", md: "14vh" }}
     flexDirection='column'>
     <Box me='auto'>
       <Heading color={textColor} fontSize='36px' mb='10px'>
         Sign In
       </Heading>
       <Text
         mb='36px'
         ms='4px'
         color={textColorSecondary}
         fontWeight='400'
         fontSize='md'>
         {OTP?"Enter your Mobile Number and OTP to sign in!":" Enter your email and password to sign in!"}
        
       </Text>
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
      {/* <Button
         fontSize='sm'
         me='0px'
         mb='26px'
         py='15px'
         h='50px'
         borderRadius='16px'
         bg={googleBg}
         color={googleText}
         fontWeight='500'
         _hover={googleHover}
         _active={googleActive}
         _focus={googleActive}>
         <Icon as={FcGoogle} w='20px' h='20px' me='10px' />
         Sign in with Google
       </Button>
       <Flex align='center' mb='25px'>
         <HSeparator />
         <Text color='gray.400' mx='14px'>
           or
         </Text>
         <HSeparator />
       </Flex>
*/ }
{!OTP?
  <EmailLogin  handleClick={handleClick} show={show} setOTP={setOTP} OTP={OTP} control={control} onSubmitHandler={onSubmitHandler} handleSubmit={handleSubmit}   OTPClicked={OTPClicked}/>

       :<OtpLogin  show={show} setOTP={setOTP} OTP={OTP} verifyControl={verifyControl} verifyHandleSubmit={verifyHandleSubmit} verifyOnSubmitHandler={verifyOnSubmitHandler} handleClick={handleClick}  OTPClicked={OTPClicked} handleOtp={handleOtp} />

}
     </Flex>
   </Flex>
     </Flex>
     
     </Box>
    </Box>
  );
}

export default LogIn;
