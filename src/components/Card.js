import React from 'react';

import { Stack, Flex, Heading, Link, Center, Avatar } from '@chakra-ui/core';

export default function Card({ post }) {
  return (
    <Stack
      as={Link}
      _hover={{ textDecor: 'none' }}
      href={`/post/${post.slug}`}
      height="240px"
      border="2px solid black"
      borderRadius="8px"
    >
      <Flex height="50%" alignItems="center" justify="center">
        <Avatar mr={8} />
      </Flex>
      <Center flex="1" backgroundColor="black">
        <Heading as="h3" size="lg">
          {post.title}
        </Heading>
      </Center>
    </Stack>
  );
}
