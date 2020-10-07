import { Flex, Text, Box, Link } from '@chakra-ui/core';
import ThemeTogglebutton from '@components/ThemeToggleButton';
import NextLink from 'next/link';

/**
 *
 * @param {Object} props child elements, href and props
 * Wrapping chakra-ui 'Link' with Router context NextJS Link as NextLink
 * https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-custom-component-that-wraps-an-a-tag
 */
function NavLink({ children, href, ...props }) {
  return (
    <NextLink href={href} passHref>
      <Link as="a" px={2} {...props}>
        {children}
      </Link>
    </NextLink>
  );
}

export default function Navbar() {
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
      </Box>
    </Flex>
  );
}
