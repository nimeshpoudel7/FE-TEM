import {Box, Container, Flex, Heading, Image, SimpleGrid, Stack, Text, VStack,  StackDivider,
  Icon,
  useColorModeValue,} from "@chakra-ui/react";
import React from "react";
import Logo from "assets/img/landingpage/brandLogoWhite.png";
import CommissionLogo from "assets/img/landingpage/C1000.png";
import ReturnsLogo from "assets/img/landingpage/consistentReturns.png";
import FullReturnLogo from "assets/img/landingpage/fullReturn.png";
import ImmuneLogo from "assets/img/landingpage/Immune.png";
import P2PLogo from "assets/img/landingpage/LargestP2P.png";
import DashbordLogo from "assets/img/landingpage/pDashboard.png";
import RBILogo from "assets/img/landingpage/RBI.png";
import SaferLogo from "assets/img/landingpage/safer.png";
import {
  IoAnalyticsSharp,
  IoLogoBitcoin,
  IoSearchSharp,
} from 'react-icons/io5';
import { ReactElement } from 'react';
import Card from "components/card/Card";
const Feature = ({ text, icon, iconBg }) => {
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");

  return (
    <Stack direction={'row'} align={'center'}>
      <Flex
        w={8}
        h={8}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={iconBg}>
        {icon}
      </Flex>
      <Text color={textColorDetails} fontWeight={600}>{text}</Text>
    </Stack>
  );
};

const Left = () => {
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = useColorModeValue("gray.400");
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  return (
    <VStack
      h="100vh"
      background="linear-gradient(180deg, #3099DC 0%, #0E6CA8 100%)"
      backgroundColor="#0E6CA8"
      align="start"
      color="#FFF"
      mx={{base: "auto", lg: "0px"}}
      me="7"
      px={7}
    >
      <Box>
        <Image src={Logo} alt="lendenLogo"></Image>
      </Box>
      <Card >
      <Container maxW={'5xl'} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}>
            Our Story
          </Text>
          <Heading  color={textColor} fontSize='36px' mb='10px'>A digital Product design agency</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.100', 'gray.700')}
              />
            }>
            <Feature
              icon={
                <Icon as={IoAnalyticsSharp} color={'yellow.500'} w={5} h={5} />
              }
              iconBg={useColorModeValue('yellow.100', 'yellow.900')}
              text={'Business Planning'}
            />
            <Feature
              icon={<Icon as={IoLogoBitcoin} color={'green.500'} w={5} h={5} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'Financial Planning'}
            />
            <Feature
              icon={
                <Icon as={IoSearchSharp} color={'purple.500'} w={5} h={5} />
              }
              iconBg={useColorModeValue('purple.100', 'purple.900')}
              text={'Market Analysis'}
            />
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={'md'}
            alt={'feature image'}
            src={
              'https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
            objectFit={'cover'}
          />
        </Flex>
      </SimpleGrid>
    </Container>
    </Card>
    </VStack>
  );
};

export default Left;
