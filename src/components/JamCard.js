import React from 'react';
import {
  Stack,
  Flex,
  Box,
  Heading,
  Link,
  Avatar,
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
import { boxShadow } from '@utils/styles';

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
      href={`/post/${post.slug}`}
      boxShadow={boxShadow}
      backgroundColor="white"
      w={{ base: '100%', md: '80%', lg: '100%' }}
      borderRadius="lg"
      justifyContent="space-between"
      position="relative"
      role="group"
    >
      <Box
        position="absolute"
        left="0"
        right="0"
        h="100%"
        w="100%"
        display="none"
        borderRadius="lg"
        _groupHover={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(0,0,0,0.9)',
        }}
      >
        <Text color="white" noOfLines={6} w="80%">
          {post.description}
        </Text>
      </Box>
      <HStack p={4} mt={0}>
        <Avatar
          size="lg"
          name={author.name}
          mr={2}
          src={author.image}
          _groupHover={{
            visibility: 'hidden',
          }}
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
