import React from "react";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import TextInput from "components/forms/TextInput";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {useForm} from "react-hook-form";

const schema = Yup.object().shape({
  name:Yup.string().required("Name is required"),
  email:Yup.string().email().required("Email is required"),
  pan:Yup.string().required("PAN is required"),
  pincode:Yup.string().required("PIN Code is required"),
  city:Yup.string().required("City is required")
});

const Personal = () => {
 const defaultValues={
  name:"",
  email:"",
  pan:"",
  pincode:"",
  city:""
 }
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm({
    defaultValues: {
      ...defaultValues,
    },
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = () => {};

  return (
    <AccordionItem m={3}>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            Personal Details
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
            <TextInput name="city" control={control} type="text" label="City" />
          </SimpleGrid>
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
          </Button>
        </form>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default Personal;
