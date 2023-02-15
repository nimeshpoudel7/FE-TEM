/* eslint-disable */
import {
  Box,
  Button,
  Flex,
  Icon,
  Menu,
  IconButton,
  MenuButton,
  MenuItem,
  MenuList,
  Progress,
  Select,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import InputComponent from "components/fields/InputField";
import { AndroidLogo, AppleLogo, WindowsLogo } from "components/icons/Icons";
import BannerModalinf from "components/menu/MainMenu";
import Menus from "components/menu/MainMenu";
import React, { useMemo } from "react";
import {
  MdOutlineCalendarToday,
  MdOutlineNavigateNext,
  MdOutlineNavigatePrevious,
} from "react-icons/md";
import { GrPrevious, GrNext } from "react-icons/gr";

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { ChevronDownIcon } from "@chakra-ui/icons";
import useWindowDimensions from "helper";
import theme from "theme/theme";

export default function DataTables(props) {
  const { columnsData, tableData, title } = props;
  const { height, width } = useWindowDimensions();
  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
    setGlobalFilter,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance;
  initialState.pageSize = 11;
  console.log(width,theme.breakpoints.md)
   if(width<parseFloat(theme.breakpoints.md)){
    console.log("heyyy")
    initialState.hiddenColumns= "email,mobile_number,created_date,money_added,type,id,type,balance" 
   }
  
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("secondaryGray.500", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const inputBg = useColorModeValue("secondaryGray.300", "navy.900");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");

  const handleFilterInputChange = (
    e: React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  ) => {
    const { value } = e.currentTarget;
    setGlobalFilter(value);
  };
  console.log(data,"datadata")
  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "hidden", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          {title}
        </Text>
        <Menus />
        <InputComponent
          id={1}
          placeholder="Search"
          onChange={handleFilterInputChange}
        />

        <BannerModalinf />
      </Flex>
      <Flex px="25px" mb="20px" align="center">
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            bgColor={inputBg}
            fontSize="sm"
            fontWeight="500"
            color={textColorSecondary}
            onSelect={(e)=>{console.log(e)}}
            leftIcon={<MdOutlineCalendarToday />}
          >
            This Month
          </MenuButton>
         {/* <MenuList>
            <MenuItem>Download</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem>Attend a Workshop</MenuItem>
  </MenuList> */}
        </Menu>
        <Menus />

        <BannerModalinf />
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead>
          {headerGroups?.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers?.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  // pe="10px"
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page?.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row?.cells?.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "Name") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell?.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "TECH") {
                    data = (
                      <Flex align="center">
                        {cell?.value?.map((item, key) => {
                          if (item === "apple") {
                            return (
                              <AppleLogo
                                key={key}
                                color={iconColor}
                                me="16px"
                                h="18px"
                                w="15px"
                              />
                            );
                          } else if (item === "android") {
                            return (
                              <AndroidLogo
                                key={key}
                                color={iconColor}
                                me="16px"
                                h="18px"
                                w="16px"
                              />
                            );
                          } else if (item === "windows") {
                            return (
                              <WindowsLogo
                                key={key}
                                color={iconColor}
                                h="18px"
                                w="19px"
                              />
                            );
                          }
                        })}
                      </Flex>
                    );
                  } else if (cell.column.Header === "DATE") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.Header === "PROGRESS") {
                    data = (
                      <Flex align="center">
                        <Text
                          me="10px"
                          color={textColor}
                          fontSize="sm"
                          fontWeight="700"
                        >
                          {cell.value}%
                        </Text>
                        <Progress
                          variant="table"
                          colorScheme="brandScheme"
                          h="8px"
                          w="63px"
                          value={cell.value}
                        />
                      </Flex>
                    );
                  }else if (cell.column.Header === "Action") {
                    data = (
                      <Flex align="center" onClick={(row)=>{props?.OnRedirect(cell?.row?.original)}}   _hover={{ cursor: "pointer" }}>
                      <Badge ml="1" fontSize="0.8em" colorScheme="green">
                      More
                    </Badge>
                      </Flex>
                    );
                  }
                  
                  else{
                    data = (
                      <Flex align="center">
                        <Text
                          color={textColor}
                          fontSize="sm"
                          fontWeight="700"
                        >
                          {cell.value}
                        </Text>
                        {/* <Progress
                          variant="table"
                          colorScheme="brandScheme"
                          h="8px"
                          w="63px"
                          value={cell.value}
                        /> */}
                      </Flex>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Stack direction="column">
        <Flex
          gap="20px"
          align="center"
          justify={"center"}
          me="20px"
          ms={{ base: "24px", md: "0px" }}
          mt={{ base: "20px", md: "0px" }}
        >
          <IconButton
            variant="action"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            icon={<GrPrevious color="brand.500" />}
          />
          <IconButton
            icon={<GrNext color="brand.500" />}
            variant="action"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          />
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <Select
            fontSize="sm"
            variant="subtle"
            width="unset"
            fontWeight="700"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </Flex>
      </Stack>{" "}
    </Card>
  );
}
