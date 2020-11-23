import React from 'react';
import { Link as NextLink } from 'next/link';
import { Flex, Grid, Heading, Button, Link, Text } from '@chakra-ui/core';
import { NavLink } from '@components/Navbar';

import JamCard from '@components/JamCard';

export default function FeaturedJams({ posts = [] }) {
  return (
    <Flex
      minW="100%"
      direction="column"
      justifyContent="center"
      alignItems="center"
      backgroundColor="grey.900"
      p={18}
    >
      <Heading mt={12} mb={10} textStyle="headline-accent" color="yellow.900">
        Featured Jams
      </Heading>

      <Grid
        gridTemplateColumns="repeat(auto-fill, minmax(400px, 1fr))"
        gap={['80px', '60px', '10px']}
        w="60%"
        justifyItems="center"
        mb={6}
      >
        {posts?.map((post) => (
          <JamCard key={post.slug} post={post} />
        ))}
      </Grid>
      <Button
        as={NavLink}
        href="/post"
        isButton
        size="md"
        borderRadius="3px"
        colorScheme="blue"
        mt={20}
        width="30%"
      >
        See All Jams
      </Button>
    </Flex>
  );
}
