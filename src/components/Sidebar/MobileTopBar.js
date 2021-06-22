import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Icon,
  Link,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import * as React from 'react';
import { MobileMenuClose, MobileMenuOpen, MobileLogo } from '@components/Icons';
import { HiOutlineMenu } from 'react-icons/hi';
import Image from '@components/Image';
import NextLink from 'next/link';
import Sidebar from './index';

const ToggleMenuIcon = (isOpen) => {
  const Icon = isOpen ? MobileMenuClose : MobileMenuOpen;
  return <Icon fontSize="4.5rem" color="whiteAlpha.900" />;
};

export const MobileTopBar = ({ isOpen, onClose, onToggle, onOpen }) => {
  return (
    <Flex
      align="center"
      justify="space-between"
      px="4"
      bg="linear-gradient(90deg, #8472DF 0%, #7BCCFF 100%)"
      display={{ base: 'flex', md: 'none' }}
      borderBottomWidth="1px"
      h="54px"
    >
      <Link href="/">
        <MobileLogo />
      </Link>
      <IconButton
        onClick={onToggle}
        variant="unstyled"
        display="flex"
        cursor="pointer"
        aria-label="Menu"
        icon={ToggleMenuIcon(isOpen)}
      />
    </Flex>
  );
};
