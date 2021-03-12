import {
  Button,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Box,
  useDisclosure,
} from '@chakra-ui/react';

import { FaEdit, FaExpand, FaTrash } from 'react-icons/fa';

import { useMutation, useQueryClient } from 'react-query';
import { notes } from '@lib/queries/notes';
import { boxShadow } from '@utils/styles';
/*

  -- TODO --

  [] Note props to replace hard coded data
  [] Edit note should expand the Note to the Modal, with all fields editable
  [] Expand button should open the same Modal, but with no edit fields active

*/

function NoteModal({ onClose, isOpen, note, deleteNote, editNote }) {
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      size="5xl"
    >
      <ModalOverlay />
      <ModalContent h="500px">
        <ModalHeader>{note.create_at}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{note.body}</ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button onClick={() => deleteNote.mutate(note.id)} variant="ghost">
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default function Note({ note, ...rest }) {
  const queryClient = useQueryClient();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const deleteNote = useMutation((noteId) => notes.delete(noteId), {
    onMutate: async (noteId) => {
      await queryClient.cancelQueries('notes');
      const previousValue = queryClient.getQueryData('notes');

      queryClient.setQueryData('notes', (old) => ({
        ...old,
        notes: old.notes.filter((oldNote) => oldNote.id !== noteId),
      }));

      return previousValue;
    },
    // On failure, roll back to the previous value
    onError: (err, variables, previousValue) =>
      // TODO: Revisit and add a toast on failure and rollback
      queryClient.setQueryData('notes', previousValue),
    // After success or failure, refetch the notes query
    onSuccess: () => {
      queryClient.invalidateQueries('notes');
    },
  });
  return (
    <>
      <NoteModal
        note={note}
        onClose={onClose}
        isOpen={isOpen}
        deleteNote={deleteNote}
      />
      <Flex
        bg="white"
        borderRadius="4px"
        mt={5}
        direction="column"
        boxShadow={boxShadow}
        minH="285px"
        minW="285px"
        maxH="285px"
        maxW="285px"
        {...rest}
      >
        <Flex justify="space-between">
          <Text
            as="i"
            fontWeight="bold"
            letterSpacing="1.5px"
            pt="10px"
            pl="10px"
          >
            {note.created_at}
          </Text>
          <Box>
            <IconButton
              onClick={() => deleteNote.mutate(note.id)}
              p="0px"
              _active={{ bg: 'none', outline: 'none' }}
              icon={<FaTrash />}
              outline="none"
              bg="none"
              _hover={{ bg: 'none' }}
              alignSelf="flex-end"
            />
            <IconButton
              p="0px"
              _active={{ bg: 'none' }}
              icon={<FaEdit />}
              outline="none"
              bg="none"
              _hover={{ bg: 'none' }}
              alignSelf="flex-end"
            />
          </Box>
        </Flex>
        <Text
          flex="1"
          mt="50px"
          letterSpacing="1.5%"
          w="70%"
          justifySelf="center"
          alignSelf="center"
          fontSize="14px"
        >
          {note.body}
        </Text>
        <Flex direction="column">
          <IconButton
            onClick={onOpen}
            alignSelf="flex-end"
            pb="12px"
            pr="3px"
            _active={{ bg: 'none' }}
            icon={<FaExpand />}
            outline="none"
            bg="none"
            _hover={{ bg: 'none' }}
            alignSelf="flex-end"
          />
        </Flex>
      </Flex>
    </>
  );
}
