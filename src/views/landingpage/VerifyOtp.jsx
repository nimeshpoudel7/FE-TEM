import React from 'react'
import { Box, Button,  Flex, Heading, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import TextInput from 'components/forms/TextInput';
import {  FaChevronLeft } from 'react-icons/fa';

const VerifyOtp = ({handleSubmit,onSubmitHandler,control,setStep,handleOtp}) => {
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  return (
    <div style={{display: "flex", justifyContent: "center"}}>
    <Flex
      maxW={{base: "100%", md: "max-content"}}
      w="100%"
      mx={{base: "auto", lg: "0px"}}
      me="auto"
      h="100%"
      alignItems="start"
      justifyContent="center"
      mb={{base: "30px", md: "60px"}}
      px={{base: "25px", md: "0px"}}
      mt={{base: "40px", md: "14vh"}}
      flexDirection="column"
    >
      <Box me="auto">
        <Heading color={textColor} fontSize="30px" mb="10px">
          Create your account
        </Heading>
        <Text
          mb="36px"
          ms="4px"
          color={textColorSecondary}
          fontWeight="400"
          fontSize="md"
        >
          Create your account now and start earning attractive commission.
        </Text>
      </Box>
          <Flex
            align='center'
            my={3}
            pt={{ lg: "0px", xl: "0px" }}
            w='fit-content'>
            <Icon
              as={FaChevronLeft }
              me='12px'
              h='13px'
              w='8px'
              color='secondaryGray.600'
              cursor="pointer"
              onClick={()=>setStep(1)}
            />
            <Text ms='0px' fontSize='lg' color='secondaryGray.600'>
              Verify OTP
            </Text>
          </Flex>
      <Flex
        zIndex="2"
        direction="column"
        w={{base: "100%", md: "420px"}}
        maxW="100%"
        background="transparent"
        borderRadius="15px"
        mx={{base: "auto", lg: "unset"}}
        me="auto"
        mb={{base: "20px", md: "auto"}}
      >
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <TextInput
            name="mobile_number"
            control={control}
            type="number"
            label="Mobile Number"
            endIcons="Send OTP"
            placeholder="Enter Mobile Number"
            onIconClick={handleOtp}
            
          />
          <TextInput
          name="otp"
          control={control}
          type="number"
          label="OTP"

          />
          <Button
            fontSize="sm"
            variant="brand"
            fontWeight="500"
            w="100%"
            h="50"
            mb="24px"
            type="submit"
          >
            Create Account
          </Button>
        </form>
      </Flex>
    </Flex>
  </div>
  )
}

export default VerifyOtp