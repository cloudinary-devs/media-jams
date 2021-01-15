import React from 'react';
import {
  HStack,
  Box,
  Button,
  Flex,
  Image,
  Text,
  Menu,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FaBars } from 'react-icons/fa';
import SearchInput from '@components/SearchInput';

import { useImage } from 'use-cloudinary';

function SideNavDrawer({ children, isOpen, onClose, onOpen }) {
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

  return isOpen ? (
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
  ) : (
    <IconButton
      bg="none"
      outline="none"
      onClick={onOpen}
      size="md"
      icon={<FaBars />}
    >
      Menu
    </IconButton>
  );
}

export default function SideNav({ children, isOpen, onOpen, onClose }) {
  const [searchValue, setSearchValue] = React.useState('');

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  const { generateImageUrl } = useImage('mediadevs');

  const logoConfig = {
    delivery: {
      publicId: 'mediajams/logo',
    },
    transformation: {
      height: 0.7,
    },
  };

  return isMobile ? (
    <SideNavDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      {children}
    </SideNavDrawer>
  ) : (
    <Flex w={400} direction="column" border="1px solid black ">
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
    </Flex>
  );
}
