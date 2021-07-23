import React from 'react';
import {
  Flex,
  Button,
  Modal,
  Input,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  createStandaloneToast,
} from '@chakra-ui/react';
import NoteEditor from '@components/NoteEditor';

import { useMutation, useQueryClient } from 'react-query';
import { notes } from '@lib/queries/notes';

export default function NoteModal({ isOpen, onClose }) {
  const [title, setTitle] = React.useState('');
  const [currentNote, setNote] = React.useState('');
  const queryClient = useQueryClient();
  const toast = createStandaloneToast();

  const createNote = useMutation(
    ({ title, note }) => notes.add({ title, body: JSON.stringify(note) }),
    {
      onMutate: async ({ title, note }) => {
        setTitle('');
        setNote('');
        await queryClient.cancelQueries('notes');
        const previousValue = queryClient.getQueryData('notes');

        queryClient.setQueryData('notes', (old) => {
          if (old) {
            return {
              ...old,
              notes: [...old?.notes, { title, body: note }],
            };
          } else {
            return {
              notes: [{ title, body: note }],
            };
          }
        });

        return previousValue;
      },
      // On failure, roll back to the previous value
      onError: (err, variables, previousValue) => {
        queryClient.setQueryData('notes', previousValue);
        toast({
          title: 'Oh no!',
          description: 'Something went wrong while creating your note!',
          status: 'error',
          duration: 3000,
          position: 'top',
          isClosable: true,
        });
      },
      // After success, refetch the notes query
      onSuccess: () => {
        queryClient.invalidateQueries('notes');
        onClose(
          toast({
            title: 'Successfully created your note!',
            status: 'success',
            duration: 3000,
            position: 'top',
            isClosable: true,
          }),
        );
      },
    },
  );
  return (
    <Modal size="3xl" onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent h="600px" padding="48px 48px 76px 48px">
        <ModalCloseButton bg="none" _focus={{ background: 'none' }} />
        <ModalBody p="0px !important">
          <Input
            placeholder="Untitled..."
            mb="8px"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <NoteEditor note={currentNote} setNote={setNote} />
          <Button
            onClick={() => createNote.mutate({ title, note: currentNote })}
            mt="6px"
            mb="12px"
            alignSelf="flex-end"
          >
            Save
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}