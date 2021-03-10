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
  IconButton,
  Text,
} from '@chakra-ui/react';
import Image from '@components/Image';
import {
  FaStickyNote,
  FaRegFlag,
  FaHome,
  FaPhotoVideo,
  FaBookmark,
} from 'react-icons/fa';
import { useUser } from '@auth0/nextjs-auth0';

export default function SideNavDrawer({ isOpen, onClose, ...props }) {
  const { user, loading } = useUser();
  return (
    <Drawer {...props} isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent bg="grey.900">
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
              {user ? (
                <Link as={NextLink} href="/api/auth/logout" passHref>
                  <Button
                    outline="black"
                    background="grey.700"
                    color="yellow.400"
                  >
                    Log Out
                  </Button>
                </Link>
              ) : (
                <Link as={NextLink} href="/api/auth/login" passHref>
                  <Button
                    outline="black"
                    background="grey.700"
                    color="yellow.400"
                  >
                    Login
                  </Button>
                </Link>
              )}
            </Flex>
            <NavLinkGroup user={user} />
          </Flex>
          <Flex
            h="100%"
            width="100%"
            justify="flex-end"
            align="flex-end"
            pr={4}
            pb={4}
          >
            <IconButton
              as={Link}
              icon={<FaRegFlag />}
              target="_blank"
              href="/feedback"
              textDecoration="none"
              outline="none"
              size="md"
              borderRadius="full"
              bg="grey.700"
              color="yellow.400"
              hover={{ textDecoration: 'none', bg: 'none', outline: 'none' }}
              _active={{ bg: 'none', outline: 'none' }}
            />
          </Flex>
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
        <Icon as={FaHome} w={5} h={5} mr={2} />
        <Text fontWeight="regular">Dashboard</Text>
      </NavLink>
      <NavLink href="/post">
        <Icon as={FaPhotoVideo} w={5} h={5} mr={2} />
        <Text fontWeight="thin">Jams</Text>
      </NavLink>
      {/* Authenticated Users */}
      {user && (
        <>
          <NavLink href="/bookmarks">
            <Icon as={FaBookmark} w={5} h={5} mr={2} />
            <Text fontWeight="thin">Bookmarks</Text>
          </NavLink>
          <NavLink href="/notes">
            <Icon as={FaStickyNote} w={5} h={5} mr={2} />
            <Text fontWeight="thin">Notes</Text>
          </NavLink>
        </>
      )}
    </Flex>
  );
}
