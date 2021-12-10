import { Button, Text } from '@chakra-ui/react';

export default function SignupButton() {
  return (
    <Button
      as="a"
      href="/api/auth/signup"
      p="6px 32px"
      borderRadius="8px"
      bg="primary.500"
    >
      <Text variant="B400" color="#FFFFFF" fontWeight="700">
        Sign Up
      </Text>
    </Button>
  );
}
