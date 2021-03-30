import React from 'react';
import {
  Input,
  Flex,
  Box,
  Text,
  Heading,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Divider,
  Textarea,
} from '@chakra-ui/react';

import { boxShadow } from '@utils/styles';
import { notes } from '@lib/queries/notes';
import { useMutation, useQueryClient } from 'react-query';

export default function NoteForm() {
  const inputRef = React.useRef();
  const [note, setNote] = React.useState();
  const queryClient = useQueryClient();
  const createNote = useMutation((note) => notes.add(note), {
    onMutate: async (note) => {
      setNote('');
      inputRef.current.value = '';
      await queryClient.cancelQueries('notes');
      const previousValue = queryClient.getQueryData('notes');

      queryClient.setQueryData('notes', (old) => ({
        ...old,
        notes: [...old.notes, note],
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
    <Flex
      bg="white"
      direction="column"
      borderTopRightRadius="4px"
      borderTopLeftRadius="4px"
      minW="100%"
      maxW="100%"
      boxShadow={boxShadow}
    >
      <Textarea
        borderTopLeftRadius="4px"
        borderTopRightRadius="4px"
        placeholder="Start typing your notes..."
        size="sm"
        w="100%"
        transition="height 1s"
        fontSize="16px"
        resize="none"
        minH="40px"
        _focus={{ height: '300px' }}
        ref={inputRef}
        onChange={(e) => {
          e.persist();
          setNote({ body: e.target.value });
        }}
      />
      <Flex h="50px" align="center" justify="center" direction="column">
        <Button
          onClick={() => createNote.mutate(note)}
          colorScheme="green"
          mr={3}
          alignSelf="flex-end"
          size="sm"
        >
          Save
        </Button>
      </Flex>
    </Flex>
  );
}
