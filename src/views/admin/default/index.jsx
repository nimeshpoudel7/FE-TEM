
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormLabel,
  Heading,
  Icon,
  Select,
  SimpleGrid,
  Spacer,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import InputComponent from "components/fields/InputField";
import IconBox from "components/icons/IconBox";
import SelectComponent from "components/select";
import { UserOption } from "helper/constant";
import React from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import { useFetchDashboardData } from "service/partner/cp-service";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {

} from "views/admin/default/variables/columnsData";


const onChangeinput=(e) => {
  console.log(e.target.value)
}
const handleSelectChange = (selectedValue) =>{
  console.log(selectedValue)
}
export default function UserReports() {
  const {data}=useFetchDashboardData()
  
  console.log("aaaaaaa",data)

  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
    <SimpleGrid
    columns={{ base: 1, md: 1, lg: 1, "2xl": 1}}
    gap='20px'
    mb='20px'>
    <Flex minWidth='max-content' alignItems='center' gap='2' backgroundClip="border-box" bg="#ffffff" borderRadius ="20px"   p ="20px" position ="relative" width="100%"wordWrap= "break-word">
  <Box p='2'>
    <Heading size='sm'>Date Range</Heading>
  </Box>
  <Spacer />

<SelectComponent variants={"filled"} boxBg={boxBg} options={UserOption} onSelectChange={handleSelectChange}/>
</Flex>
  </SimpleGrid>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 4 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
              }
            />
          }
          name='Total Amount Added'
          value={`₹ ${data?.total_amount_added??0}`}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
              }
            />
          }
          name='Total Investment'
          value={`₹ ${data?.total_investment_amount ?? 0}`}
        />
        <MiniStatistics growth='+23%' name='Commission' value='$574.34' />
        <MiniStatistics
        startContent={
          <IconBox
            w='56px'
            h='56px'
            bg={boxBg}
            icon={
              <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
            }
          />
        }
          name='Estimate Portfolio Value'
          value={`₹ ${data?.fmpp_data?.total_portfolio_value ?? 0}`}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
              icon={<Icon w='28px' h='28px' as={MdAddTask} color='white' />}
            />
          }
          name='Active Investor'
          value={data?.total_active_investors??0}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name='Amount Witdrawn'
          value={`₹ ${data?.total_withdraw_amount}`}
        />
         <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name='Commission Earned'
          value={`₹ ${data?.commission_earned}`}
        />
         <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name='FMPP Maturities'
          value={data?.fmpp_maturities}
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <TotalSpent />
        <WeeklyRevenue />
      </SimpleGrid>
    </Box>
  );
}
