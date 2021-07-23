import React from 'react';
import {
  Box,
  Text,
  Heading,
  Stack,
  Flex,
  Avatar,
  Link,
  useColorModeValue,
  createStandaloneToast,
  Spacer,
  IconButton,
  Button,
  Image,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import format from 'date-fns/format';
import { useNotesQuery } from '@hooks/useNotes';

import { SearchFieldInput } from './SearchFieldInput';
import { Trashcan } from '@components/Icons';

import Fuse from 'fuse.js';

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
            <Image src="/emptyBookmarks.svg" alt="bookmarks empty" />
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
  // const removeBookmark = useRemoveBookmarkMutation({
  //   onSuccess: () => {
  //     // toast message
  //     toast({
  //       title: `Bookmark: ${jam.title} removed.`,
  //       status: 'success',
  //       duration: 2000,
  //       isClosable: true,
  //       position: 'top',
  //     });
  //   },
  // });
  const { title, body } = note;
  return (
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
        <NextLink href={`/`} passHref>
          <Link>
            <Text fontSize="md" variant="B500" color="gray.800">
              {title}
            </Text>
          </Link>
        </NextLink>
        <Spacer />
        <IconButton
          onClick={() => {}}
          variant="ghost"
          aria-label="Remove Note"
          icon={<Trashcan />}
        />
      </Stack>
      <Flex paddingTop={{ base: 0, md: '2' }} alignItems="start">
        <Heading size="H100">{title}</Heading>
      </Flex>
    </Box>
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
