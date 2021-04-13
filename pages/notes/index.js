import React from 'react';
import { Flex, useDisclosure, Box, Input } from '@chakra-ui/react';

import Layout from '@components/Layout';
import Note from '@components/Note';

import { useQuery } from 'react-query';
import auth0 from '@lib/auth0';
import { notes } from '@lib/queries/notes';
import { motion } from 'framer-motion';

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
        as={motion.div}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: 'easeout' }}
        direction="column"
        borderRadius="8px"
        align="center"
        p="1rem"
        overflowY="scroll"
        bg="white"
        h="100%"
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
