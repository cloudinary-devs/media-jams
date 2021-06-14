import {
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  VStack,
  HStack,
  Flex,
  Stack,
} from '@chakra-ui/react';
import { SidebarToggle } from '@components/Icons';

const ButtonBackground = 'linear-gradient(180deg, #8472DF 0%, #7BCCFF 100%)';

// Navigation
const SideStrip = () => {
  return <VStack w="80px" h="100vh" opacity="0.12" bg="#FFFFFF"></VStack>;
};

const SideTopBar = () => {
  return <HStack w="100%" h="64px" opacity="100.0" bg="#C4C4C4"></HStack>;
};

const SideMenuButton = ({ onClick = () => {}, children }) => (
  <Button
    onClick={onClick}
    variant="solid"
    bg="rgba(255, 255, 255, 0.16)"
    w="100%"
    color="white"
  >
    {children}
  </Button>
);

const SidebarContent = ({ onClick }) => (
  <Flex direction="column" h="100vh" width={{ base: 'xs' }}>
    <SideTopBar />
    <Stack spacing={8}>
      <Stack px={6} py={8}>
        <SideMenuButton onClick={onClick}>Home</SideMenuButton>
        <SideMenuButton onClick={onClick}>About</SideMenuButton>
        <SideMenuButton onClick={onClick}>Contact</SideMenuButton>
      </Stack>
    </Stack>
  </Flex>
);

const LayoutSidebar = ({ isOpen, variant, onClose }) => {
  return variant === 'sidebar' ? (
    <Flex
      w="auto"
      left={0}
      top={0}
      background="linear-gradient(180deg, #8472DF 0%, #7BCCFF 100%)"
    >
      <SideStrip />
      <SidebarContent onClick={onClose} />
    </Flex>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="lg">
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Chakra-UI</DrawerHeader>
          <DrawerBody>
            <SideStrip />
            <SidebarContent onClick={onClose} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default LayoutSidebar;
