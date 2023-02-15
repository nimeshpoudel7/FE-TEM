import React, { useState } from 'react'
import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Heading, InputGroup, Text, useColorModeValue } from '@chakra-ui/react';
import Select from 'components/forms/Select';
import TextInput from 'components/forms/TextInput';
import { NavLink } from 'react-router-dom';
const businessTypes = [
  {
    value: "HUF",
    label: "HUF",
  },
  {
    value: "INDIVIDUAL",
    label: "INDIVIDUAL",
  },
  //Commented for future use
  // {
  //   value: "LIMITED LIABILITY",
  //   label: "LIMITED LIABILITY PARTNERSHIP",
  // },
  // {
  //   value: "PARTNERSHIP",
  //   label: "PARTNERSHIP FIRM",
  // },
  // {
  //   value: "PRIVATE LIMITED",
  //   label: "PRIVATE LIMITED COMPANY",
  // },
  // {
  //   value: "PROPRIETORSHIP",
  //   label: "PROPRIETORSHIP FIRM",
  // },
];

const SignUp = ({handleSubmit,onSubmitHandler,control}) => {
  const[termsAgreed,setTermsAgreed]=useState(false)
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
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
            <InputGroup>
              <Select
                placeholder="Choose a business type"
                control={control}
                name="type"
                options={businessTypes || []}
                size="lg"
              />
            </InputGroup>{" "}
            <TextInput
              name="full_name"
              control={control}
              type="text"
              label="Full Name(Self)"
            />
            <TextInput
              name="email"
              control={control}
              type="text"
              label="Email ID"
            />
            <TextInput
              name="password"
              control={control}
              type="password"
              label="Password"
            />
            <Flex justifyContent="space-between" align="center" mb="24px">
              <FormControl display="flex" alignItems="center">
                <Checkbox
                  id="remember-login"
                  colorScheme="brandScheme"
                  me="10px"
                  onChange={(e)=>setTermsAgreed(e.target.checked)}
                />
                <FormLabel
                  htmlFor="remember-login"
                  mb="0"
                  fontWeight="normal"
                  color={textColor}
                  fontSize="sm"
                >
                  By creating the account, I accept the agreement.
                </FormLabel>
              </FormControl>
            </Flex>
            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              type="submit"
              disabled={!termsAgreed}
            >
              Create Account
            </Button>
          </form>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColorDetails} fontWeight="400" fontSize="14px">
              Already have an account ?
              <NavLink to="/auth/login">
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                >
                  Login
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </div>
  )
}

export default SignUp