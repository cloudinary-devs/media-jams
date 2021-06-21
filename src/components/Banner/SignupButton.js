import NextLink from 'next/link';
import { Button, Link, Text } from '@chakra-ui/react';

export default function SignupButton() {
  return (
    <Link as={NextLink} href="/api/auth/signup">
      <Button p="6px 32px" borderRadius="8px" bg="primary.500">
        <Text variant="B400" color="#FFFFFF" fontWeight="700">
          Sign Up
        </Text>
      </Button>
    </Link>
  );
}
