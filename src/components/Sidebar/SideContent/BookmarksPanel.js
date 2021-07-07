import { Box, Stack, Heading, Image, Button } from '@chakra-ui/react';

const emptyUserState = (user) => {
  return user ? (
    <>
      <Box size="xs">
        <Image src="/emptyBookmarks.svg" alt="bookmarks empty" />
      </Box>
      <Heading size="H200" color="primary.900">
        You don't have any bookmarks
      </Heading>
    </>
  ) : (
    <>
      <Box size="xs">
        <Image src="/emptyBookmarks.svg" alt="bookmarks empty" />
      </Box>
      <Heading size="H200" color="primary.900">
        You need to sign up to add articles
      </Heading>
      <Button as="a" size="md" colorScheme="primary" href="/api/auth/signup">
        Sign Up
      </Button>
    </>
  );
};

const Bookmarks = ({ user = null }) => {
  return (
    <Stack
      spacing={16}
      px={6}
      py={8}
      direction="column"
      textAlign="center"
      alignItems="center"
    >
      {emptyUserState(user)}
    </Stack>
  );
};

export default Bookmarks;
