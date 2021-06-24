import React from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Img,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import Image from '@components/Image';
import styled from '@emotion/styled';
import SocialGroup from '@components/SocialGroup';

const AuthorByline = styled(Text)`
  text-indent: 5px;
`;

import { buildImageUrl } from 'cloudinary-build-url';
const placeholderUrl = buildImageUrl('mediajams/placeholder', {
  cloud: { cloudName: 'mediadevs' },
  layout: 'fill',
  transformations: {
    resize: {
      height: 0.6,
    },
  },
});

export default function JamContentHero({
  description,
  title,
  author,
  imageUrl = placeholderUrl,
  children,
}) {
  return (
    <Box as="section" mt={{ base: '24px', md: '32px' }}>
      <Box
        maxW={{ base: 'xl', md: '7xl' }}
        mx="auto"
        px={{ base: '6', md: '8' }}
      >
        <Flex direction={{ base: 'column-reverse', lg: 'row' }} mb="20">
          <Box
            bg={{ base: 'none', md: mode('primary.200', 'primary.800') }}
            flex="1"
            maxW={{ lg: 'xl' }}
            pt="6"
            borderStartRadius={{ base: '0', md: '8px' }}
          >
            <Heading as="h2" size="H400" ml={{ base: '0', md: 8 }}>
              {title}
            </Heading>
          </Box>
          <Box flex="1">
            <Img
              pos="relative"
              marginEnd="-16rem"
              w="50rem"
              src={imageUrl}
              alt="Banner Image for Hero"
              borderEndRadius={{ base: '0', md: '8px' }}
              borderTopStartRadius={{ base: '8px', md: 0 }}
              borderTopRadius={{ base: '8px', md: null }}
            />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
