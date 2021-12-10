import { Flex } from '@chakra-ui/react';
import { useUser } from '@auth0/nextjs-auth0';
import dynamic from 'next/dynamic';
import { MobileTopBar } from '@components/Sidebar/MobileTopBar';
import { useSidePanel } from '@components/SidePanelProvider';

const Sidebar = dynamic(() => import('@components/Sidebar'), {});

export default function Layout({ children }) {
  const { user } = useUser();
  const { variants } = useSidePanel();
  return (
    <Flex
      bg="#F8F7FC"
      h="100vh"
      flexDirection={variants?.style === 'sidebar' ? 'row' : 'column'}
    >
      <Sidebar />
      <MobileTopBar />
      {children}
    </Flex>
  );
}
