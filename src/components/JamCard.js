import React from 'react';

import {
  Stack,
  Flex,
  Heading,
  Link,
  Box,
  Avatar,
  Container,
  HStack,
  Tag,
  TagLabel,
  Text,
  VStack,
} from '@chakra-ui/core';
import { FaTag } from 'react-icons/fa';
import ContentBox from './ContentBox';

export default function Card({ post }) {
  return (
    <Stack
      as={Link}
      _hover={{ textDecor: 'none' }}
      href={`/post/${post.slug}`}
      boxShadow="dark-lg"
    >
      <HStack p={4} mt={0}>
        <VStack>
          <Avatar mr={2} />
        </VStack>
        <VStack align="start">
          <Heading textStyle="headline-card">{post.title}</Heading>
          <Text fontSize="sm">By Walt Peterman</Text>
        </VStack>
      </HStack>
      <Flex
        pt={8}
        style={{
          clipPath:
            'polygon(4.82% -0.53%, 27.8% 11.74%, 49.63% -0.5%, 78.39% 8.86%, 100.83% -1.05%, 101% 100%, 0px 101%, 0px 19.01%)',
        }}
        backgroundColor="green.400"
      >
        <VStack>
          <Box maxW="xl">
            <Box padding="4" maxW="3xl">
              There are many benefits to a joint design and development system.
              Not only does it bring benefits to the design team, but it also
              brings benefits to engineering teams. It makes sure that our
              experiences have a consistent look and feel, not just in our
              design specs, but in production
            </Box>
          </Box>
          <HStack pb={4} spacing={4}>
            <Tag size="lg" variant="outline" colorScheme="yellow">
              <FaTag />
              <TagLabel>JamStack</TagLabel>
            </Tag>
          </HStack>
        </VStack>
      </Flex>
    </Stack>
  );
}
