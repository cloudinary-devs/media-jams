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
} from '@chakra-ui/react';

import { FaTag } from 'react-icons/fa';
import { motion } from 'framer-motion';

function AnimatedLink({ children, ...rest }) {
  return (
    <Link as={motion.a} {...rest}>
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
      boxShadow="0px 9px 38px 0px rgba(0,0,0,0.75)"
      backgroundColor="white"
      w={['700px', '500px', '400px']}
      h="200px"
      borderRadius="8px"
    >
      <HStack p={4} mt={0}>
        <VStack>
          <Avatar
            size="lg"
            name={author.name}
            mr={2}
            src={author.image}
            loading="lazy"
          />
        </VStack>
        <VStack align="start">
          <Heading textStyle="headline-card">{post.title}</Heading>
          <Text fontSize="sm">By {author.name}</Text>
        </VStack>
      </HStack>
      <Flex
        pt={8}
        style={{
          clipPath:
            'polygon(4.82% -0.53%, 27.8% 11.74%, 49.63% -0.5%, 78.39% 8.86%, 100.83% -1.05%, 101% 100%, 0px 101%, 0px 19.01%)',
        }}
        backgroundColor="green.400"
        borderBottomRadius="8px"
      >
        <VStack flexGrow={1}>
          <Container centerContent maxWidth="80ch">
            <Box fontSize="10px" maxW="xl" alignItems="center" color="white">
              {post.description}
            </Box>
          </Container>
          <HStack pb={4} spacing={4}>
            {post.tags.map((t) => (
              <Tag key={t} size="md" colorScheme="green">
                <FaTag />
                <TagLabel pl={2}>{t}</TagLabel>
              </Tag>
            ))}
          </HStack>
        </VStack>
      </Flex>
    </Stack>
  );
}
