import React from 'react';
import {
  Textarea,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
} from '@chakra-ui/react';
import { notes } from '@lib/queries/notes';
import { useMutation, useQueryClient } from 'react-query';
import { FaEdit } from 'react-icons/fa';

export default function NoteModal({
  onClose,
  isOpen,
  note,
  deleteNote,
  isEditable,
  setIsEditable,
}) {
  const [editedNote, setEditedNote] = React.useState(note);
  const queryClient = useQueryClient();
  const inputRef = React.useRef();

  const editNote = useMutation(
    (note) => notes.edit({ body: editedNote.body, id: note.id }),
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
        {isEditable ? (
          <>
            <ModalHeader>{note.create_at}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Textarea
                borderTopLeftRadius="4px"
                borderTopRightRadius="4px"
                size="sm"
                w="100%"
                fontSize="16px"
                h="100%"
                ref={inputRef}
                defaultValue={editedNote.body}
                onChange={(e) => {
                  e.persist();
                  setEditedNote({ body: e.target.value });
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="green"
                mr={3}
                onClick={() => {
                  editNote.mutate({ body: editedNote.body, id: note.id });
                  onClose();
                }}
              >
                Save
              </Button>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                onClick={() => deleteNote.mutate(note.id)}
                variant="ghost"
              >
                Delete
              </Button>
            </ModalFooter>
          </>
        ) : (
          <>
            <ModalHeader>{note.create_at}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{note.body}</ModalBody>
            <ModalFooter>
              <IconButton
                p="0px"
                _active={{ bg: 'none' }}
                icon={<FaEdit />}
                outline="none"
                bg="none"
                _hover={{ bg: 'none' }}
                alignSelf="flex-end"
                onClick={() => {
                  setIsEditable(true);
                }}
              />
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                onClick={() => deleteNote.mutate(note.id)}
                variant="ghost"
              >
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
