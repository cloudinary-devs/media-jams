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
import NoteEditor from '@components/NoteEditor';

import { useMutation, useQueryClient } from 'react-query';
import { notes } from '@lib/queries/notes';
import { NOTE_ACTIONS } from '@utils/constants';
const { CREATE_NOTE, EDIT_NOTE } = NOTE_ACTIONS;

export default function NoteModal({ action, isOpen, onClose, note = '' }) {
  const [title, setTitle] = React.useState(
    typeof note !== 'string' ? note.title : '',
  );
  const [currentNote, setNote] = React.useState(note);
  const queryClient = useQueryClient();
  const toast = createStandaloneToast();

  const renderNoteActionButton = () => {
    switch (action) {
      case CREATE_NOTE:
        return (
          <Button
            onClick={() => createNote.mutate({ title, body: currentNote })}
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
              editNote.mutate({ body: note.body, id: note.id });
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
    setNote('');
  };

  const editNote = useMutation(
    (note) => notes.edit({ body: currentNote.body, id: note.id }),
    {
      onMutate: async (newNote) => {
        await queryClient.cancelQueries('notes');

        const previousValue = queryClient.getQueryData('notes');

        const findNoteIndex = previousValue.notes.findIndex(
          (note) => note.id === newNote.id,
        );

        const replacedNoteArr = previousValue.notes.splice(
          findNoteIndex,
          1,
          newNote,
        );

        queryClient.setQueryData('notes', () => ({
          notes: replacedNoteArr,
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
          {renderNoteActionButton()}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
