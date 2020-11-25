import React from 'react';

import {
  Button,
  useBreakpointValue,
  Heading,
  Spacer,
  Flex,
  Box,
} from '@chakra-ui/core';
import { useImage } from 'use-cloudinary';
import Image from '@components/Image';

export default function Hero() {
  const { generateImageUrl } = useImage('mediadevs');
  const imgConfig = {
    delivery: {
      publicId: 'mediajams/hero',
    },
    transformation: {
      height: 0.8,
    },
  };
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
      justifyContent="space-between"
      alignItems="center"
    >
      <Heading mt={16} as="h1" textStyle="headline-page" color="yellow.900">
        Putting Media to Work
      </Heading>
      <Heading as="h1" textStyle="headline-page" color="yellow.900">
        is Hard
      </Heading>
      <Box pt="8rem" flex={{ sm: 1, base: 0 }} boxSize="xl">
        <Image alt="Feature Image" src={generateImageUrl(imgConfig)} />
      </Box>
      <Spacer backgroundColor="white" />
    </Flex>
  );
}
