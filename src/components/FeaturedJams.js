import React from 'react';

import { Stack, Grid, Center, Heading, HStack } from '@chakra-ui/core';

import Card from '@components/Card';

export default function FeaturedJams({ posts }) {
  return (
    <Stack>
      <Center mb={16}>
        <Heading mt={16} mx={16} as="h1" size="2xl">
          Featured Jams
        </Heading>
      </Center>
      <Grid gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={8}>
        {posts.map((post) => (
          <Card post={post} />
        ))}
      </Grid>
    </Stack>
  );
}
