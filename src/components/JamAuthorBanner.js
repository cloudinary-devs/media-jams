import React from 'react';
import {
  Button,
  useBreakpointValue,
  Heading,
  Text,
  Flex,
  Box,
  Image,
  VStack,
  HStack,
} from '@chakra-ui/react';
import BlockContent from '@sanity/block-content-to-react';
import { useImage } from 'use-cloudinary';
import styled from '@emotion/styled';

const AuthorByline = styled(Text)`
  text-indent: 5px;
`;

export default function JamAuthorBanner({ author }) {
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
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
    <Flex
      h="md"
      direction="row"
      justifyContent="center"
      alignItems="center"
      my={8}
    >
      {isMobile ? (
        <Box backgroundColor="grey.900">
          <VStack alignItems="stretch">
            <HStack spacing="0px" mt={6}>
              <Box
                my={4}
                backgroundColor="yellow.400"
                w={10}
                alignSelf="stretch"
              />
              <Image
                fit="contain"
                width="120px"
                src={author.image}
                alt={author.name}
              />
              <VStack mx="0" alignSelf="stretch">
                <Box my={4} backgroundColor="yellow.400" alignSelf="stretch">
                  <Heading
                    as="h1"
                    fontSize="4xl"
                    textStyle="headline-card"
                    textColor="grey.900"
                  >
                    {author.name}
                  </Heading>
                  <AuthorByline fontSize="xs">
                    By Media Developer Expert, Developer 🥑
                  </AuthorByline>
                </Box>
              </VStack>
            </HStack>
            <Text maxWidth="90%" textColor="white">
              <BlockContent blocks={author.bio} />
            </Text>
          </VStack>
        </Box>
      ) : (
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
              <Box boxSize="sm" overflow="hidden">
                <Image
                  fit="contain"
                  width="100%"
                  src={author.image}
                  alt={author.name}
                />
              </Box>
              <Box backgroundColor="blue.200" py={4} maxWidth="50%">
                <Box color="grey.900" my={4} pl={4}>
                  <Heading as="h1" fontSize="4xl" textStyle="headline-accent">
                    {author.name}
                  </Heading>
                  <AuthorByline fontSize="xs">
                    By Media Developer Expert, Developer 🥑
                  </AuthorByline>
                  <Text maxWidth="80%">
                    <BlockContent blocks={author.bio} />
                  </Text>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>
      )}
    </Flex>
  );
}
