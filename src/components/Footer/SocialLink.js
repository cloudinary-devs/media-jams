import { chakra, HTMLChakraProps, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

export const SocialLink = (props) => (
  <chakra.a
    rounded="lg"
    w="10"
    h="10"
    fontSize="xl"
    display="flex"
    alignItems="center"
    justifyContent="center"
    transition="all 0.2s"
    color="grey.700"
    _hover={{
      bg: useColorModeValue('gray.100', 'whiteAlpha.100'),
      color: useColorModeValue('grey.900', 'grey.300'),
    }}
    {...props}
  />
);
