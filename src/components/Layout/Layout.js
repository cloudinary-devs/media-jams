import { Flex, Box } from '@chakra-ui/react';
import { useUser } from '@auth0/nextjs-auth0';
import Sidebar from '@components/Sidebar';
import { MobileTopBar } from '@components/Sidebar/MobileTopBar';
import { useSidePanel } from '@components/SidePanelProvider';

export default function Layout({ children }) {
  const { variants } = useSidePanel();
  return (
    <Flex
      bg="#F8F7FC"
      height="100vh"
      overflowY="auto"
      flexDirection={variants?.style === 'sidebar' ? 'row' : 'column'}
    >
      <Sidebar />
      <MobileTopBar />
      {children}
    </Flex>
  );
}
