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
} from '@chakra-ui/react';
import { useImage } from 'use-cloudinary';

import Container from '@components/Container';
import RawkButton from '@components/RawkButton';

export default function JamDetailHero({ children }) {
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
    <Flex h="lg" direction="row" justifyContent="center" alignItems="center">
      <Box flex={{ sm: 1, base: 0 }} boxSize="sm" overflow="hidden">
        <Image
          maxWidth="100%"
          alt="Feature Image"
          src={generateImageUrl(imgConfig)}
        />
      </Box>
      <HStack height="100%" width="100%" flex={2}>
        {children}
      </HStack>
    </Flex>
  );
}
