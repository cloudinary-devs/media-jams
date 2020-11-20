import React from 'react';

import {
  Button,
  useBreakpointValue,
  Heading,
  Text,
  Flex,
  Box,
} from '@chakra-ui/core';

import Container from '@components/Container';
import Image from '@components/Image';
import RawkButton from '@components/RawkButton';

export default function Hero({ heroImage }) {
  const headings = useBreakpointValue({
    base: 'md',
    md: 'xl',
    lg: '2xl',
  });

  return (
    <Flex
      h="xl"
      direction="column"
      backgroundColor="grey.900"
      justifyContent="center"
      alignItems="center"
    >
      <Heading mt={16} as="h1" textStyle="headline-page" color="yellow.900">
        TRYING TO LEARN EVERYTHING ABOUT MEDIA IS HARD
      </Heading>
      <Image alignSelf="center" mt={8} src={heroImage} />
    </Flex>
  );
}
