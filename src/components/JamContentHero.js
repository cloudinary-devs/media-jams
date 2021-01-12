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
  VStack,
} from '@chakra-ui/react';
import { useImage } from 'use-cloudinary';
import styled from '@emotion/styled';

const AuthorByline = styled(Text)`
  text-indent: 5px;
`;

import Container from '@components/Container';
import RawkButton from '@components/RawkButton';

export default function JamContentHero({
  description,
  title,
  author,
  children,
}) {
  const isMobile = useBreakpointValue({
    base: true,
    md: true,
    lg: false,
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
    <>
      {isMobile ? (
        <Flex direction="column" justifyContent="center" alignItems="center">
          <Box
            backgroundImage={`url(${generateImageUrl(imgConfig)})`}
            backgroundSize="cover"
          >
            <Box backgroundColor="blue.200" opacity="90%">
              <Heading as="h1" fontSize="4xl" textStyle="headline-accent">
                {title}
              </Heading>
              <Text maxWidth="80%">{description}</Text>
            </Box>
          </Box>
        </Flex>
      ) : (
        <Flex
          h="lg"
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Box flex={{ sm: 1, base: 0 }} overflow="hidden">
            <Image
              maxWidth="100%"
              alt="Feature Image"
              src={generateImageUrl(imgConfig)}
            />
          </Box>
          <HStack height="100%" width="100%" flex={2}>
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
