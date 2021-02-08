import React from 'react';
import { boxShadow } from '@utils/styles';
import { Button, Flex, Icon, Link, Text } from '@chakra-ui/react';
import { FaHome, FaPhotoVideo, FaBookmark } from 'react-icons/fa';
import Image from '@components/Image';
import { useFetchUser } from '@lib/user';
import { Link as NextLink } from 'next/link';

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
      <Flex w="100%" justifyContent="space-between" p={4}>
        <Image
          cloudName="mediadevs"
          publicId="mediajams/logo"
          height={50}
          width={100}
          alt="MediaJams logo"
        />
        <Button
          alignSelf="flex-end"
          p={5}
          size="sm"
          mb={3}
          mr={3}
          colorScheme="blue"
        >
          Log In
        </Button>
      </Flex>
      <NavLinkGroup />
    </Flex>
  );
}

function NavLink({ children, ...props }) {
  return (
    <Link
      as={NextLink}
      display="flex"
      _hover={{ background: 'blue.400', color: 'white' }}
      p="12px"
      minW="100%"
      display="flex"
      alignItems="center"
      {...props}
    >
      {children}
    </Link>
  );
}

function NavLinkGroup() {
  const { user, loading } = useFetchUser();
  return (
    <Flex mt={4} direction="column" alignItems="center" color="white">
      <NavLink href="/dashboard">
        <Icon as={FaHome} size="md" mr={2} />
        Dashboard
      </NavLink>
      <NavLink href="/post">
        <Icon as={FaPhotoVideo} size="md" mr={2} />
        Jams
      </NavLink>
      {/* Authenticated Users */}
      {user && (
        <NavLink href="/bookmarks">
          <Icon as={FaBookmark} size="md" mr={2} />
          Bookmarks
        </NavLink>
      )}
    </Flex>
  );
}
