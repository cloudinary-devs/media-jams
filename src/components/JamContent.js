import React from 'react';
import { VStack, chakra, Flex } from '@chakra-ui/react';

const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '');
const rem = (px) => `${round(px / 16)}rem`;
const em = (px, base) => `${round(px / base)}em`;
/**
 * Can override any general styles set for jam content"
 * in the `styled(Box)` -->
 * */

export default function JamContent({ children }) {
  return (
    <Flex
      w="full"
      direction="column"
      pb="12"
      pt="3"
      maxW={{ base: 'xl', md: '7xl' }}
      mx="auto"
      px={{ base: '6', md: '8' }}
    >
      {children}
    </Flex>
  );
}
