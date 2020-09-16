import { Link as NextLink } from 'next/link';
import { Box, Link, Text, Stack } from '@chakra-ui/core';

export default function ContentBox({ post }) {
  return (
    <Link
      as={NextLink}
      href={`/post/${post.slug}`}
      _hover={{ textDecor: 'none' }}
    >
      <Box
        role="group"
        maxW="500px"
        border="1px"
        borderColor="black"
        borderRadius="8px"
        p={8}
      >
        <Stack>
          <Box>
            <Text _groupHover={{ textDecor: 'underline' }}>{post.title}</Text>
            <Text> By: {post.author}</Text>
            <Text>{post?.description}</Text>
          </Box>
          <Stack direction="row" spacing={8}>
            {post.tags?.map((tag) => (
              <Text key={tag}>#{tag}</Text>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Link>
  );
}
