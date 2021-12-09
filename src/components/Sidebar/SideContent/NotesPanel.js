import React from 'react';
import {
  Box,
  Text,
  Heading,
  Stack,
  Flex,
  Link,
  useColorModeValue,
  createStandaloneToast,
  Spacer,
  IconButton,
  Button,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import format from 'date-fns/format';
import { useNotesQuery } from '@hooks/useNotes';
import { useQueryClient, useMutation } from 'react-query';
import Fuse from 'fuse.js';

import { notes } from '@lib/queries/notes';
import { NOTE_ACTIONS } from '@utils/constants';
const { EDIT_NOTE } = NOTE_ACTIONS;

import serializeSlateBody from '@utils/serializeSlateBody';

import NoteModal from '@components/NoteModal';
import { SearchFieldInput } from './SearchFieldInput';
import { Trashcan } from '@components/Icons';
import { FaEdit } from 'react-icons/fa';

const fuseOptions = {
  threshold: 0.35,
  location: 0,
  distance: 100,
  minMatchCharLength: 1,
  includeScore: true,
  useExtendedSearch: true,
  isCaseSensitive: true,
  keys: ['title', 'tags.title', 'author.name'],
};

const EmptyNotes = ({ user }) => {
  return (
    <Stack
      spacing={16}
      px={6}
      py={8}
      direction="column"
      textAlign="center"
      alignItems="center"
    >
      {user ? (
        <>
          <Box size="xs">
            <Image src="/emptyNotes.svg" alt="notes empty" />
          </Box>
          <Heading size="H200" color="primary.900">
            You don't have any notes
          </Heading>
        </>
      ) : (
        <>
          <Box size="xs">
            <Image src="/emptyNotes.svg" alt="notes section empty" />
          </Box>
          <Heading size="H200" color="primary.900">
            You need to sign up to add notes
          </Heading>
          <Button
            as="a"
            size="md"
            colorScheme="primary"
            href="/api/auth/signup"
          >
            Sign Up
          </Button>
        </>
      )}
    </Stack>
  );
};

export const NoteCard = ({ note, ...props }) => {
  const toast = createStandaloneToast();
  const { isOpen, onOpen, onClose: onCloseModal } = useDisclosure();
  const queryClient = useQueryClient();

  const deleteNote = useMutation((noteId) => notes.delete(noteId), {
    onMutate: async (noteId) => {
      await queryClient.cancelQueries('notes');

      await queryClient.setQueryData('notes', (old) => ({
        ...old,
        notes: old.notes.filter((oldNote) => oldNote.id !== noteId),
      }));
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

  const { title } = note;
  return (
    <>
      <NoteModal
        isOpen={isOpen}
        onClose={onCloseModal}
        note={note}
        action={EDIT_NOTE}
      />
      <Box
        bg={useColorModeValue('white', 'gray.700')}
        border="1px solid #D3DDE6"
        borderRadius="8px"
        maxWidth="2xl"
        marginTop={2}
        p={{ base: '2', md: '3' }}
        shadow={{ md: 'base' }}
        {...props}
      >
        <Stack
          direction="row"
          spacing="4"
          spacing={{ base: '1', md: '2' }}
          alignItems="center"
        >
          {note.created_at && (
            <Text variant="B100" color="grey.600">
              {format(new Date(note.created_at), 'PPPP')}
            </Text>
          )}
          <Spacer />
          <IconButton
            onClick={onOpen}
            variant="ghost"
            aria-label="Edit Note"
            icon={<FaEdit />}
          />

          <IconButton
            onClick={() => deleteNote.mutate(note.id)}
            variant="ghost"
            aria-label="Remove Note"
            icon={<Trashcan />}
          />
        </Stack>
        <Flex
          paddingTop={{ base: 0, md: '2' }}
          direction="column"
          alignItems="start"
        >
          <Heading size="H100" color="gray.900" mb="8px">
            {title}
          </Heading>
          <Text noOfLines="2" variant="B200" color="gray.900">
            {serializeSlateBody(note.body)}
          </Text>
        </Flex>
      </Box>
    </>
  );
};

const Notes = ({ user = null }) => {
  const [filteredNotes, setFilteredNotes] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const { isLoading, data } = useNotesQuery();
  React.useEffect(() => {
    if (!searchValue) {
      handleFilter(data?.notes);
    } else {
      const queries = {
        $or: [
          { title: searchValue },
          {
            $path: ['author.name'],
            $val: searchValue,
          },
          {
            $path: 'tags.title',
            $val: searchValue,
          },
        ],
      };
      const results = fuse.search(queries).map((result) => result.item);
      handleFilter(results);
    }
  }, [searchValue, data]);
  // Set Fuse
  const fuse = new Fuse(data?.notes, fuseOptions);
  const onChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };
  const handleFilter = (data) => {
    setFilteredNotes(data);
  };

  return (
    <Flex
      width={{ base: 'full' }}
      direction="column"
      px={{ base: 3, md: 6 }}
      pb={8}
      overflowY="auto"
    >
      {/* check user
        no notes and nothing in the search show empty
     */}
      {!user || (filteredNotes?.length === 0 && !searchValue) ? (
        <EmptyNotes user={user} />
      ) : (
        <Stack>
          <SearchFieldInput value={searchValue} onChange={onChange} mb={6} />
          {filteredNotes?.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </Stack>
      )}
    </Flex>
  );
};

export default Notes;
