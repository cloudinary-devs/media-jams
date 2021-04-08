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
  Image,
  ButtonGroup,
  IconButton,
  Avatar,
  Spacer,
  VStack,
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

import SocialGroup from '@components/SocialGroup';

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
    <Flex h="md" justifyContent="center" alignItems="center" my={8}>
      {isMobile ? (
        <Box>
          <HStack align="start" color="grey.900" my={4} px={4}>
            <Avatar size="2xl" alt={author.name} src={author.image.asset.url} />
            <VStack spacing="0" pt={4}>
              <Heading mt={4} fontSize="4xl" textStyle="headline-accent">
                {author.name}
              </Heading>
              <Text fontSize="xs">Media Developer Expert, Developer 🥑</Text>
              <ButtonGroup alignSelf="start" color="gray.600" variant="ghost">
                <SocialGroup />
              </ButtonGroup>
            </VStack>
          </HStack>
          <VStack align="center" px={4}>
            <BlockContent blocks={author.bioRaw} />
          </VStack>
        </Box>
      ) : (
        <Box height="100%" width="80%" position="relative">
          <Flex alignItems="center" justifyContent="center" height="100%">
            <Avatar size="2xl" alt={author.name} src={author.image.asset.url} />
            <Box mt={4} ml={{ md: 6 }} flex="2 1 auto">
              <Heading
                flexBasis="50%"
                as="h1"
                fontSize="4xl"
                textStyle="headline-accent"
              >
                {author.name}
              </Heading>
              <Flex color="grey.900" my={2}>
                <Text mr={2} alignSelf="center" fontSize="xs">
                  By Media Developer Expert, Developer 🥑
                </Text>
                <ButtonGroup
                  alignSelf="center"
                  color="gray.600"
                  variant="ghost"
                >
                  <SocialGroup />
                </ButtonGroup>
              </Flex>
              <Box color="grey.900" my={2} maxWidth="90%">
                <BlockContent blocks={author.bioRaw} />
              </Box>
            </Box>
          </Flex>
        </Box>
      )}
    </Flex>
  );
}
