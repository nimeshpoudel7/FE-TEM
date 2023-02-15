
import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "components/dataTable/index";


import {
  columnsDataDevelopment,
} from "views/admin/dataTables/variables/columnsData";

import React from "react";
import { useFetchInvestorList } from "service/investor/invester-service";


export default function Settings() {
  const{data}=useFetchInvestorList()
  
  console.log("data",data)
  let title="Master Channel Patner"
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
      />
    </SimpleGrid>
    </Box>
  );
}
