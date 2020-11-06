import { Flex, Text, Box, Link } from '@chakra-ui/core';
import ThemeTogglebutton from '@components/ThemeToggleButton';
import { Link as NextLink } from 'next/link';
import { useFetchUser } from '@lib/user';
function NavLink({ children, ...props }) {
  return (
    <Link as={NextLink} px={2} {...props}>
      {children}
    </Link>
  );
}

export default function Navbar() {
  const { user, loading } = useFetchUser();
  return (
    <Flex
      minW="100%"
      px={5}
      py={4}
      justifyContent="flex-end"
      alignItems="center"
    >
      <Box>
        <ThemeTogglebutton />
        <NavLink ml={4} href="/">
          Home
        </NavLink>
        <NavLink ml={4} href="/post">
          Media Jams
        </NavLink>
        {user ? (
          <NavLink ml={4} href="/profile">
            Profile
          </NavLink>
        ) : (
          <NavLink ml={4} href="/api/auth/login">
            Login
          </NavLink>
        )}
      </Box>
    </Flex>
  );
}
