import React from 'react';
import NextLink from 'next/link';
import { Drawer, DrawerOverlay, DrawerContent } from '@chakra-ui/react';
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
