import React from 'react';
import NextLink from 'next/link';
import { Stack, Flex, Heading, Link, Center, Avatar } from '@chakra-ui/core';

export default function Card({ post }) {
  return (
    <NextLink href={`/post/${encodeURIComponent(post.slug)}`} passHref>
      <Stack
        as="a"
        _hover={{ textDecor: 'none' }}
        height="240px"
        border="2px solid black"
        borderRadius="8px"
      >
        <Flex height="50%" alignItems="center" justify="center">
          <Avatar mr={8} />
          <Heading as="h3" size="lg">
            {post.author}
          </Heading>
        </Flex>
        <Center flex="1" backgroundColor="black">
          <Heading as="h3" size="lg">
            {post.title}
          </Heading>
        </Center>
      </Stack>
    </NextLink>
  );
}
