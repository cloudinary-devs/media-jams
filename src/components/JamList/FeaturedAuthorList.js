import React from 'react';
import {
  Flex,
  Heading,
  Text,
  Avatar,
  IconButton,
  useToken,
  Link,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from '@components/Image';
import { Star } from '@components/Icons';

export default function FeaturedAuthorList({ featuredAuthors }) {
  function getFeaturedAuthors(data) {
    return data.filter((author) => author.featured === true);
  }

  return (
    <Flex
      bg="white"
      border={`1px solid ${grey}`}
      w="268px"
      h="364px"
      borderRadius="8px"
      direction="column"
    ></Flex>
  );
}
