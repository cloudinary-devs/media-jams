import React from 'react';
import { Link as NextLink } from 'next/link';
import { Button, Flex, Icon, IconButton, Link, Text } from '@chakra-ui/react';
import { FaRegFlag, FaHome, FaPhotoVideo, FaBookmark } from 'react-icons/fa';

import { boxShadow } from '@utils/styles';
import Image from '@components/Image';
import { useUser } from '@auth0/nextjs-auth0';

export default function SideNav(props) {
  return (
    <Flex
      w={72}
      direction="column"
      boxShadow={boxShadow}
      minH="100%"
      backgroundColor="grey.900"
      {...props}
    >
      <Flex direction="column">
        <Flex w="100%" justifyContent="space-between" p={4}>
          <Link href="/">
            <Image
              cloudName="mediadevs"
              publicId="mediajams/logo"
              height={50}
              width={100}
              alt="MediaJams logo"
            />
          </Link>
          <Button
            as={NextLink}
            href="/api/auth/login"
            outline="black"
            background="grey.700"
            color="yellow.400"
            size="md"
          >
            Login
          </Button>
        </Flex>
        <NavLinkGroup />
      </Flex>
      <Flex
        h="100%"
        width="100%"
        justify="flex-end"
        align="flex-end"
        pr={4}
        pb={4}
      >
        <Button size="sm" bg="grey.700" color="yellow.400">
          Feedback <Icon ml={1} as={FaRegFlag} />
        </Button>
      </Flex>
    </Flex>
  );
}

function NavLink({ children, ...props }) {
  return (
    <Link
      as={NextLink}
      display="flex"
      _hover={{ background: 'yellow.400', color: 'black' }}
      p="12px"
      minW="100%"
      display="flex"
      color="white"
      alignItems="center"
      {...props}
    >
      {children}
    </Link>
  );
}

function NavLinkGroup() {
  const { user, loading } = useUser();
  return (
    <Flex mt={4} direction="column" alignItems="center" color="white">
      <NavLink href="/dashboard">
        <Icon as={FaHome} w={6} h={6} mr={2} />
        Dashboard
      </NavLink>
      <NavLink href="/post">
        <Icon as={FaPhotoVideo} w={6} h={6} mr={2} />
        Jams
      </NavLink>
      {/* Authenticated Users */}
      {user && (
        <NavLink href="/bookmarks">
          <Icon as={FaBookmark} w={6} h={6} mr={2} />
          Bookmarks
        </NavLink>
      )}
    </Flex>
  );
}
