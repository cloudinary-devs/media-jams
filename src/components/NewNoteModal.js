import {
  Textarea,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  createStandaloneToast,
} from '@chakra-ui/react';
import { notes } from '@lib/queries/notes';
import { useMutation, useQueryClient } from 'react-query';

export default function NoteModal({ onClose, isOpen }) {
  const inputRef = React.useRef();
  const toast = createStandaloneToast();
  const [note, setNote] = React.useState();
  const queryClient = useQueryClient();
  const createNote = useMutation((note) => notes.add(note), {
    onMutate: async (note) => {
      setNote('');
      inputRef.current.value = '';
      await queryClient.cancelQueries('notes');
      const previousValue = queryClient.getQueryData('notes');

      queryClient.setQueryData('notes', (old) => {
        if (old) {
          return {
            ...old,
            notes: [...old?.notes, note],
          };
        } else {
          return {
            notes: [note],
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
      toast({
        title: 'Successfully created your note!',
        status: 'success',
        duration: 3000,
        position: 'top',
        isClosable: true,
      });
    },
  });

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
            onChange={(e) => {
              e.persist();
              setNote({ body: e.target.value });
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="green"
            mr={3}
            onClick={() => {
              createNote.mutate(note);
              onClose();
            }}
          >
            Create
          </Button>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
