import React, {useState} from "react";
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
import {usePostDocumentDetails} from "service/kyc";
import { toastFail } from "components/toast";

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

const UploadDocument = ({UserDetails, userId,onSelectChange,stepper}) => {
  console.log(UserDetails);
  const [panAcceptedFiles, setPanAcceptedFiles] = useState([]);
  const [addressacceptedFiles, setAddressAcceptedFiles] = useState([]);
  const [companyPanacceptedFiles, setCompanyPanAcceptedFiles] = useState([]);
  const [companyAddressacceptedFiles, setCompanyAddressAcceptedFiles] =
    useState([]);
  const [chequeacceptedFiles, setChequeAcceptedFiles] = useState([]);
  const brandColor = useColorModeValue("brand.500", "white");
  const verifyDefaultValues = {
    account_number: "",
    otp: "",
  };
  const {data: PersonalRequestData, mutateAsync: mutateDocument} =
    usePostDocumentDetails();
  const {control, handleSubmit, register, formState} = useForm({
    defaultValues: {
      ...verifyDefaultValues,
    },
    resolver: yupResolver(verifySchema),
  });

  const onSubmitHandler = (values) => {
    console.log(values, "aaaa");
  };
  
  console.log("ass",stepper)
  const onSubmitHandlerImage = async (values) => {
    //need validation
  //   console.log("aaaaaaaaaaa",typeof panAcceptedFiles[0] !=="object" , typeof chequeacceptedFiles[0]!=="object" , addressacceptedFiles[0] !=="object")
  //  console.log("aaaaaaa",UserDetails?.user_type,panAcceptedFiles[0],chequeacceptedFiles[0],addressacceptedFiles[0],companyPanacceptedFiles[0],companyAddressacceptedFiles[0])
  //   if(UserDetails?.user_type === "HUF"){
  //     if(typeof panAcceptedFiles[0] !=="object" || typeof chequeacceptedFiles[0]!=="object" || addressacceptedFiles[0]!=="object"| typeof companyPanacceptedFiles[0]!=="object" ||typeof companyAddressacceptedFiles[0]!=="object") {
  //       toastFail("above")
  //       toastFail("Please upload all the documents")
  //       return;
  //     } 
  //   }else{
  //     if(typeof panAcceptedFiles[0] !=="object" || typeof chequeacceptedFiles[0]!=="object" || addressacceptedFiles[0] !=="object" ) {
  //       toastFail("below")
  //       toastFail("Please upload all the documents")
  //       return;
  //     }
  //   }
    let body = {
      cancel_cheque: chequeacceptedFiles[0],
      pan_card:panAcceptedFiles[0],
      aadhar_card:addressacceptedFiles[0],
      user_id:userId,
      field_names:["pan_card","aadhar_card","cancel_cheque"]
    };
    if(UserDetails?.user_type === "HUF"){
      body={...body,
        organization_pan:companyPanacceptedFiles[0],
        address_proof:companyAddressacceptedFiles[0],
        field_names:["pan_card","aadhar_card","cancel_cheque","address_proof","organization_pan"]
      }
      
    }
    const uploadResponse = await mutateDocument(body, userId);
    if(uploadResponse?.data?.code===1){
      onSelectChange(4);
    }
    // console.log(onBankPage);
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
          <Text my={4}>
            {UserDetails?.user_type === "HUF"
              ? "Documents of karta"
              : "Personal documents"}
          </Text>
          <SimpleGrid columns={{sm: "1", lg: "2"}} spacing={6} mt={4}>
            <DropzoneComponent
              setAcceptedFiles={setPanAcceptedFiles}
              helperText="Pan Card"
            />
            <DropzoneComponent
              setAcceptedFiles={setAddressAcceptedFiles}
              helperText="Address proof"
            />
          </SimpleGrid>
          {UserDetails?.user_type === "HUF" && (
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
          )}
          <Text my={4}>
            Bank Proof (Must be of the bank a/c provided earlier)
          </Text>
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
