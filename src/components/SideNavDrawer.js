import React from 'react';
import { Link as NextLink } from 'next/link';
import {
  Button,
  Flex,
  Link,
  Icon,
  Drawer,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react';
import Image from '@components/Image';
import { FaHome, FaPhotoVideo, FaBookmark } from 'react-icons/fa';
import { useUser } from '@auth0/nextjs-auth0';

export default function SideNavDrawer({ isOpen, onClose, ...props }) {
  return (
    <Drawer {...props} isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent bg="grey.900">
          <Flex w="100%" justifyContent="space-between" p={4}>
            <Image
              cloudName="mediadevs"
              publicId="mediajams/logo"
              height={60}
              width={130}
              alt="MediaJams logo"
            />
            <Button
              alignSelf="flex-end"
              p={4}
              size="md"
              mb={3}
              mr={3}
              colorScheme="blue"
            >
              Log In
            </Button>
          </Flex>
          <NavLinkGroup />
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

function NavLink({ children, ...props }) {
  return (
    <Link
      as={NextLink}
      display="flex"
      _hover={{ background: 'blue.400', color: 'white' }}
      p="10px"
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
