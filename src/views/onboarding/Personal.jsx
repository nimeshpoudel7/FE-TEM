import React, { useEffect } from "react";
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
import { usePostPin } from "service/kyc";

const schema = Yup.object().shape({
  first_name:Yup.string().required("Name is required"),
  email:Yup.string().email().required("Email is required"),
  pan:Yup.string().required("PAN is required"),
  pin:Yup.string().required("PIN Code is required"),
  city:Yup.string().required("City is required")
});

const Personal = ({personalData}) => {
  const {
    data,
    mutateAsync: mutatePin,
    isLoading,
  } = usePostPin();
 const defaultValues={
  first_name:personalData?.first_name??"",
  email:personalData?.email??"",
  pan:personalData?.pan??"",
  pin:personalData?.pin??"",
  city:personalData?.city??""
 }

  const {
    control,
    reset,
    handleSubmit,
    formState: {isValid},
    setValue,
  } = useForm({
    defaultValues: {
      ...defaultValues,
    },
    personalData,
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    reset(personalData)
  }, [personalData])
  const onSubmitHandler = () => {};
const handlePin=async(e)=>{
  setValue("pin",e.target.value)
  if(e.target.value.length==6){
    const body={
pin:e.target.value
    }
    const pinData=await mutatePin(body)
    console.log(pinData?.data?.response?.PostOffice[0]?.District)
    setValue("city",pinData?.data?.response?.PostOffice[0]?.District)
  }

  
}
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
            <TextInput name="first_name" control={control} type="text" label="Name" />
            <TextInput
              name="email"
              control={control}
              type="text"
              label="Email"
            />
            <TextInput name="pan" control={control} type="text" label="PAN" />
            <TextInput
              name="pin"
              control={control}
              type="text"
              label="PIN Code"
              onChange={handlePin}
            />
            <TextInput name="city" control={control} type="text" label="City" disabled/>
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
