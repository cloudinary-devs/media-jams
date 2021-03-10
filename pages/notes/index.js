import { Flex, useDisclosure } from '@chakra-ui/react';

import Layout from '@components/Layout';
import Note from '@components/Note';
import NoteForm from '@components/NoteForm';
import NoteModal from '@components/NoteModal';

import { useQuery } from 'react-query';
import { useUser } from '@auth0/nextjs-auth0';
import { notes } from '@lib/queries/notes';

export default function Notes() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { user } = useUser();
  const { data } = useQuery('notes', notes.get, {
    enabled: !!user,
  });

  return (
    <Layout isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <Flex p={6}>
        {data?.notes.map((data) => (
          <Note mr={4} note={data} />
        ))}
      </Flex>
    </Layout>
  );
}
