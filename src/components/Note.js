import {
  Button,
  Flex,
  Text,
  IconButton,
  Box,
  useDisclosure,
} from '@chakra-ui/react';

import NoteModal from '@components/NoteModal';

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

export default function Note({ note, ...rest }) {
  const queryClient = useQueryClient();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isEditable, setIsEditable] = React.useState(false);

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
        isEditable={isEditable}
        setIsEditable={setIsEditable}
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
          <Box mt={2} mr={2}>
            <IconButton
              onClick={() => deleteNote.mutate(note.id)}
              size="sm"
              outline="none"
              bg="none"
              h="0"
              w="0"
              _focus={{
                boxShadow: 'none',
              }}
              _hover={{
                bg: 'none',
              }}
              icon={<FaTrash />}
              _hover={{ bg: 'none' }}
              alignSelf="flex-end"
            />
            <IconButton
              size="sm"
              outline="none"
              bg="none"
              h="0"
              w="0"
              paddingLeft="0"
              paddingRight="0"
              paddingTop="0"
              paddingBottom="0"
              _focus={{
                boxShadow: 'none',
              }}
              _hover={{
                bg: 'none',
              }}
              _active={{ bg: 'none' }}
              icon={<FaEdit />}
              _hover={{ bg: 'none' }}
              alignSelf="flex-end"
              onClick={() => {
                onOpen();
                setIsEditable(true);
              }}
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
            onClick={() => {
              setIsEditable(false);
              onOpen();
            }}
            alignSelf="flex-end"
            size="sm"
            outline="none"
            bg="none"
            h="0"
            w="0"
            _focus={{
              boxShadow: 'none',
            }}
            icon={<FaExpand />}
            _hover={{ bg: 'none' }}
          />
        </Flex>
      </Flex>
    </>
  );
}
