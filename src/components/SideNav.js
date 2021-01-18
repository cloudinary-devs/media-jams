import React from 'react';
import {
  HStack,
  Button,
  Center,
  Flex,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useBreakpointValue,
} from '@chakra-ui/react';

import { Link as NextLink } from 'next/link';
import SearchInput from '@components/SearchInput';

import { useImage } from 'use-cloudinary';

function SideNavDrawer({ children, isOpen, onClose }) {
  const [searchValue, setSearchValue] = React.useState('');
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
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <Flex
            w="100%"
            direction="column"
            height={200}
            borderBottom="2px solid black"
            background="grey.900"
            justifyContent="space-between"
          >
            <Flex justifyContent="space-between">
              <Image alt="MediaJams logo" src={generateImageUrl(logoConfig)} />
              <HStack spacing="2">
                <Button colorScheme="blue">Log In</Button>
                <Text mr={5} color="blue.400" as="u">
                  Sign Up
                </Text>
              </HStack>
            </Flex>
            <SearchInput
              searchvalue={searchValue}
              setSearchValue={setSearchValue}
              alignSelf="center"
              w="95%"
              mb={5}
            />
          </Flex>
          {children}
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

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

export default function SideNav({ children, isOpen, onOpen, onClose }) {
  const isTabletOrMobile = useBreakpointValue({
    base: true,
    md: true,
    lg: true,
    xl: false,
  });

  const { generateImageUrl } = useImage('mediadevs');

  const logoConfig = {
    delivery: {
      publicId: 'mediajams/logo',
    },
    transformation: {
      height: 0.6,
    },
  };

  return (
    <>
      {isTabletOrMobile ? (
        <SideNavDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
          {children}
        </SideNavDrawer>
      ) : (
        <Flex
          w={{ base: '30%', md: '25%' }}
          direction="column"
          borderRight="1px solid black"
        >
          <Flex
            w="100%"
            direction="column"
            height={200}
            borderBottom="2px solid black"
            background="grey.900"
            justifyContent="space-between"
          >
            <Flex justifyContent="space-between">
              <Image alt="MediaJams logo" src={generateImageUrl(logoConfig)} />
              <HStack spacing="2">
                <Button
                  size="sm"
                  colorScheme="blue"
                  as={NavLink}
                  isButton
                  href="/api/auth/login"
                >
                  Log In
                </Button>
                <Text fontSize="md" mr={5} color="blue.400" as="u">
                  Sign Up
                </Text>
              </HStack>
            </Flex>
            <Center>
              <Flex
                border="1px solid black"
                borderRadius="4px"
                justifyContent="space-between"
                h="60px"
                p="20px"
                mb={5}
                w={280}
                alignItems="center"
              >
                <Avatar />
                <Menu>
                  <MenuButton as={Button} colorScheme="blue" w="125px">
                    Menu
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Account</MenuItem>
                    <MenuItem>Profile</MenuItem>
                    <MenuItem>Bookmarks</MenuItem>
                    <MenuItem>Jams</MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </Center>
          </Flex>
          {children}
        </Flex>
      )}
    </>
  );
}
