import React from 'react'
import Logo from "assets/img/landingpage/brand_logo.png"
import { Flex, Heading, Image } from '@chakra-ui/react'

const Header = () => {
  return (
    <Flex justify="space-between" align="center" mx={5} p={5}>
    <Image src={Logo} alt="lenden"/>
    <Heading as="h3" color="blue.400" size='sm'>LOGOUT</Heading>
    </Flex>
  )
}

export default Header