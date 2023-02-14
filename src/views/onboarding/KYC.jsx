import React from "react";
import Header from "./Header";
import {
  Accordion,
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Personal from "./Personal";
import BankDetails from "./BankDetails";
import UploadDocuments from "./UploadDocuments";
import Card from "components/card/Card";
import TableTopCreators from "views/admin/marketplace/components/TableTopCreators";
import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import { useFetchUserDetails } from "service/kyc";
import { useFetchPersonalDetails } from "service/kyc";
import { useFetchBankDetails } from "service/kyc";
import { useFetchDocumentDetails } from "service/kyc";
import TokenService from "service/service-token";
const KYC = () => {
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const userDetails=TokenService.getUserDetails()
  console.log(userDetails)
  // if not redirect to login page
  const {data:userData}=useFetchUserDetails()
  const {data:personalData}=useFetchPersonalDetails(userDetails?.user_id)
  const Bank=useFetchBankDetails(userDetails?.user_id)
  const Document=useFetchDocumentDetails(userDetails?.user_id)

  console.log(personalData)
  return (
   <Box>
      <Header />
      <Box mx={{sm:"5px",lg:"300px"}}>
        <Flex justify="center" align="center" direction="column">
          <Heading as="h2" size="md">
            Welcome Mahesh Khatiwada
          </Heading>
          <Text size="sm">
            {" "}
            Please complete your onboarding in next few steps
          </Text>
        </Flex>
        <Card>
          <Accordion allowToggle defaultIndex={[0]} >
            <Personal personalData={personalData?personalData:""}/>
            <BankDetails />
            <UploadDocuments />
          </Accordion>
        </Card>
      </Box>
  </Box>
  );
};

export default KYC;


