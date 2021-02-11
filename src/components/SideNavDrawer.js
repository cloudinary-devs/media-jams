import React from 'react';
import { Link as NextLink } from 'next/link';
import {
  HStack,
  Button,
  Flex,
  Link,
  Icon,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react';
import Image from '@components/Image';
import { FaHome, FaPhotoVideo } from 'react-icons/fa';

export default function SideNavDrawer({ isOpen, onClose, ...props }) {
  return (
    <Drawer {...props} isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <Flex
            w="100%"
            direction="column"
            justifyContent="space-between"
            background="grey.900"
          >
            <Image
              cloudName="mediadevs"
              publicId="mediajams/logo"
              height={60}
              width={130}
              alt="MediaJams logo"
              styles={{
                marginLeft: 2,
              }}
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
      minW="90%"
      borderRadius="md"
      display="flex"
      alignItems="center"
      mb={2}
      {...props}
    >
      {children}
    </Link>
  );
}

function NavLinkGroup() {
  return (
    <Flex mt={4} direction="column" alignItems="center">
      <NavLink href="/dashboard">
        <Icon as={FaHome} size="md" mr={2} />
        Dashboard
      </NavLink>
      <NavLink href="/post">
        <Icon as={FaPhotoVideo} size="md" mr={2} />
        Jams
      </NavLink>
    </Flex>
  );
}
