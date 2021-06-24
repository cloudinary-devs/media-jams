import React from 'react';

import {
  Button,
  useBreakpointValue,
  Heading,
  Text,
  Flex,
  Box,
  HStack,
  VStack,
  Avatar,
} from '@chakra-ui/react';
import Image from '@components/Image';
import styled from '@emotion/styled';
import SocialGroup from '@components/SocialGroup';

const AuthorByline = styled(Text)`
  text-indent: 5px;
`;

import Container from '@components/Container';
import RawkButton from '@components/RawkButton';
import { buildImageUrl } from 'cloudinary-build-url';
const placeholderUrl = buildImageUrl('mediajams/placeholder', {
  cloud: { cloudName: 'mediadevs' },
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
  const isMobile = useBreakpointValue({
    base: true,
    md: true,
    lg: false,
  });

  return (
    <>
      {isMobile ? (
        <Flex
          h={{ base: 'lg', md: 'lg' }}
          direction={{ base: 'column', md: 'row', lg: 'row' }}
          justifyContent="center"
          alignItems="center"
          backgroundImage={`url(${imageUrl})`}
          backgroundSize="cover"
        >
          <VStack align="center" backgroundColor="blue.200" opacity="90%">
            <Heading as="h1" fontSize="4xl" textStyle="headline-accent" pt={4}>
              {title}
            </Heading>
            <Text maxWidth="80%">{description}</Text>
            <HStack align="start" color="grey.900" my={4} px={4}>
              <Avatar
                size="md"
                alt={author.name}
                src={author.image.asset.url}
              />
              <VStack spacing="0">
                <Heading mt={4} fontSize="md" textStyle="headline-accent">
                  {author.name}
                </Heading>
                <Text fontSize="xs">Media Developer Expert, Developer 🥑</Text>
              </VStack>
            </HStack>
          </VStack>
        </Flex>
      ) : (
        <Flex
          h="lg"
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {/* <Image
            src={imageUrl}
            objectfit="contain"
            layout="fill"
            alt="Feature Image"
            container={{
              flexGrow: 1,
              position: 'relative',
              height: 300,
            }}
          /> */}
          <HStack height="100%" width="100%" flex={2} zIndex={{ xl: 3 }}>
            <VStack align="stretch" flex={1}>
              <Box backgroundColor="yellow.400" height="100%" py={4}>
                <Box
                  backgroundColor="blue.200"
                  ml="-10%"
                  width="110%"
                  display="block"
                  py={4}
                >
                  <Box color="grey.900" my={4} pl={4}>
                    <Heading as="h1" fontSize="4xl" textStyle="headline-accent">
                      {title}
                    </Heading>
                    <AuthorByline fontSize="xs">By {author?.name}</AuthorByline>
                    <Text maxWidth="80%">{description}</Text>
                  </Box>
                </Box>
              </Box>
            </VStack>
          </HStack>
        </Flex>
      )}
    </>
  );
}
