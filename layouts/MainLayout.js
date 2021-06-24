import React from 'react';
import NextLink from 'next/link';
import {
  SimpleGrid,
  IconButton,
  Link,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  useToken,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';

import Sidebar from '@components/Sidebar';
import { MobileTopBar } from '@components/Sidebar/MobileTopBar';

const smVariant = {
  navigation: 'drawer',
  navigationButton: true,
  defaultOpen: false,
};
const mdVariant = {
  navigation: 'sidebar',
  navigationButton: false,
  defaultOpen: true,
};

const MainLayout = ({ children }) => {
  // Sidebar State Management
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });
  return (
    <Flex
      bg="#F8F7FC"
      h="100vh"
      flexDirection={variants?.navigation === 'sidebar' ? 'row' : 'column'}
    >
      <Sidebar
        variants={variants}
        onClose={onClose}
        isOpen={isOpen}
        onToggle={onToggle}
        onOpen={onOpen}
      />
      <MobileTopBar
        variants={variants}
        onClose={onClose}
        isOpen={isOpen}
        onToggle={onToggle}
        onOpen={onOpen}
      />
      <Flex w="100%" height="100%" direction="column" overflowY="auto">
        {children}
      </Flex>
    </Flex>
  );
};

export default MainLayout;
