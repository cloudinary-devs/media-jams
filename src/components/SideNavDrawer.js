import React from 'react';
import NextLink from 'next/link';
import {
  Button,
  Flex,
  Link,
  Icon,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  IconButton,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import Image from '@components/Image';
import {
  FaStickyNote,
  FaRegFlag,
  FaHome,
  FaPhotoVideo,
  FaBookmark,
  FaChevronDown,
  FaChevronUp,
  FaPlusCircle,
  FaUserCircle,
} from 'react-icons/fa';
import { useUser } from '@auth0/nextjs-auth0';

import { SideNavContent } from '@components/SideNav';

export default function SideNavDrawer({ isOpen, onClose, onOpen, ...props }) {
  const { user } = useUser();
  return (
    <Drawer {...props} isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent bg="grey.900">
          <SideNavContent onOpen={onOpen} user={user} />
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
