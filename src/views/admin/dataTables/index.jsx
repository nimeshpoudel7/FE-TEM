
import { Box, Button, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import DevelopmentTable from "components/dataTable/index";


import {
  columnsDataDevelopment,
} from "views/admin/dataTables/variables/columnsData";

import React, { useEffect, useState } from "react";
import { useFetchInvestorList } from "service/investor/invester-service";
import TokenService from "service/user-service";
import ModalComponent from "components/modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "components/forms/TextInput";
import * as Yup from "yup";
import { useSendPayment } from "service/investor/invester-service";

const schema = Yup.object().shape({
    amount:Yup.string().required("Amount  is required"),
    name:Yup.string().required(" Name is required"),
    mobile_number:Yup.string().required("Mobile Number is required")
});
export default function Settings() {
  const{data}=useFetchInvestorList()
  const {mutateAsync:sendLink}=useSendPayment()
  const [funding, setFunding] = useState("")
  const[modalOpen,setModalOpen]=useState(false)
  let title="Master Channel Patner"
  const OnRedirect=(data)=>{
    const token=TokenService.getAuthTokenDetails()
    const{id}=data
    const url =`https://qa-be.lendenclub.com/app/lpm-channelpartner/lender-details/fmpp/${id}?token=${token}`
    window.open(url,'_blank');


  }
  const closeModal=()=>{
    setModalOpen(false)
  }
  const addFund=(data)=>{
    console.log(data)
    setFunding({...data})
    setModalOpen(true)
  }
  const {
    control,
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    const defaultValues = {
      amount :"",
      mobile_number:funding?.mobile_number??"",
      name:funding?.name ??""
    };
    reset(defaultValues)
  }, [funding,reset])
  const onSubmitHandler = async(data) => {
    console.log(data)
    const body={
      investment_amount:data?.amount,
      investor_user_id:funding?.user_id
    }
    const response = await sendLink(body)
    closeModal()

  };
  console.log(modalOpen)
  console.log(funding)
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
    <ModalComponent modalOpen={modalOpen} onClose={closeModal} >
    <Flex justify="center" align="center" direction="column"gap={5}>
    <Heading  fontSize='15px'>
    Payment Link for Investor
  </Heading>
      <Text align="center" >
      Enter the amount of funds for creating payment link.
      </Text>
      </Flex>
      <Flex
      zIndex='2'
      direction='column'
      w={{ base: "100%", md: "420px" }}
      maxW='100%'
      background='transparent'
      borderRadius='15px'
      mx={{ base: "auto", lg: "unset" }}
      me='auto'
      my={{ base: "20px", md: "20px" }}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
      
      <TextInput
      name="name"
      control={control}
      type="text"
      label="Name of the investor"
      disabled
      />
      <TextInput
        name="mobile_number"
        control={control}
        type="number"
        label="Mobile Number"
        placeholder="Mobile number"
        disabled
      />

      <TextInput
      name="amount"
      control={control}
      type="number"
      label="Funds to be added"

      />
      <Button
        fontSize="sm"
        variant="brand"
        fontWeight="500"
        w="100%"
        h="50"
        mb="24px"
        type="submit"
      >
        Create Account
      </Button>
    </form>
    </Flex>
  </ModalComponent>
      <SimpleGrid
      mb='20px'
      columns={{ sm: 1, md: 1 }}
      spacing={{ base: "20px", xl: "20px" }}>
      <DevelopmentTable
        columnsData={columnsDataDevelopment}
        tableData={data?.investor_list||[]}
        title={title}
        OnRedirect={OnRedirect}
        addFund={addFund}
      />
    </SimpleGrid>
    </Box>
  );
}
