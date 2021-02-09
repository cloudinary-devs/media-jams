import React from 'react';
import {
  HStack,
  Button,
  Flex,
  Image,
  Icon,
  Link,
  Text,
} from '@chakra-ui/react';
import { FaHome, FaPhotoVideo } from 'react-icons/fa';

import { Link as NextLink } from 'next/link';
import { buildImageUrl } from 'cloudinary-build-url';

export default function SideNav(props) {
  const logo = buildImageUrl('mediajams/logo', {
    cloud: { cloudName: 'mediadevs' },
    transformations: { resize: { height: 0.7 } },
  });

  return (
    <Flex
      w={72}
      direction="column"
      boxShadow="5px 3px 10px -7px rgba(0,0,0,1)"
      minH="100vh"
      backgroundColor="blue.200"
      {...props}
    >
      <Flex
        direction="column"
        height={100}
        background="grey.900"
        justifyContent="space-between"
      >
        <Image w="40%" alt="MediaJams logo" src={logo} />
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
    </Flex>
  );
}

function NavLink({ children, ...props }) {
  return (
    <Link
      as={NextLink}
      display="flex"
      _hover={{ background: 'blue.400', color: 'white' }}
      p="10px"
      minW="95%"
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
