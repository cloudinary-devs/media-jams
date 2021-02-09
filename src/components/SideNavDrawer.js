import React from 'react';
import { Link as NextLink } from 'next/link';
import {
  HStack,
  Button,
  Flex,
  Image,
  Link,
  Icon,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react';
import { FaHome, FaPhotoVideo } from 'react-icons/fa';

import { buildImageUrl } from 'cloudinary-build-url';

export default function SideNavDrawer({ isOpen, onClose, ...props }) {
  const logo = buildImageUrl('mediajams/logo', {
    cloud: {
      cloudName: 'mediadevs',
    },
    transformations: {
      resize: {
        height: 0.7,
      },
    },
  });

  return (
    <Drawer {...props} isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <Flex
            w="100%"
            direction="column"
            height={100}
            borderBottom="2px solid black"
            background="grey.900"
            justifyContent="space-between"
          >
            <Flex justifyContent="space-between" mt={2}>
              <Image alt="MediaJams logo" ml={2} src={logo} />
              <HStack spacing="2">
                <Button colorScheme="blue">Log In</Button>
                <Text mr={5} color="blue.400" as="u">
                  Sign Up
                </Text>
              </HStack>
            </Flex>
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
