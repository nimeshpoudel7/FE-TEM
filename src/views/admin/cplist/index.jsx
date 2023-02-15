
import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "components/dataTable/index";


import {
  CPColumns,
} from "views/admin/dataTables/variables/columnsData";

import React from "react";
import { useFetchCPList } from "service/partner/cp-service";
import { useHistory } from "react-router-dom";



export default function CPList() {
  const navigate=useHistory()
  const{data}=useFetchCPList()
  console.log("aaaaa",data)
  let title="Patner"
  
  const addPartner=()=>{
    navigate.push("/auth/cp-sign-in")
  }
  
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
      mb='20px'
      columns={{ sm: 1, md: 1 }}
      spacing={{ base: "20px", xl: "20px" }}>
      <DevelopmentTable
        columnsData={CPColumns}
        tableData={data?.cp_list||[]}
        title={title}
        buttonTitle="Add Partner"
        buttonOnclick={addPartner}
        
      />
    </SimpleGrid>
    </Box>
  );
}
