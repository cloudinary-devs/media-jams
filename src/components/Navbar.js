import { Flex, Text, Box, Link, Button } from '@chakra-ui/react';
import Image from '@components/Image';
import { Link as NextLink } from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';

export function NavLink({ children, isButton, ...props }) {
  return (
    <Link
      as={NextLink}
      _hover={
        !isButton && {
          color: 'yellow.400',
          borderBottomWidth: '5px',
          borderBottomStyle: 'solid',
          borderBottomColor: 'yellow.400',
          paddingBottom: '3px',
        }
      }
      px={2}
      {...props}
    >
      {children}
    </Link>
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
        {user ? (
          <NavLink ml={4} href="/profile">
            Profile
          </NavLink>
        ) : (
          <NavLink
            isButton
            as={Button}
            href="/api/auth/login"
            outline="black"
            background="grey.700"
            color="yellow.400"
          >
            Login
          </NavLink>
        )}
      </Box>
    </Flex>
  );
}
