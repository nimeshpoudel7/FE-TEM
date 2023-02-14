import React from "react";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import TextInput from "components/forms/TextInput";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {useForm} from "react-hook-form";

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
          <SimpleGrid columns={{sm: "1", lg: "2"}} spacing={6} mt={4}>
            <TextInput name="name" control={control} type="text" label="Name" />
            <TextInput
              name="email"
              control={control}
              type="text"
              label="Email"
            />
            <TextInput name="pan" control={control} type="text" label="PAN" />
            <TextInput
              name="pincode"
              control={control}
              type="text"
              label="PIN Code"
            />
            <TextInput name="City" control={control} type="text" label="City" />
          </SimpleGrid>
        </form>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default UploadDocument;
