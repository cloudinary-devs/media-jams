import React from 'react';
import {
  Button,
  VStack,
  HStack,
  Flex,
  Stack,
  Spacer,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { MobileDrawer, MobileDrawerContent } from './MobileDrawer';
import NoteModal from '@components/NoteModal';
import {
  Authors,
  Bookmark,
  MoreTab,
  SideToggle,
  Note,
  Signup,
  JoinDiscord,
} from '@components/Icons';

import { useUser } from '@auth0/nextjs-auth0';

// Navigation
const SideStrip = ({ onToggle }) => {
  return (
    <VStack
      w="80px"
      h={{ base: '100%', md: '100vh' }}
      bg="#E2E2FE"
      spacing={12}
    >
      <VStack spacing={{ base: 2, md: 6 }}>
        <Spacer />
        <IconButton
          colorScheme="ghost"
          aria-label="Authors"
          icon={<Authors />}
        />
        <IconButton
          colorScheme="ghost"
          aria-label="Bookmark"
          icon={<Bookmark />}
        />
        <IconButton colorScheme="ghost" aria-label="Notes" icon={<Note />} />
        <IconButton
          colorScheme="ghost"
          aria-label="More Tab"
          fontSize="44px"
          icon={<MoreTab />}
          onClick={onToggle}
        />
        <IconButton colorScheme="ghost" aria-label="Signup" icon={<Signup />} />
      </VStack>
      <Spacer />
      <IconButton
        colorScheme="ghost"
        aria-label="Signup"
        icon={<JoinDiscord />}
        paddingBottom={6}
      />
    </VStack>
  );
};

const SideTopBar = ({ onClose, onToggle }) => {
  const { user } = useUser();
  const { isOpen, onOpen, onClose: onCloseModal } = useDisclosure();

  return (
    <Flex w="100%" h="64px">
      <NoteModal isOpen={isOpen} onClose={onCloseModal} />
      <HStack display={{ base: 'none', md: 'block' }} spacing={3}>
        <IconButton
          onClick={onClose}
          size="lg"
          variant="ghost"
          aria-label="expand collapse"
          icon={<SideToggle />}
        />
      </HStack>
      <Spacer />
      {user ? (
        <Button onClick={onOpen}>Create Note</Button>
      ) : (
        <HStack spacing={3} px={4}>
          <Button
            size="sm"
            variant="ghost"
            color="primary.500"
            onClick={onClose}
          >
            Login
          </Button>
          <Button size="sm" colorScheme="primary">
            Sign Up
          </Button>
        </HStack>
      )}
    </Flex>
  );
};

const SideMenuButton = ({ children }) => (
  <Button variant="solid" bg="white" w="100%" color="grey.900">
    {children}
  </Button>
);

const animationVariants = {
  open: { width: '100%' },
  closed: { width: 0 },
};

const SidebarContent = ({ onClose, isOpen }) => {
  return (
    <Flex direction="column" h="100vh" width={{ base: '380px' }}>
      <SideTopBar onClose={onClose} />
      <Stack spacing={8}>
        <Stack px={6} py={8}>
          <SideMenuButton>Creator Docs</SideMenuButton>
          <SideMenuButton>Media Kit</SideMenuButton>
          <SideMenuButton>Provide Feedback</SideMenuButton>
        </Stack>
      </Stack>
    </Flex>
  );
};

const Sidebar = ({ variants, isOpen, onOpen, onClose, onToggle }) => {
  React.useEffect(() => {
    if (variants?.navigation === 'sidebar') {
      // onOpen();
    }
  }, []);
  return variants?.navigation === 'sidebar' ? (
    <motion.div
      style={{
        display: 'flex',
        hieght: '100vh',
        minWidth: '80px',
        maxWidth: '420px',
        background: `radial-gradient(100% 100% at 50% 0%, #E1E2FF 0%, #F5F5FF 100%)`,
      }}
      animate={isOpen ? 'open' : 'closed'}
      variants={animationVariants}
      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
    >
      <SideStrip onClose={onClose} onToggle={onToggle} />
      {isOpen && (
        <SidebarContent onClose={onClose} isOpen={isOpen} onToggle={onToggle} />
      )}
    </motion.div>
  ) : (
    <MobileDrawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      size="lg"
      isFullHeight={false}
    >
      <MobileDrawerContent bg="radial-gradient(100% 100% at 50% 0%, #E1E2FF 0%, #F5F5FF 100%)">
        <SideStrip onClose={onClose} onToggle={onToggle} />
        <SidebarContent onClose={onClose} isOpen={isOpen} onToggle={onToggle} />
      </MobileDrawerContent>
    </MobileDrawer>
  );
};

export default Sidebar;
