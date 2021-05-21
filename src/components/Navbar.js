import { Flex, Text, Box, Link, Button, ButtonGroup } from '@chakra-ui/react';
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
      py={{ base: 2, md: 8 }}
      px={{ base: 2, md: 10 }}
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
        {!user ? (
          <ButtonGroup size="md" spacing="6">
            <NavLink as={NextLink} href="/dashboard">
              <Button
                size={{ base: 'xs', md: 'lg' }}
                variant="link"
                color="yellow.400"
              >
                Dashboard
              </Button>
            </NavLink>
            <Link as={NextLink} href="/api/auth/login">
              <Button
                size={{ base: 'xs', md: 'lg' }}
                variant="link"
                color="yellow.400"
              >
                Log in
              </Button>
            </Link>
            <Link as={NextLink} href="/api/auth/signup">
              <Button
                size="md"
                outline="black"
                background="grey.700"
                color="yellow.400"
              >
                Create account
              </Button>
            </Link>
          </ButtonGroup>
        ) : (
          <NavLink as={NextLink} href="/dashboard">
            <Button
              size={{ base: 'xs', md: 'lg' }}
              variant="link"
              color="yellow.400"
            >
              Dashboard
            </Button>
          </NavLink>
        )}
      </Box>
    </Flex>
  );
}
