import React, { useEffect } from "react";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  InputGroup,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import TextInput from "components/forms/TextInput";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import Select from "components/forms/Select";
import { toastFail } from "components/toast";
import { usePostBankDetails } from "service/kyc";

const schema = Yup.object().shape({
  account_number: Yup.string().matches(/^[0-9]{9,18}$/,"Please enter a valid Account Number").required("A/C Number is required"),
  ifsc_code: Yup.string().required("IFSC Code is required"),
  account_type: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .required("Please select account type"),
    bank_name:Yup.string().required("Bank Name is required")
});

const account_type = [
  {
    value: "SAVINGS",
    label: "SAVINGS",
  },
  {
    value: "Current",
    label: "CURRENT",
  },
];

const BankDetails = ({bankData,onSelectChange,userId}) => {
  console.log(bankData)
  
  const {
    data:PersonalRequestData,
    mutateAsync: mutateBank,
  } = usePostBankDetails();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues
  } = useForm({
    resolver: yupResolver(schema),
  });
  
 
  useEffect(() => {
    const defaultValues = {
      account_number:bankData?.account_number??"",
      ifsc_code:bankData?.ifsc_code??"",
      account_type:account_type.find(e=> e.label===bankData?.account_type)??null,
      bank_name :bankData?.bank_name??""
    };
    reset(defaultValues)
  }, [bankData,reset])

  const onSubmitHandler =async (values) => {
  
    const body={
      account_type:values.account_type.value,
      account_number:values.account_number,
      ifsc_code:values.ifsc_code,
      bank_name:values.bank_name,
      user_id:userId
    }
const onBankPage= await mutateBank(body)
console.log(onBankPage?.data,"aokajdaj")
if(onBankPage?.data?.code===1){
  console.log("indise")
  onSelectChange(2);
  };}
  
  const handleIFSCChange=(event)=>{
    let code = event.target.value;
    setValue("ifsc_code",code)
    if (code.length === 11) {
      fetch(`https://ifsc.razorpay.com/${code.toUpperCase()}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.BANK) {
            console.log("",json.BANK)
            setValue("bank_name",json.BANK)
          }else {
            toastFail("Please enter a valid IFSC")
          }
        });
    }
  }

  return (
    <AccordionItem m={3}>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            Bank Details
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <Text my={4}>All Payouts will me made to this account.</Text>
          <SimpleGrid columns={{sm: "1", lg: "2"}} spacing={6} mt={4}>
            <TextInput
              name="account_number"
              control={control}
              type="text"
              label="A/C Number"
            />

            <TextInput
              name="ifsc_code"
              control={control}
              type="text"
              label="IFSC Code"
              onChange={handleIFSCChange}
            />
          </SimpleGrid>
          <SimpleGrid
            columns={1}
            w={{sm: "100%", lg: "50%"}}
            spacing={6}
            mt={4}
          >
             <InputGroup>
              <Select
                placeholder="Choose an type"
                control={control}
                name="account_type"
                options={account_type || []}
                size="lg"
              />
            </InputGroup>{" "}
            <TextInput
              name="bank_name"
              control={control}
              type="text"
              label="Bank Name"
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
          >
            Save and Continue
          </Button>
        </form>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default BankDetails;
