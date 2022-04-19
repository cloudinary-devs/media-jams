import React from 'react';
import {
  useBreakpointValue,
  Heading,
  Text,
  Flex,
  Box,
  HStack,
  ButtonGroup,
  Avatar,
  VStack,
} from '@chakra-ui/react';
import BlockContent from '@sanity/block-content-to-react';
import imageFetch from '@utils/image-fetch';
import SocialGroup from '@components/SocialGroup';

function JamAuthorBanner({ author }) {
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  return (
    <Flex h="md" justifyContent="center" alignItems="center" my={8}>
      {isMobile ? (
        <Box>
          <HStack align="start" color="grey.900" my={4} px={4}>
            <Avatar
              size="2xl"
              alt={author.name}
              src={imageFetch(author.image?.asset.url, { w: 64, h: 64 })}
            />
            <VStack spacing="0" pt={4}>
              <Heading mt={4} fontSize="4xl" textStyle="headline-accent">
                {author.name}
              </Heading>
              <Text fontSize="xs">{author?.jobTitle}</Text>
              <ButtonGroup alignSelf="start" color="gray.600" variant="ghost">
                {author?.socialHandles && <SocialGroup {...author.socialHandles} />}
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
            <Avatar
              size="2xl"
              alt={author.name}
              src={imageFetch(author.image?.asset.url, { w: 128, h: 128 })}
            />
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
                  {author?.jobTitle}
                </Text>
                <ButtonGroup
                  alignSelf="center"
                  color="gray.600"
                  variant="ghost"
                >
                  {author?.socialHandles && <SocialGroup {...author.socialHandles} />}
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

export default JamAuthorBanner;
