import React from 'react';
import { Link as NextLink } from 'next/link';
import { Flex, Grid, Heading, Button, Link, Text } from '@chakra-ui/core';

import JamCard from '@components/JamCard';

export default function FeaturedJams({ posts }) {
  // TODO: temperary reduce 'features' to 3 posts
  const featuredJams = posts
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);
  return (
    <Flex
      minW="100%"
      direction="column"
      justifyContent="center"
      alignItems="center"
      backgroundColor="grey.900"
    >
      <Heading
        mt={16}
        mx={16}
        mr="auto"
        textStyle="headline-accent"
        color="yellow.900"
      >
        Featured Jams
      </Heading>

      <Grid
        gridTemplateColumns="repeat(auto-fill, minmax(400px, 1fr))"
        gap={12}
        w="90%"
      >
        {featuredJams?.map((post) => (
          <JamCard key={post.slug} post={post} />
        ))}
      </Grid>
      <Link w="50%" my={8} as={NextLink} href="/post">
        <Button
          size="lg"
          borderRadius="3px"
          colorScheme="blue"
          _hover={{ borderColor: '#bec3c9' }}
          variant="outline"
          w="100%"
        >
          <Heading textStyle="heading" color="white">
            See All Jams
          </Heading>
        </Button>
      </Link>
    </Flex>
  );
}
