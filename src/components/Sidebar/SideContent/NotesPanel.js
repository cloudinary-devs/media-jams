import { Box, Stack, Heading, Image, Button } from '@chakra-ui/react';

const Notes = () => {
  return (
    <Stack
      spacing={16}
      px={6}
      py={8}
      direction="column"
      textAlign="center"
      alignItems="center"
    >
      <Box size="xs">
        <Image src="/emptyNotes.svg" alt="notes section empty" />
      </Box>
      <Heading size="H200" color="primary.900">
        You need to sign up to add notes
      </Heading>
      <Button as="a" size="md" colorScheme="primary" href="/api/auth/signup">
        Sign Up
      </Button>
    </Stack>
  );
};

export default Notes;
