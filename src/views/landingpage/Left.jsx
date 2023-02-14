import {Box, Flex, Heading, Image, Text, VStack} from "@chakra-ui/react";
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

const Left = () => {
  return (
    <VStack
      h="100vh"
      background="linear-gradient(180deg, #3099DC 0%, #0E6CA8 100%)"
      backgroundColor="#0E6CA8"
      align="start"
      color="#FFF"
    >
      <Box>
        <Image src={Logo} alt="lendenLogo"></Image>
      </Box>
      {/* <Box>
        <Heading as="h2">
          Welcome to India's Largest Peer to Peer Lending Platform
        </Heading>
        <Text>
          20 lakh + Investors| 55Lakh + borrowers| 8000 crores+ disbursement
        </Text>
        <Text>
          Provide your customers an opportunity to diversify their funds and
          earn better returns with LenDenClub. Try now!
        </Text>
      </Box>
      <Box>
        <Heading as="h3"> Key reasons to partner with LenDenClub</Heading>
        <Flex justify="space-between">
        <Flex direction="column" align="center" jusitfy="center">
          <Image src={ReturnsLogo} alt="returns" h="65px" w="65px"/>
          <Heading as="h3">Consistent Returns</Heading>
          <Text  align="center"> Have consistently delivered 10%-12% p.a. in the last 5 years</Text>
        </Flex>
        <Flex direction="column" align="center" jusitfy="center">
          <Image src={ReturnsLogo} alt="returns" h="65px" w="65px"/>
          <Heading as="h3">Consistent Returns</Heading>
          <Text align="center"> Have consistently delivered 10%-12% p.a. in the last 5 years</Text>
        </Flex>
        <Flex direction="column" align="center" jusitfy="center">
          <Image src={ReturnsLogo} alt="returns" h="65px" w="65px"/>
          <Heading as="h3">Consistent Returns</Heading>
          <Text align="center"> Have consistently delivered 10%-12% p.a. in the last 5 years</Text>
        </Flex>
        </Flex> 
      </Box> */}
    </VStack>
  );
};

export default Left;
