import { Flex } from '@chakra-ui/react';
import { useUser } from '@auth0/nextjs-auth0';

import Sidebar from '@components/Sidebar';
import { MobileTopBar } from '@components/Sidebar/MobileTopBar';
import { useSidePanel } from '@components/SidePanelProvider';

export default function Layout({ children }) {
  const { user } = useUser();
  const { isOpen, onClose, onOpen, onToggle, variants } = useSidePanel();
  return (
    <Flex
      bg="#F8F7FC"
      h="100vh"
      flexDirection={variants?.style === 'sidebar' ? 'row' : 'column'}
    >
      <Sidebar />
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
