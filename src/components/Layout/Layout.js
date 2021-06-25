import { Flex, useDisclosure, useBreakpointValue } from '@chakra-ui/react';
import Sidebar from '@components/Sidebar';
import { MobileTopBar } from '@components/Sidebar/MobileTopBar';

export default function Layout({ children }) {
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
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
      {children}
    </Flex>
  );
}
