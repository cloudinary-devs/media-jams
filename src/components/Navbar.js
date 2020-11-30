import { Flex, Text, Box, Link, Button, Image } from '@chakra-ui/react';
import { Link as NextLink } from 'next/link';
import { useFetchUser } from '@lib/user';
import { useImage } from 'use-cloudinary';
import ThemeToggleButton from '@components/ThemeToggleButton';

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
  const { generateImageUrl } = useImage('mediadevs');

  const logoConfig = {
    delivery: {
      publicId: 'mediajams/logo',
    },
    transformation: {
      height: 0.7,
    },
  };

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
      <Image alt="MediaJams logo" src={generateImageUrl(logoConfig)} />
      <Box>
        <ThemeToggleButton />
        <NavLink ml={4} href="/">
          Home
        </NavLink>
        <NavLink ml={4} href="/post">
          Jams
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
