import React from 'react';
import { useRouter } from 'next/router';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { jams as queryJams } from '@lib/queries/jams';
import { tags as queryTags } from '@lib/queries/tags';
import { notes as queryNotes } from '@lib/queries/notes';
import { bookmarks as queryBookmarks } from '@lib/queries/bookmarks';
import { categories as queryCategories } from '@lib/queries/categories';
import { useUser } from '@auth0/nextjs-auth0';

import JamAccordion from '@components/JamAccordion';
import SearchInput from '@components/SearchInput';
import Layout from '@components/Layout';
import TagFilter from '@components/TagFilter';
import Note from '@components/Note';
import NoteForm from '@components/NoteForm';
import { boxShadow } from '@utils/styles';
import { FaQuestionCircle, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';

import {
  Flex,
  Grid,
  Heading,
  Icon,
  useDisclosure,
  Tooltip,
} from '@chakra-ui/react';

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

export default function Post() {
  // Query
  const { data: jamData, isLoading } = useQuery('allJams', queryJams.get);
  const { data: jamTagData } = useQuery('jamTags', queryTags.get);
  const { data: jamCategoryData } = useQuery(
    'jamCategories',
    queryCategories.get,
  );
  const { user, loading } = useUser();

  // State
  const [filteredPosts, setFilteredPosts] = React.useState([]);
  const [showFilters, setShowFilters] = React.useState(false);
  const [selectedFilters, setSelectedFilters] = React.useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchValue, setSearchValue] = React.useState('');
  const router = useRouter();

  // check if there's any tag selections coming from the router and set them
  React.useEffect(() => {
    const routeTags = router.query.tags?.split(',') || [];
    if (jamTagData?.tags && routeTags.length !== 0) {
      jamTagData?.tags.filter((t) => routeTags.includes(t.title)).map(addTag);
    }
  }, [jamTagData?.tags]);

  React.useEffect(() => {
    // do some checking here to ensure data exist
    if (isLoading === false && jamData?.jams) {
      setFilteredPosts(jamData.jams);
    }
  }, [isLoading, jamData?.jams]);

  // handle updating the filteredPosts with different search criteria
  React.useEffect(() => {
    if (searchValue === '' && selectedFilters.length === 0) {
      handleFilter(jamData?.jams);
    } else {
      // Allow for a search for tag
      const formattedTags = selectedFilters.map((item) => item.title);

      const queries = {
        $or: [
          { title: searchValue },
          { author: searchValue },
          {
            $and:
              formattedTags.length > 0
                ? [{ $path: 'tags.title', $val: formattedTags[0] }]
                : [],
          },
        ],
      };
      const results = fuse.search(queries).map((result) => result.item);
      handleFilter(results);
      routerPushTags({ tags: selectedFilters.map((f) => f.title).join(',') });
    }
  }, [searchValue, selectedFilters]);

  // Set Fuse
  const fuse = new Fuse(jamData?.jams, fuseOptions);

  function addTag(tag) {
    return setSelectedFilters((prev) => [...prev, tag]);
  }

  function removeTag(tag) {
    return setSelectedFilters((prev) => prev.filter((pt) => pt !== tag));
  }

  const handleFilter = (data) => {
    setFilteredPosts(data);
  };

  const clearAllTags = () => {
    routerPushTags();
    setSelectedFilters([]);
  };

  /**
   * Add URl query tags without running all data fetch methods
   * https://nextjs.org/docs/routing/shallow-routing#caveats
   * @param {Object} query {tags: [<String>]}
   * @type {Object}
   */
  const routerPushTags = (query = {}) => {
    router.push(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      {
        shallow: true,
      },
    );
  };

  return (
    <Layout isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <Grid
        as={motion.div}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: 'easeout' }}
        height="100vh"
        templateAreas={{
          base: `
            "JamSearch"
            "JamSearch"
            "Bookmarks"            
            "Bookmarks"             
            "Notes"
            "Notes"            
          `,
          md: `
            "JamSearch JamSearch"
            "Bookmarks Bookmarks"
            "Notes Notes"
          `,
          xl: `
          "SearchFilters JamSearch Bookmarks "
          "Notes JamSearch Bookmarks"
          "Notes JamSearch Bookmarks"
          `,
        }}
        templateColumns={{
          base: '100%',
          md: '1fr 1fr',
          xl: '1.1fr 2fr 1.5fr',
        }}
        templateRows={{
          base: '70% repeat(4, 400px)',
          md: '80vh 700px 500px',
          xl: '2.5fr 200px 2fr',
        }}
        gap={6}
        p="1rem"
        overflow={{ base: 'auto', xl: null }}
      >
        <JamSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          tags={jamTagData?.tags}
          categories={jamCategoryData}
          addTag={addTag}
          removeTag={removeTag}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          filteredPosts={filteredPosts}
        />
        <SearchFilters
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          tags={jamTagData?.tags}
          categories={jamCategoryData}
          addTag={addTag}
          removeTag={removeTag}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          clearAllTags={clearAllTags}
        />

        <Bookmarks user={user} />
        <Notes user={user} />
      </Grid>
    </Layout>
  );
}

// This function gets called at build time on server-side.

function JamSearch({
  searchValue,
  setSearchValue,
  showFilters,
  setShowFilters,
  tags,
  categories,
  addTag,
  removeTag,
  selectedFilters,
  setSelectedFilters,
  filteredPosts,
}) {
  return (
    <Flex
      gridArea="JamSearch"
      p={4}
      bg="red.200"
      overflow="auto"
      borderRadius="8px"
      boxShadow={{ base: 'none', lg: boxShadow }}
      direction="column"
      w="100%"
    >
      <SearchInput
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        width="100%"
        color="red"
        mb={3}
      />
      {showFilters && (
        <Flex borderRadius="lg" w="100%" mb={5} mt="16px" h={64}>
          <TagFilter
            tags={tags}
            addTag={addTag}
            removeTag={removeTag}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            color="red"
          />
        </Flex>
      )}
      {filteredPosts?.map((post) => (
        <JamAccordion
          borderRadius="lg"
          mb={3}
          color="red"
          width="100%"
          key={post._id}
          post={post}
        />
      ))}
    </Flex>
  );
}

function SearchFilters({
  searchValue,
  setSearchValue,
  showFilters,
  setShowFilters,
  tags,
  addTag,
  removeTag,
  selectedFilters,
  setSelectedFilters,
  clearAllTags,
  filteredPosts,
}) {
  return (
    <Flex
      borderRadius="8px"
      boxShadow={boxShadow}
      bg="blue.200"
      display={{ base: 'none', md: 'none', lg: 'none', xl: 'flex' }}
      height="auto"
      gridArea="SearchFilters"
      overflow="auto"
      p={2}
    >
      <TagFilter
        tags={tags}
        addTag={addTag}
        removeTag={removeTag}
        selectedFilters={selectedFilters}
        clearAllTags={clearAllTags}
      />
    </Flex>
  );
}

function Notes({ user }) {
  const { data } = useQuery('notes', queryNotes.get, {
    enabled: !!user,
  });

  if (user) {
    return (
      <Flex
        borderRadius="8px"
        boxShadow="1px 2px 20px 6px rgba(0,0,0,0.25)"
        bg="gray.600"
        gridArea="Notes"
        direction="column"
        height="100%"
        width="100%"
        overflowX="auto"
        align="center"
      >
        <NoteForm />
        {data?.notes.map((data) => (
          <Note note={data} />
        ))}
      </Flex>
    );
  } else {
    return (
      <Flex
        borderRadius="8px"
        boxShadow="1px 2px 20px 6px rgba(0,0,0,0.25)"
        bg="gray.600"
        gridArea="Notes"
        direction="column"
        height="100%"
        width="100%"
      >
        <Flex w="100%" justify="space-between" p={3}>
          <Heading color="gray.400">Notes</Heading>
          <Tooltip
            hasArrow
            label="Access this feature by logging in"
            placement="bottom"
          >
            <span>
              <Icon _hover={{ color: 'gray.400' }} as={FaQuestionCircle} />
            </span>
          </Tooltip>
        </Flex>
        <Flex justify="center" align="center" flexGrow="1">
          <span>
            <Icon as={FaLock} boxSize={20} />
          </span>
        </Flex>
      </Flex>
    );
  }
}

function Bookmarks({ user }) {
  const userId = user?.sub;
  const { status, data, error, isFetching } = useQuery(
    'bookmarks',
    queryBookmarks.get,
    {
      // The query will not execute until the user exists
      enabled: !!userId,
    },
  );
  const postIds = data?.bookmarks?.map(({ content_id }) => content_id);

  // Then get the posts for this bookmark content_id's
  const { isIdle, data: posts, isSuccess } = useQuery(
    'bookmark jams',
    () => queryJams.getByIds(postIds),
    {
      // The query will not execute until the postIds exists
      enabled: !!postIds,
    },
  );
  if (user) {
    return (
      <Flex
        gridArea="Bookmarks"
        overflow="scroll"
        bg="blue.200"
        direction="column"
        boxShadow="1px 2px 20px 6px rgba(0,0,0,0.25)"
        borderRadius="lg"
        p={5}
        h={{
          base: 'auto',
          lg: '',
        }}
      >
        <Heading textStyle="headline-interstitial" color="blue.400" mb={3}>
          Bookmarks
        </Heading>
        <Flex direction="column" w="100%">
          {posts?.allPost?.map((post) => (
            <JamAccordion
              color="blue"
              shadow
              w="100%"
              key={post._id}
              post={post}
              defaultIndex={[0]}
              borderRadius="lg"
              mb={4}
              posts={posts}
            />
          ))}
        </Flex>
      </Flex>
    );
  } else {
    return (
      <Flex
        borderRadius="8px"
        boxShadow="1px 2px 20px 6px rgba(0,0,0,0.25)"
        bg="gray.600"
        gridArea="Bookmarks"
        direction="column"
        height="100%"
        width="100%"
      >
        <Flex w="100%" justify="space-between" p={3}>
          <Heading color="gray.400">Bookmarks</Heading>
          <Tooltip
            hasArrow
            label="Access this feature by logging in"
            placement="bottom"
          >
            <span>
              <Icon _hover={{ color: 'gray.400' }} as={FaQuestionCircle} />
            </span>
          </Tooltip>
        </Flex>
        <Flex justify="center" align="center" flexGrow="1">
          <Icon as={FaLock} boxSize={20} />
        </Flex>
      </Flex>
    );
  }
}

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('jamTags', queryTags.getStatic);
  await queryClient.prefetchQuery('jamCategories', queryCategories.getStatic);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
