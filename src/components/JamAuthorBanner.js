import React from 'react';
import {
  Button,
  useBreakpointValue,
  Heading,
  Text,
  Flex,
  Box,
  HStack,
  Img,
  ButtonGroup,
  IconButton,
} from '@chakra-ui/react';
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaTwitter,
} from 'react-icons/fa';
import BlockContent from '@sanity/block-content-to-react';
import { buildImageUrl } from 'cloudinary-build-url';
import styled from '@emotion/styled';
import Image from '@components/Image';

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
                objectFit="cover"
                src={author.image.asset.url}
                alt={author.name}
              />
              <Box color="grey.900" my={4} pl={4}>
                <Heading mt={4} fontSize="4xl" textStyle="headline-accent">
                  {author.name}
                </Heading>
                <Text fontSize="xs">
                  By Media Developer Expert, Developer 🥑
                </Text>
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
              <BlockContent blocks={author.bioRaw} />
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
          <Flex alignItems="center" justifyContent="center" height="100%">
            <Img
              objectFit="cover"
              width={{ md: 72 }}
              height={{ md: 72 }}
              flex="1 1 auto"
              src={author.image.asset.url}
              alt={author.name}
            />
            <Box backgroundColor="blue.200" my={4} flex="2 1 auto">
              <Flex color="grey.900" my={2} ml={{ md: 6 }}>
                <Heading
                  flexBasis="50%"
                  as="h1"
                  fontSize="4xl"
                  textStyle="headline-accent"
                >
                  {author.name}
                </Heading>
                <ButtonGroup ml="auto" color="gray.600" variant="ghost">
                  <IconButton
                    as="a"
                    href="www.google.com"
                    aria-label="LinkedIn"
                    icon={<FaLinkedin />}
                  />
                  <IconButton
                    as="a"
                    href="www.google.com"
                    aria-label="LinkedIn"
                    icon={<FaGithub />}
                  />
                  <IconButton
                    as="a"
                    href="www.google.com"
                    aria-label="LinkedIn"
                    icon={<FaTwitter />}
                  />
                </ButtonGroup>
              </Flex>
              <Box color="grey.900" my={2} ml={{ md: 6 }}>
                <Text pb={4} fontSize="xs">
                  By Media Developer Expert, Developer 🥑
                </Text>
                <Text maxWidth="90%">
                  <BlockContent blocks={author.bioRaw} />
                </Text>
              </Box>
            </Box>
          </Flex>
        </Box>
      )}
    </Flex>
  );
}
