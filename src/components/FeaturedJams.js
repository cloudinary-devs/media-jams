import React from 'react';
import { Link as NextLink } from 'next/link';
import {
  Wrap,
  WrapItem,
  Flex,
  Heading,
  Button,
  Link,
  Text,
} from '@chakra-ui/react';
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

      <Wrap w="100%" spacing="50px" justify="center" mb={8}>
        {posts?.map((post) => (
          <WrapItem>
            <JamCard key={post.slug} post={post} />
          </WrapItem>
        ))}
      </Wrap>
      <Button
        as={NavLink}
        href="/post"
        isButton
        size="md"
        borderRadius="3px"
        colorScheme="blue"
        mt={20}
        width="25%"
        mb="6rem"
      >
        See More Jams
      </Button>
    </Flex>
  );
}
