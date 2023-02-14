import React from 'react'
import Logo from "assets/img/landingpage/brand_logo.png"
import { Flex, Heading, Image } from '@chakra-ui/react'

const Header = () => {
  return (
    <Flex justify="space-between" align="center" mx={5} p={5}>
    <Image src={Logo} alt="lenden"/>
    </Flex>
  )
}

export default Header