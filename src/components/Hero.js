import React from 'react';

import {
  Button,
  useBreakpointValue,
  Heading,
  Text,
  Flex,
} from '@chakra-ui/core';

import Container from '@components/Container';
import Image from '@components/Image';

export default function Hero({ heroImage }) {
  const headings = useBreakpointValue({
    base: 'md',
    md: 'xl',
    lg: '2xl',
  });

  return (
    <Flex justifyContent="center" alignItems="center" height="800px" m={32}>
      <Flex direction="column" textAlign="">
        <Heading mt={16} as="h1">
          Learning Media is hard MediaJams will fix that 👍
        </Heading>
        <Text mt={6}>
          With MediaJams, we connect you with the code that gets you working
          faster and the experts that teach it
        </Text>
        <Button w="140px" mt={8} p={8}>
          Learn More
        </Button>
      </Flex>
      <Image alignSelf="center" mt={8} src={heroImage} />
    </Flex>
  );
}
