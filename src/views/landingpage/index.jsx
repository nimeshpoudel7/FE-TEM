import React from "react";
import Left from "./Left";
import Right from "./Right";
import {Box} from "@chakra-ui/react";
import Card from "components/card/Card";

const LandingPage = () => {
  return (
    
    <Box w={"100%"} h="100%" display="flex" flexDirection={"column"} className="hh">
     <Box display={{sm:"none",lg:"none"}} flex={0.55}><Left /></Box> 
     <Box flex={{lg:0.45,sm:1}}><Right /></Box>
    </Box>
  );
};

export default LandingPage;
