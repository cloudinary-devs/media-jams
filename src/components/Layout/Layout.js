import { Flex, useDisclosure, useBreakpointValue } from '@chakra-ui/react';
import Sidebar from '@components/Sidebar';
import { MobileTopBar } from '@components/Sidebar/MobileTopBar';

import { useSidePanel } from '@components/SidePanelProvider';

export default function Layout({ children }) {
  const { nav, isOpen, onClose, onOpen, onToggle, variants } = useSidePanel();
  return (
    <Flex
      bg="#F8F7FC"
      h="100vh"
      flexDirection={variants?.style === 'sidebar' ? 'row' : 'column'}
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
      {children}
    </Flex>
  );
}
