import React from 'react';
import {
  Button,
  useBreakpointValue,
  Heading,
  Text,
  Flex,
  Box,
  HStack,
} from '@chakra-ui/react';
import Image from '@components/Image';
import { FaFacebook, FaTwitter, FaGlobe } from 'react-icons/fa';
import BlockContent from '@sanity/block-content-to-react';
import { buildImageUrl } from 'cloudinary-build-url';
import styled from '@emotion/styled';

const AuthorByline = styled(Text)`
  text-indent: 5px;
`;

export default function JamAuthorBanner({ author }) {
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  const placeholder = buildImageUrl('mediajams/placeholder', {
    cloud: {
      cloudName: 'mediadevs',
    },
    transformations: {
      resize: {
        height: 0.8,
      },
    },
  });

  return (
    <Flex
      h="md"
      direction="row"
      justifyContent="center"
      alignItems="center"
      my={8}
    >
      {isMobile ? (
        <Box
          height="50%"
          width="100%"
          backgroundColor="grey.900"
          position="relative"
        >
          <Box
            height="40%"
            width="100vw"
            backgroundColor="yellow.400"
            position="absolute"
            top="30%"
            left="calc(-50vw + 50%)"
            transform="translateY(-50%)"
          >
            <HStack
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <Image
                width="130px"
                height="auto"
                ml="15px"
                mt="-10px"
                alignSelf="start"
                cloudName="mediadevs"
                publicId={author.image}
                alt={author.name}
              />
              <Box color="grey.900" my={4} pl={4}>
                <Heading mt={4} fontSize="4xl" textStyle="headline-accent">
                  {author.name}
                </Heading>
                <AuthorByline fontSize="xs">
                  By Media Developer Expert, Developer 🥑
                </AuthorByline>
                <HStack spacing="0" direction="row" position="absolute" pt={4}>
                  <Button
                    colorScheme="grey.900"
                    leftIcon={<FaFacebook />}
                  ></Button>
                  <Button
                    colorScheme="grey.900"
                    leftIcon={<FaGlobe />}
                  ></Button>
                  <Button
                    colorScheme="grey.900"
                    leftIcon={<FaTwitter />}
                  ></Button>
                </HStack>
              </Box>
            </HStack>
            <Box textColor="white" background="grey.900" px={4} pb={8} pt={4}>
              <BlockContent blocks={author.bio} />
            </Box>
          </Box>
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
                  objectFit="contain"
                  layout="fill"
                  cloudName="mediadevs"
                  publicId={author.image}
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
