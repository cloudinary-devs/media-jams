import {
  Flex,
  IconButton,
  Link,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import * as React from 'react';
import { MobileMenuClose, MobileMenuOpen, MobileLogo } from '@components/Icons';
import MJ from '@components/MJ';

import { useSidePanel } from '@components/SidePanelProvider';

const ToggleMenuIcon = (isOpen) => {
  const Icon = isOpen ? MobileMenuClose : MobileMenuOpen;
  return <Icon fontSize="4.5rem" color="grey.900" />;
};

export const MobileTopBar = () => {
  const { nav, isOpen, onClose, onOpen, onToggle } = useSidePanel();
  return (
    <Flex
      align="center"
      justify="space-between"
      px="4"
      bg="#DBDBFF"
      display={{ base: 'flex', md: 'none' }}
      borderBottomWidth="1px"
      h="54px"
    >
      <Link href="/">
        <MJ />
      </Link>
      <IconButton
        onClick={onToggle}
        variant="unstyled"
        display="flex"
        cursor="pointer"
        aria-label="Logo Home"
        icon={ToggleMenuIcon(isOpen)}
      />
    </Flex>
  );
};
