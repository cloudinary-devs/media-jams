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
  Icon,
} from '@chakra-ui/react';

import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

import { FaTag } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { boxShadow } from '@utils/styles';

export default function Card({ post }) {
  const { author } = post;
  const [bookmarked, setBookmarked] = React.useState(false);

  return (
    <Stack
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      href={`/post/${post.slug}`}
      boxShadow={boxShadow}
      backgroundColor="white"
      h={64}
      w={{ base: '100%', md: '80%', lg: '100%' }}
      maxW="360px"
      borderRadius="lg"
      justifyContent="space-between"
    >
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
        <VStack as={Link} align="start">
          <Heading textStyle="headline-card">{post.title}</Heading>
          <Text fontSize="sm">By {author.name}</Text>
        </VStack>
      </HStack>
      <Flex
        backgroundColor="green.400"
        borderBottomRadius="8px"
        height="50%"
        w="100%"
      >
        <Wrap>
          {post.tags.map((tag) => (
            <WrapItem justifySelf="center" alignSelf="center">
              <Tag colorScheme="green">
                <TagLeftIcon as={FaTag} />
                <TagLabel>{tag}</TagLabel>
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
        <Icon
          size="md"
          justifySelf="flex-end"
          alignSelf="flex-end"
          as={bookmarked ? FaBookmark : FaRegBookmark}
        />
      </Flex>
    </Stack>
  );
}
