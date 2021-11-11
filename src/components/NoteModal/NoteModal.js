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
  createStandaloneToast,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
const NoteEditor = dynamic(() => import('@components/NoteEditor'));

import { useMutation, useQueryClient } from 'react-query';
import { notes } from '@lib/queries/notes';
import { NOTE_ACTIONS } from '@utils/constants';
const { CREATE_NOTE, EDIT_NOTE } = NOTE_ACTIONS;

export default function NoteModal({ action, isOpen, onClose, note }) {
  const [title, setTitle] = React.useState(
    typeof note !== 'undefined' ? note.title : '',
  );
  const [body, setBody] = React.useState(
    typeof note !== 'undefined' ? note.body : '',
  );

  const [currentNote, setNote] = React.useState(note);

  const queryClient = useQueryClient();
  const toast = createStandaloneToast();

  const renderNoteActionButton = () => {
    switch (action) {
      case CREATE_NOTE:
        return (
          <Button
            onClick={() => {
              createNote.mutate({ title, body });
            }}
            mt="6px"
            mb="12px"
            alignSelf="flex-end"
          >
            Create Note
          </Button>
        );
      case EDIT_NOTE:
        return (
          <Button
            onClick={() => {
              editNote.mutate({
                title,
                body,
                id: note.id,
                created_at: currentNote.created_at,
              });
              onClose();
            }}
          >
            Save
          </Button>
        );
    }
  };

  const resetNoteFields = () => {
    setTitle('');
    setBody('');
  };

  const editNote = useMutation(
    ({ title, body, id, createdAt }) =>
      notes.edit({ title, body, id, createdAt }),
    {
      onMutate: async (editedNote) => {
        await queryClient.cancelQueries('notes');

        const { notes } = await queryClient.getQueryData('notes');

        const findNoteIndex = notes.findIndex(
          (note) => note.id === editedNote.id,
        );

        notes[findNoteIndex] = editedNote;

        queryClient.setQueryData('notes', () => ({
          notes,
        }));
      },
      // On failure, roll back to the previous value
      onError: (err, variables, previousValue) => {
        queryClient.setQueryData('notes', previousValue);
        toast({
          title: 'Oh no!',
          description: 'Something went wrong while updating your note!',
          status: 'error',
          duration: 3000,
          position: 'top',
          isClosable: true,
        });
      },

      // After success or failure, refetch the notes query
      onSuccess: () => {
        onClose(
          toast({
            title: 'Successfully updated your note!',
            status: 'success',
            duration: 3000,
            position: 'top',
            isClosable: true,
          }),
        );
      },
    },
  );

  const createNote = useMutation(
    ({ title, body }) => notes.add({ title, body }),
    {
      onMutate: async ({ title, body }) => {
        await queryClient.cancelQueries('notes');
        const previousValue = queryClient.getQueryData('notes');

        queryClient.setQueryData('notes', (old) => {
          if (old) {
            return {
              ...old,
              notes: [...old?.notes, { title, body }],
            };
          } else {
            return {
              notes: [{ title, body }],
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
        resetNoteFields();
      },
    },
  );
  return (
    <Modal
      size={{ base: 'full', lg: '3xl' }}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        h={{ base: '100%', md: '600px' }}
        padding="48px 48px 76px 48px"
        w={{ base: '100vw', md: '800px' }}
      >
        <ModalCloseButton
          onClick={() => {
            onClose();
            setTitle(title);
            setBody(body);
          }}
          bg="none"
          _focus={{ background: 'none' }}
        />
        <ModalBody p="0px !important">
          <Input
            placeholder="Untitled..."
            mb="8px"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <NoteEditor body={body} setBody={setBody} />
          {renderNoteActionButton()}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
