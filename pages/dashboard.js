import React from 'react';
import { useRouter } from 'next/router';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { jams as queryJams } from '@lib/queries/jams';
import { authors as queryAuthors } from '@lib/queries/authors';
import { tags as queryTags } from '@lib/queries/tags';
import { categories as queryCategories } from '@lib/queries/categories';
import { useBookmarkedJamsQuery } from '@hooks/useBookmarks';
import { useFeaturedJamsQuery } from '@hooks/useJams';

import { useUser } from '@auth0/nextjs-auth0';

import JamAccordion from '@components/JamAccordion';
import SearchInput from '@components/SearchInput';
import Layout from '@components/Layout';
import TagFilter from '@components/TagFilter';
import AuthorCard from '@components/AuthorCard';
import NextLink from 'next/link';
import { boxShadow } from '@utils/styles';
import { FaDiscord, FaQuestionCircle, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';

import {
  Flex,
  Grid,
  Heading,
  Icon,
  Link,
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

const responsiveAreas = {
  base: `
  "JamSearch"              
  "Bookmarks"
  "Discord"
  "Authors"
`,
  md: `
  "JamSearch JamSearch"
  "Bookmarks Bookmarks"
  "Discord Discord"
  "Authors Authors"
`,
  xl: `
  "SearchFilters JamSearch Bookmarks"
  "Discord JamSearch Bookmarks"
  "Authors JamSearch Bookmarks"
`,
};

export default function Dashboard() {
  // Query
  const { data: jamData, isLoading } = useQuery('allJams', queryJams.get);
  const { data: jamTagData } = useQuery('jamTags', queryTags.get);
  const { data: jamCategoryData } = useQuery(
    'jamCategories',
    queryCategories.get,
  );

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
  }, [searchValue, selectedFilters, isLoading]);

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
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3, ease: 'easein' }}
        height="100vh"
        templateAreas={responsiveAreas}
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
        <Discord />
        <Authors />
        <JamSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          clearAllTags={clearAllTags}
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
        <Bookmarks />
      </Grid>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    'featuredJams',
    queryJams.getStaticFeaturedJams,
  );
  await queryClient.prefetchQuery('jamTags', queryTags.getStatic);
  await queryClient.prefetchQuery('jamCategories', queryCategories.getStatic);
  await queryClient.prefetchQuery('authors', queryAuthors.getStatic);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

function JamSearch({
  searchValue,
  setSearchValue,
  showFilters,
  setShowFilters,
  tags,
  categories,
  clearAllTags,
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
            clearAllTags={clearAllTags}
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

function Discord() {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      bg="#7289DA"
      borderRadius="8px"
      boxShadow="1px 2px 20px 6px rgba(0,0,0,0.25)"
      gridArea="Discord"
    >
      <Icon
        as={FaDiscord}
        color="white"
        boxSize={{ base: 64, md: '7em', xl: '4em' }}
      />
      <NextLink href="https://discord.gg/mediadevs" passHref>
        <Link
          py={2}
          color="white"
          _visited={{ color: 'white' }}
          textDecor="underline"
          w="40%"
          textAlign="center"
          fontSize="12px"
        >
          Join the MediaDevs Discord community
        </Link>
      </NextLink>
    </Flex>
  );
}

function Authors() {
  const { data } = useQuery('authors', queryAuthors.get);
  return (
    <Flex
      w="100%"
      align="center"
      overflowX="auto"
      flexWrap="nowrap"
      borderRadius="8px"
      boxShadow="1px 2px 20px 6px rgba(0,0,0,0.25)"
      bg="green.200"
      gridArea="Authors"
      px={4}
    >
      {data.allAuthor?.map((author) => (
        <React.Fragment key={author._id}>
          <AuthorCard
            minH="90%"
            bg="white"
            maxH="90%"
            minW={48}
            maxW={56}
            mr={4}
            author={author}
          />
        </React.Fragment>
      ))}
    </Flex>
  );
}

function Bookmarks() {
  const { user, loading } = useUser();
  const { isIdle, data: bookmarkedPosts } = useBookmarkedJamsQuery();
  const { data: featuredJams } = useFeaturedJamsQuery();
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
          {bookmarkedPosts?.map((post) => (
            <React.Fragment key={post._id}>
              <JamAccordion
                color="blue"
                shadow
                w="100%"
                post={post}
                defaultIndex={[0]}
                borderRadius="lg"
                mb={4}
                posts={bookmarkedPosts}
              />
            </React.Fragment>
          ))}
        </Flex>
      </Flex>
    );
  } else {
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
        <Heading
          textStyle="headline-interstitial"
          fontFamily="bangers"
          letterSpacing="wide"
          color="blue.400"
          mb={3}
        >
          Featured Jams
        </Heading>
        <Flex direction="column" w="100%">
          {featuredJams.allPost?.map((post) => (
            <React.Fragment key={post._id}>
              <JamAccordion
                color="blue"
                shadow
                w="100%"
                post={post}
                defaultIndex={[0]}
                borderRadius="lg"
                mb={4}
              />
            </React.Fragment>
          ))}
        </Flex>
      </Flex>
    );
  }
}
