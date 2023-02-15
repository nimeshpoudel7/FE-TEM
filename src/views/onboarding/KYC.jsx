import React, { useState } from "react";
import Header from "./Header";
import {
  Accordion,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import Personal from "./Personal";
import BankDetails from "./BankDetails";
import UploadDocuments from "./UploadDocuments";
import Card from "components/card/Card";
import { useFetchPersonalDetails } from "service/kyc";
import { useFetchBankDetails } from "service/kyc";
import { useFetchDocumentDetails } from "service/kyc";
import TokenService from "service/service-token";
import CompanyDetails from "./CompanyDetails";
import { useFetchChecklistDetails } from "service/kyc";
import ModalComponent from "components/modal";
import { AiFillCheckCircle } from "react-icons/ai";
const KYC = () => {
  const[modalOpen,setModalOpen]=useState(false)
  
  const userDetails=TokenService.getUserDetails()
  console.log(userDetails)
  const {data:personalData}=useFetchPersonalDetails(userDetails?.user_id)
  const {data:bankData}=useFetchBankDetails(userDetails?.user_id)
  const Document=useFetchDocumentDetails(userDetails?.user_id)
  const {data:checklistData}=useFetchChecklistDetails()
  
  console.log("checklist",checklistData?.check_list?.status )
const [stepper, setStepper] = useState([0])
  const handleSelectChange=(data)=>{
    setStepper(data)
  }
  const completeOnBoarding=()=>{
    setModalOpen(!modalOpen)
  }
  return (
   <Box>
      <Header />
      <ModalComponent modalOpen={modalOpen} onClose={completeOnBoarding} >
        <Flex justify="center" align="center" direction="column"gap={5}>
        <Icon as={AiFillCheckCircle} width='65px' height='65px' color='green' />
       <Heading as="h3">Profile Completed</Heading>
          <Text align="center" >
          Congratulations! . We are glad to have you as a channel partner. Please give us some time to verify your account. You will receive an email once your account has been activated.
          </Text>
          <Button
            fontSize="sm"
            variant="brand"
            fontWeight="500"
            w={{ sm: "100%" }}
            h="50"
            mt="5px"
            mb="24px"
            type="submit"
            disabled={checklistData?.check_list?.status==="PENDING"}
            onClick={completeOnBoarding}
          >
            LOGOUT
          </Button>
        </Flex>
      </ModalComponent>
      <Box mx={{sm:"5px",lg:"300px"}}>
        <Flex justify="center" align="center" direction="column">
          <Heading as="h2" size="md">
            Welcome {personalData?.first_name}
          </Heading>
          <Text size="sm">
            {" "}
            Please complete your onboarding in next few steps
          </Text>
        </Flex>
        <Card>
          <Accordion allowToggle defaultIndex={stepper}  >
            <Personal personalData={personalData?personalData:""} userId={userDetails?.user_id}  onSelectChange={handleSelectChange}/>
            {personalData?.user_type==="HUF"&&
              <CompanyDetails  userId={userDetails?.user_id}  onSelectChange={handleSelectChange}/>
            }
            <BankDetails bankData={bankData?bankData:""} onSelectChange={handleSelectChange} userId={userDetails?.user_id} />
            <UploadDocuments UserDetails={personalData?personalData:""} userId={userDetails?.user_id} onSelectChange={handleSelectChange} stepper={stepper}/>
          </Accordion>
          <Button
            fontSize="sm"
            variant="brand"
            fontWeight="500"
            w={{ sm: "100%", lg: "30%" }}
            h="50"
            mt="5px"
            mb="24px"
            type="submit"
            disabled={checklistData?.check_list?.status==="PENDING"}
            onClick={completeOnBoarding}
          >
            Save and Continue
          </Button>
        </Card>
      </Box>
  </Box>
  );
};

export default KYC;


