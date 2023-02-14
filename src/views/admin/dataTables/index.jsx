
// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "components/dataTable/index";
// import CheckTable from "views/admin/dataTables/components/CheckTable";
// import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
// import ComplexTable from "views/admin/dataTables/components/ComplexTable";

import {
  columnsDataDevelopment,
  // columnsDataCheck,
  // columnsDataColumns,
  // columnsDataComplex,
} from "views/admin/dataTables/variables/columnsData";
import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment.json";
// import tableDataCheck from "views/admin/dataTables/variables/tableDataCheck.json";
// import tableDataColumns from "views/admin/dataTables/variables/tableDataColumns.json";
// import tableDataComplex from "views/admin/dataTables/variables/tableDataComplex.json";
import React from "react";
import { useFetchInvestorList } from "service/investor-list";

export default function Settings() {
  const{data}=useFetchInvestorList()
  console.log("data",data)
  // Chakra Color Mode
  let title="Master Channel Patner"
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/*
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}>
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        />
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
      </SimpleGrid>
       */}

      <SimpleGrid
      mb='20px'
      columns={{ sm: 1, md: 1 }}
      spacing={{ base: "20px", xl: "20px" }}>
      <DevelopmentTable
        columnsData={columnsDataDevelopment}
        tableData={tableDataDevelopment}
        title={title}
      />
    </SimpleGrid>
    </Box>
  );
}
