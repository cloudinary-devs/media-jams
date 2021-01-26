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
  Wrap,
  WrapItem,
  TagLeftIcon,
} from '@chakra-ui/react';

import { FaTag } from 'react-icons/fa';
import { motion } from 'framer-motion';

function AnimatedLink({ children, ...props }) {
  return (
    <Link h={64} as={motion.a} {...props}>
      {children}
    </Link>
  );
}

export default function Card({ post }) {
  const { author } = post;

  return (
    <Stack
      as={AnimatedLink}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      _hover={{ textDecor: 'none' }}
      href={`/post/${post.slug}`}
      border="1px solid         black"
      backgroundColor="white"
      w={{ base: '100%', md: '80%', lg: '100%' }}
      borderRadius="lg"
      justifyContent="space-between"
    >
      <HStack p={4} mt={0}>
        <Avatar
          size="lg"
          name={author.name}
          mr={2}
          src={author.image}
          loading="lazy"
        />
        <VStack align="start">
          <Heading textStyle="headline-card">{post.title}</Heading>
          <Text fontSize="sm">By {author.name}</Text>
        </VStack>
      </HStack>
      <Flex
        backgroundColor="green.400"
        borderBottomRadius="8px"
        alignItems="center"
        justifyContent="center"
        height="50%"
      >
        <Wrap w="50%">
          {post.tags.map((tag) => (
            <WrapItem>
              <Tag colorScheme="green">
                <TagLeftIcon as={FaTag} />
                <TagLabel>{tag}</TagLabel>
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
      </Flex>
    </Stack>
  );
}
