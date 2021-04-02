import { Flex, Text, Box, Link, Button } from '@chakra-ui/react';
import Image from '@components/Image';
import NextLink from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';

export function NavLink({ children, href, ...props }) {
  return (
    <NextLink href={href} passHref>
      <Link
        _hover={{
          color: 'yellow.400',
          borderBottomWidth: '5px',
          borderBottomStyle: 'solid',
          borderBottomColor: 'yellow.400',
          paddingBottom: '3px',
        }}
        px={2}
        {...props}
      >
        {children}
      </Link>
    </NextLink>
  );
}

export default function Navbar() {
  const { user, error, isLoading } = useUser();

  return (
    <Flex
      minW="100%"
      height="8rem"
      py={8}
      px={10}
      justifyContent="space-between"
      alignItems="flex-start"
      backgroundColor="grey.900"
      color="white"
    >
      <Link href="/">
        <Image
          cloudName="mediadevs"
          publicId="mediajams/logo"
          height={60}
          width={120}
          alt="MediaJams logo"
        />
      </Link>
      <Box>
        <NavLink mr={4} href="/dashboard">
          Dashboard
        </NavLink>
        {!user && (
          <Link as={NextLink} href="/api/auth/signup">
            <Button outline="black" background="grey.700" color="yellow.400">
              Signup
            </Button>
          </Link>
        )}
      </Box>
    </Flex>
  );
}
