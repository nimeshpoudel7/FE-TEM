import React from "react";
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

const schema = Yup.object().shape({
  account_number: Yup.string().required("A/C Number is required"),
  ifscCode: Yup.string().required("IFSC Code is required"),
  accountType: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .required("Please select account type"),
  bankName: Yup.string().required("Bank Name is required"),
});

const accountType = [
  {
    value: "Savings",
    label: "SAVINGS",
  },
  {
    value: "Current",
    label: "CURRENT",
  },
];

const BankDetails = () => {
  const defaultValues = {
    account_number:"",
    ifscCode:"",
    accountType:null,
    bankName:""
  };
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
              name="ifscCode"
              control={control}
              type="text"
              label="IFSC Code"
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
                name="accountType"
                options={accountType || []}
                size="lg"
              />
            </InputGroup>{" "}

            <TextInput
              name="bankName"
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
