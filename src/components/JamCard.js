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
      backgroundColor="white"
    >
      <HStack p={4} mt={0}>
        <VStack>
          <Avatar size="lg" name="Kola Tioluwani" mr={2} />
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
        <VStack flexGrow={1}>
          <Container centerContent maxWidth="80ch">
            <Box maxW="xl" alignItems="center" color="white">
              {post.description}
            </Box>
          </Container>
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
