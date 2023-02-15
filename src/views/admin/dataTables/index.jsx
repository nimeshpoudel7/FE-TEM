
import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "components/dataTable/index";


import {
  columnsDataDevelopment,
} from "views/admin/dataTables/variables/columnsData";

import React from "react";
import { useFetchInvestorList } from "service/investor/invester-service";
import TokenService from "service/user-service";


export default function Settings() {
  const{data}=useFetchInvestorList()
  
  console.log("data",data)
  let title="Master Channel Patner"
  const OnRedirect=(data)=>{
    const token=TokenService.getAuthTokenDetails()
    const{id}=data
    const url =`https://qa-be.lendenclub.com/app/lpm-channelpartner/lender-details/fmpp/${id}?token=${token}`
    window.open(url,'_blank');


  }
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
      mb='20px'
      columns={{ sm: 1, md: 1 }}
      spacing={{ base: "20px", xl: "20px" }}>
      <DevelopmentTable
        columnsData={columnsDataDevelopment}
        tableData={data?.investor_list||[]}
        title={title}
        OnRedirect={OnRedirect}
      />
    </SimpleGrid>
    </Box>
  );
}
