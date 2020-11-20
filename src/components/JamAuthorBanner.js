import React from 'react';

import {
  Button,
  useBreakpointValue,
  Heading,
  Text,
  Flex,
  Box,
  Image,
  HStack,
} from '@chakra-ui/core';
import { useImage } from 'use-cloudinary';

export default function JamAuthorBanner({ children }) {
  const headings = useBreakpointValue({
    base: 'md',
    md: 'xl',
    lg: '2xl',
  });

  const { generateImageUrl } = useImage('mediadevs');
  const imgConfig = {
    delivery: {
      publicId: 'mediajams/placeholder',
    },
    transformation: {
      height: 0.8,
    },
  };

  return (
    <Flex h="md" direction="row" justifyContent="center" alignItems="center">
      <Box
        height="100%"
        width="80%"
        backgroundColor="black"
        position="relative"
      >
        <Box
          height="50%"
          width="100vw"
          backgroundColor="yellow.400"
          position="absolute"
          top="50%"
          left="calc(-50vw + 50%)"
          transform="translateY(-50%)"
        >
          <Flex
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            {children}
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
