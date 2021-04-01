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
  location: 0,
  distance: 100,
  minMatchCharLength: 1,
  shouldSort: true,
  includeScore: true,
  useExtendedSearch: true,
  keys: ['title', 'tags.title', 'author.name'],
};

function Notes() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [filteredPosts, setFilteredPosts] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const { user } = useUser();
  const { data } = useQuery('notes', notes.get, {
    enabled: !!user,
  });
  // Set Fuse
  const fuse = new Fuse(data?.notes, fuseOptions);

  const onChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };
  const handleFilter = (data) => {
    setFilteredPosts(data);
  };
  return (
    <Layout isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <Box m={6}>
        <Input
          type="text"
          variant="outline"
          bg="white"
          placeholder="Search by keyword or tag..."
          padding="1.2rem 0 1.2rem 1rem"
          w={{ base: '100%', xl: '40%' }}
          _placeholder={{
            lineSpacing: '4px',
            fontSize: 'sm',
          }}
          onChange={onChange}
        />
      </Box>
      <Flex
        p={6}
        direction={{ base: 'column', xl: 'row' }}
        align={{ base: 'center', xl: 'none' }}
      >
        {data?.notes.map((data) => (
          <Note mr={4} note={data} />
        ))}
      </Flex>
    </Layout>
  );
}

export default Notes;
export const getServerSideProps = auth0.withPageAuthRequired();
