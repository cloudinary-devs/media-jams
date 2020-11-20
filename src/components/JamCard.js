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
  const { author } = post;
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
          <Avatar
            size="lg"
            name={author.name}
            mr={2}
            src={author.image}
            loading="lazy"
          />
        </VStack>
        <VStack align="start">
          <Heading textStyle="headline-card">{post.title}</Heading>
          <Text fontSize="sm">By {author.name}</Text>
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
            {post.tags.map((t) => (
              <Tag key={t} size="lg" variant="outline" colorScheme="yellow.900">
                <FaTag />
                <TagLabel>{t}</TagLabel>
              </Tag>
            ))}
          </HStack>
        </VStack>
      </Flex>
    </Stack>
  );
}
