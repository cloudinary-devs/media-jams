import React from 'react';
import {
  Button,
  Flex,
  Text,
  IconButton,
  Box,
  useDisclosure,
  createStandaloneToast,
} from '@chakra-ui/react';
import { format } from 'date-fns';

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
  const toast = createStandaloneToast();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isEditable, setIsEditable] = React.useState(false);

  var formatTime = function (fourDigitTime) {
    const time = new Date(fourDigitTime);
    console.log(time);

    return time;
  };

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
    onError: (err, variables, previousValue) => {
      queryClient.setQueryData('notes', previousValue);
      toast({
        title: 'Oh no!',
        description: 'Something went wrong while deleting your note!',
        status: 'error',
        duration: 3000,
        position: 'top',
        isClosable: true,
      });
    },

    // After success or failure, refetch the notes query
    onSuccess: () => {
      queryClient.invalidateQueries('notes');
      toast({
        title: 'Successfully deleted your note!',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
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
        minH="250px"
        minW="250px"
        maxH="250px"
        maxW="250px"
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
            {note.created_at && format(new Date(note.created_at), 'PPP')}
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
          mt="20px"
          mb="20px"
          letterSpacing="1.5%"
          w="70%"
          justifySelf="center"
          alignSelf="center"
          fontSize="14px"
          noOfLines={4}
        >
          {note.body}
        </Text>
        <Flex direction="column">
          <IconButton
            onClick={() => {
              setIsEditable(false);
              onOpen();
            }}
            mb={4}
            mr={1}
            alignSelf="flex-end"
            size="sm"
            outline="none"
            bg="none"
            h="0"
            w="0"
            type="submit"
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
