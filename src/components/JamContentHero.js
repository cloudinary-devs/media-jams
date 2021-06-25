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
  HStack,
  VStack,
  Avatar,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import format from 'date-fns/format';
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
  date,
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
          <VStack
            bg={{ base: 'none', lg: mode('primary.200', 'primary.800') }}
            flex="1"
            maxW={{ lg: 'xl' }}
            pt="6"
            borderStartRadius={{ base: '0', lg: '8px' }}
          >
            <Heading as="h2" size="H400" ml={{ base: '0', lg: 8 }}>
              {title}
            </Heading>
            <Spacer />
            <HStack color="grey.700">
              <Avatar name={author.name} src={author?.image?.asset?.url} />
              <Text fontSize="md">{author.name}</Text>
              <Text fontSize="md">
                <time dateTime={date}>
                  &middot; {format(new Date(date), 'dd MMMM')}
                </time>
              </Text>
            </HStack>
          </VStack>
          <Box flex="1">
            <Img
              pos="relative"
              w="50rem"
              src={imageUrl}
              alt="Banner Image for Hero"
              borderEndRadius={{ base: '0', lg: '8px' }}
              borderTopStartRadius={{ base: '8px', lg: 0 }}
              borderTopRadius={{ base: '8px', lg: null }}
            />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
