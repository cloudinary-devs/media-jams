import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import NoteEditor from '@components/NoteEditor';

export default function NoteModal({ isOpen, onClose }) {
  return (
    <Modal size="3xl" onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent h="588px" padding="48px 48px 76px 48px">
        <ModalCloseButton bg="none" _focus={{ background: 'none' }} />
        <ModalBody p="0px !important">
          <NoteEditor />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
