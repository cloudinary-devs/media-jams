import React from 'react';

import {
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Flex,
} from '@chakra-ui/core';

import Image from '@components/Image';

export default function Hero({ heroImage }) {
  const headings = useBreakpointValue({
    base: 'md',
    md: 'xl',
    lg: '2xl',
  });

  return (
    <Stack alignItems="center">
      <Flex w={['90%', '80%', '70%']} direction="column" textAlign="center">
        <Heading mt={16} mx={16} as="h1" size={headings}>
          Learning Media is hard MediaJams will fix that 👍
        </Heading>
        <Text mt={6}>
          With MediaJams, we connect you with the code that gets you working
          faster and the experts that teach it
        </Text>
      </Flex>
      <Image alignSelf="center" w="70%" mt={8} src={heroImage} />
    </Stack>
  );
}
