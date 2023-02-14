import React, { useState } from "react";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import DropzoneComponent from "components/Dropzone";


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
  const [acceptedFiles, setAcceptedFiles] = useState([]);
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
      <DropzoneComponent
        setAcceptedFiles={setAcceptedFiles}
        helperText="Please drop file"
      />

        </form>
        
      </AccordionPanel>
    </AccordionItem>
  );
};

export default UploadDocument;
