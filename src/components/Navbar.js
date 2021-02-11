import { Flex, Text, Box, Link, Button } from '@chakra-ui/react';
import Image from '@components/Image';
import { Link as NextLink } from 'next/link';
import { useFetchUser } from '@lib/user';

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
  const { user, loading } = useFetchUser();

  return (
    <Flex
      minW="100%;"
      height="7rem"
      px={5}
      py={4}
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
        <NavLink ml={4} href="/post">
          Jams
        </NavLink>
        <NavLink ml={4} href="/feedback">
          Feedback
        </NavLink>
        {user ? (
          <NavLink ml={4} href="/profile">
            Profile
          </NavLink>
        ) : (
          <Button
            as={NavLink}
            isButton
            href="/api/auth/login"
            borderRadius="3px"
            colorScheme="blue"
            ml={4}
            size="sm"
            w="100px"
          >
            Login
          </Button>
        )}
      </Box>
    </Flex>
  );
}
