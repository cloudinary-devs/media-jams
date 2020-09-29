import React from 'react';

import { Flex, Grid, Center, Heading } from '@chakra-ui/core';

import Card from '@components/Card';

export default function FeaturedJams({ posts }) {
  return (
    <Flex
      minW="100%"
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Center mb={16}>
        <Heading mt={16} mx={16} as="h1" size="2xl">
          Featured Jams
        </Heading>
      </Center>
      <Grid
        gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap={8}
        w="70%"
      >
        {posts.map((post) => (
          <Card key={post.slug} post={post} />
        ))}
      </Grid>
    </Flex>
  );
}
