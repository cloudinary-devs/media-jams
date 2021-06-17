import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Link,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import * as React from 'react';
import { Author, MobileMenu } from '@components/Icons';
import { HiOutlineMenu } from 'react-icons/hi';
import Image from '@components/Image';
import NextLink from 'next/link';
import Sidebar from './index';

export const MobileTopBar = ({ isOpen, onClose, onToggle, onOpen }) => {
  return (
    <Flex
      align="center"
      justify="space-between"
      px="4"
      bg="linear-gradient(90deg, #8472DF 0%, #7BCCFF 100%)"
      display={{ base: 'flex', md: 'none' }}
      borderBottomWidth="1px"
      h="57px"
    >
      <Link href="/">
        <Image
          cloudName="mediadevs"
          publicId="mediajams/logo"
          height={42}
          width={72}
          alt="MediaJams logo"
        />
      </Link>
      <IconButton
        onClick={onOpen}
        variant="unstyled"
        display="flex"
        cursor="pointer"
        aria-label="Menu"
        icon={<MobileMenu fontSize="4.5rem" />}
      />
    </Flex>
  );
};
