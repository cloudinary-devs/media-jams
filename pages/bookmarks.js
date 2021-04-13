import React from 'react';
import Layout from '@components/Layout';
import { useQuery } from 'react-query';
import { Flex, Input, Box, useDisclosure } from '@chakra-ui/react';
import auth0 from '@lib/auth0';
import JamAccordion from '@components/JamAccordion';
import SearchInput from '@components/SearchInput';
import { bookmarks } from '@lib/queries/bookmarks';
import { jams } from '@lib/queries/jams';
import Fuse from 'fuse.js';
import { motion } from 'framer-motion';

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

function Bookmarks() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [filteredPosts, setFilteredPosts] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const { status, data, error, isFetching } = useQuery(
    'bookmarks',
    bookmarks.get,
  );
  const postIds = data?.bookmarks?.map(({ content_id }) => content_id);

  // Then get the posts for this bookmark content_id's
  const { isIdle, data: posts, isSuccess } = useQuery(
    'bookmark jams',
    () => jams.getByIds(postIds),
    {
      // The query will not execute until the postIds exists
      enabled: !!postIds,
    },
  );
  React.useEffect(() => {
    if (!searchValue) {
      handleFilter(posts?.allPost);
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
  }, [searchValue, posts]);
  // Set Fuse
  const fuse = new Fuse(posts?.allPost, fuseOptions);

  const onChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };
  const handleFilter = (data) => {
    setFilteredPosts(data);
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
        <Flex direction="column" width="50%">
          <Input
            type="text"
            variant="outline"
            bg="white"
            placeholder="Search by keyword or tag..."
            padding="1.2rem 0 1.2rem 1rem"
            _placeholder={{
              lineSpacing: '4px',
              fontSize: 'sm',
            }}
            onChange={onChange}
          />

          <Flex
            alignSelf="center"
            align="center"
            p={5}
            h={{ base: '100%' }}
            direction="column"
            align={{ base: 'center', xl: 'none' }}
          >
            {filteredPosts?.map((post) => (
              <JamAccordion
                color="blue"
                shadow
                w="100%"
                key={post._id}
                post={post}
                defaultIndex={[0]}
                borderRadius="lg"
                mb={4}
              />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Layout>
  );
}
export default Bookmarks;
export const getServerSideProps = auth0.withPageAuthRequired();
