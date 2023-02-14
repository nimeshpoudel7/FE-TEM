import React, { useState } from "react";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import DropzoneComponent from "components/Dropzone";
import { usePostDocumentDetails } from "service/kyc";


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

const UploadDocument = ({UserDetails,userId}) => {
  console.log(UserDetails)
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [addressacceptedFiles, setAddressAcceptedFiles] = useState([]);
  const [companyPanacceptedFiles, setCompanyPanAcceptedFiles] = useState([]);
  const [companyAddressacceptedFiles, setCompanyAddressAcceptedFiles] = useState([]);
  const [chequeacceptedFiles, setChequeAcceptedFiles] = useState([]);
  const brandColor = useColorModeValue("brand.500", "white");
  const verifyDefaultValues = {
    account_number: "",
    otp: "",
  };
  const {
    data:PersonalRequestData,
    mutateAsync: mutateDocument,
  } = usePostDocumentDetails();
  const {
    control,
    handleSubmit,
    register,
    formState,
  } = useForm({
    defaultValues: {
      ...verifyDefaultValues,
    },
    resolver: yupResolver(verifySchema),
  });

  const onSubmitHandler = (values) => {
    console.log(values,"aaaa")
  };
  const onSubmitHandlerImage = async(values) => {
    console.log(chequeacceptedFiles,"aaaa")
    let filePreview
    chequeacceptedFiles.forEach(file => {
       filePreview = {
        file: file,
        fileName: file.name,
        field_names:"cancel_cheque",
        fileType: file.type,
        // link: URL.createObjectURL(file),
        // fileType: file.type,
        fileName: file.name,
      };
    })
    console.log(filePreview,"filePreview")
    const body={
      cancel_cheque:filePreview,
      field_names:["cancel_cheque"]
    }
    const onBankPage= await mutateDocument(body,userId)
    console.log(onBankPage)

  };
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
        <Text my={4}>{UserDetails?.user_type=="HUF"?"Documents of karta":"Personal documents"}</Text>
        <SimpleGrid columns={{sm: "1", lg: "2"}} spacing={6} mt={4}>
      <DropzoneComponent
        setAcceptedFiles={setAcceptedFiles}
        helperText="Pan Card"
        name="account_number"
        control={control}
        {...register("exampleRequired")}
      />
      <DropzoneComponent
      setAcceptedFiles={setAddressAcceptedFiles}
      helperText="Address proof"
    />
      </SimpleGrid>
     { UserDetails?.user_type=="HUF"&&
     <>
      <Text my={4}>Company documents.</Text>
      <SimpleGrid columns={{sm: "1", lg: "2"}} spacing={6} mt={4}>
    <DropzoneComponent
      setAcceptedFiles={setCompanyPanAcceptedFiles}
      helperText="Pan Card"
    />
    <DropzoneComponent
    setAcceptedFiles={setCompanyAddressAcceptedFiles}
    helperText="Address proof"
  />
    </SimpleGrid>
    </>
  }
    <Text my={4}>Bank Proof (Must be of the bank a/c provided earlier)</Text>
    <SimpleGrid columns={{sm: "1", lg: "2"}} spacing={6} mt={4}>
  <DropzoneComponent
    setAcceptedFiles={setChequeAcceptedFiles}
    helperText="Cancelled cheque"
  />
  </SimpleGrid>
  <Button
  fontSize="sm"
  variant="brand"
  fontWeight="500"
  w={{sm: "100%", lg: "30%"}}
  h="50"
  mt="5px"
  mb="24px"
  type="submit"
  onClick={onSubmitHandlerImage}
>
  Save and Continue
</Button>
        </form>
        
      </AccordionPanel>
    </AccordionItem>
  );
};

export default UploadDocument;
