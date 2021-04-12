import React from 'react';
import { Flex, useDisclosure, Box, Input } from '@chakra-ui/react';

import Layout from '@components/Layout';
import Note from '@components/Note';
import NoteForm from '@components/NoteForm';
import NoteModal from '@components/NoteModal';

import { useQuery } from 'react-query';
import { useUser } from '@auth0/nextjs-auth0';
import auth0 from '@lib/auth0';
import { notes } from '@lib/queries/notes';

import Fuse from 'fuse.js';

const fuseOptions = {
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 2,
  shouldSort: true,
  includeScore: true,
  useExtendedSearch: true,
  findAllMatches: true,
  keys: ['body'],
};

function Notes({ user }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [filteredNotes, setFilteredNotes] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const { data } = useQuery('notes', notes.get, {
    enabled: !!user,
  });

  React.useEffect(() => {
    if (!searchValue) {
      handleFilter(data?.notes);
    } else {
      const results = fuse.search(searchValue).map((result) => result.item);
      handleFilter(results);
    }
  }, [searchValue, data]);
  // Set Fuse
  const fuse = new Fuse(data?.notes, fuseOptions);

  const onChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };
  const handleFilter = (data = []) => {
    setFilteredNotes(data);
  };
  return (
    <Layout isOpen={isOpen} onClose={onClose} onOpen={onOpen} overflow="auto">
      <Flex
        align="center"
        direction="column"
        h="100%"
        alignSelf="center"
        w="100%"
        m={5}
      >
        <Input
          type="text"
          variant="outline"
          bg="white"
          alignSelf="center"
          placeholder="Search by keyword or tag..."
          padding="1.2rem 0 1.2rem 1rem"
          w={{ base: '100%', xl: '40%' }}
          _placeholder={{
            lineSpacing: '4px',
            fontSize: 'sm',
          }}
          onChange={onChange}
        />

        <Flex
          p={6}
          direction={{ base: 'column', xl: 'row' }}
          align={{ base: 'center', xl: 'none' }}
          w="70%"
          wrap="wrap"
        >
          {filteredNotes.map((data) => (
            <Note mr={4} note={data} />
          ))}
        </Flex>
      </Flex>
    </Layout>
  );
}

export default Notes;
export const getServerSideProps = auth0.withPageAuthRequired();
