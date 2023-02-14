import React from "react";
import Header from "./Header";
import {
  Accordion,
  Box,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import Personal from "./Personal";
import BankDetails from "./BankDetails";
import UploadDocuments from "./UploadDocuments";

const KYC = () => {
  return (
    <>
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
        <div>
          <Accordion allowToggle>
            <Personal />
            <BankDetails />
            <UploadDocuments />
          </Accordion>
        </div>
      </Box>
    </>
  );
};

export default KYC;
