import React from "react";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Icon,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import { MdUpload } from "react-icons/md";
import Dropzone from "views/admin/profile/components/Dropzone";
import Card from "components/card/Card";

const verifySchema = Yup.object().shape({
  mobile_number: Yup.string()
    .nullable()
    .typeError("That doesn't look like a phone number")
    .min(10, "A phone number should be 10 digits")
    .max(10, "A phone number should be 10 digits")
    .required("A phone number is required")
    .matches(/^\d{10}$/, "Enter a 10 digit valid phone number"),
  otp: Yup.string()
    .nullable()
    .typeError("That doesn't look like an OTP")
    .min(6, "OTP should be 6 digits")
    .max(6, "OTP should be 6 digits")
    .required("A phone number is required")
    .matches(/^\d{6}$/, "Enter a 6 digit valid OTP"),
});

const UploadDocument = () => {
  const brandColor = useColorModeValue("brand.500", "white");
  const verifyDefaultValues = {
    mobile_number: "",
    otp: "",
  };
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm({
    defaultValues: {
      ...verifyDefaultValues,
    },
    resolver: yupResolver(verifySchema),
  });

  const onSubmitHandler = () => {};

  return (
    
    <AccordionItem m={3}>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            Upload Document
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Card mb='20px' align='center' p='20px'>
          <Dropzone
          w={{ base: "100%", "2xl": "268px" }}
          me='36px'
          maxH={{ base: "60%", lg: "50%", "2xl": "100%" }}
          minH={{ base: "60%", lg: "50%", "2xl": "100%" }}
          content={
            <Box>
              <Icon as={MdUpload} w='80px' h='80px' color={brandColor} />
              <Flex justify='center' mx='auto' mb='12px'>
                <Text fontSize='xl' fontWeight='700' color={brandColor}>
                  Upload Files
                </Text>
              </Flex>
              <Text fontSize='sm' fontWeight='500' color='secondaryGray.500'>
                PNG, JPG and GIF files are allowed
              </Text>
            </Box>
          }
        />
        </Card>
{/*           
          <Button
            fontSize="sm"
            variant="brand"
            fontWeight="500"
            w={{sm:"100%", lg:"30%"}}
            h="50"
            mt="5px"
            mb="24px"
            type="submit"
          >
            Save and Continue
          </Button> */}
        </form>
        
      </AccordionPanel>
    </AccordionItem>
  );
};

export default UploadDocument;
