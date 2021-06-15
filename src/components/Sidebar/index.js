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
  Spacer,
  IconButton,
  createIcon,
} from '@chakra-ui/react';
import { Author, MoreTab } from '@components/Icons';

// Navigation
const SideStrip = ({ onClose }) => {
  return (
    <VStack w="80px" h="100vh" opacity="0.12" bg="#FFFFFF">
      <Button onClick={onClose}>More</Button>
    </VStack>
  );
};

const SideBarToggle = createIcon({
  displayName: 'UpDownIcon',
  viewBox: '0 0 200 200',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path
      d="M19 17l-5-5 5-5"
      stroke="#fff"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  ),
});

const SideTopBar = ({ onClose }) => {
  return (
    <Flex w="100%" h="64px">
      <HStack spacing={3}>
        <IconButton
          onClick={onClose}
          size="lg"
          variant="ghost"
          aria-label="expand collapse"
          icon={<SideBarToggle />}
        />
      </HStack>
      <Spacer />
      <HStack spacing={3} px={4}>
        <Button size="sm" variant="ghost" color="white" onClick={onClose}>
          Login
        </Button>
        <Button size="sm" color="white" bg="rgba(255, 255, 255, 0.16)">
          Sign Up
        </Button>
      </HStack>
    </Flex>
  );
};

const SideMenuButton = ({ children }) => (
  <Button variant="solid" bg="rgba(255, 255, 255, 0.16)" w="100%" color="white">
    {children}
  </Button>
);

const SidebarContent = ({ onClose, isOpen }) => (
  <Flex
    direction="column"
    h="100vh"
    display={isOpen ? 'block' : 'none'}
    width={{ base: 'xs' }}
  >
    <SideTopBar onClose={onClose} />
    <Stack spacing={8}>
      <Stack px={6} py={8}>
        <SideMenuButton>Home</SideMenuButton>
        <SideMenuButton>About</SideMenuButton>
        <SideMenuButton>Contact</SideMenuButton>
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
      <SideStrip onClose={onClose} />
      <SidebarContent onClose={onClose} isOpen={isOpen} />
    </Flex>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="lg">
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Chakra-UI</DrawerHeader>
          <DrawerBody>
            <SideStrip onClose={onClose} />
            <SidebarContent onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default LayoutSidebar;
