import React from 'react';
import { useRouter } from 'next/router';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { jams as queryJams } from '@lib/queries/jams';
import { tags as queryTags } from '@lib/queries/tags';
import {
  categories as queryCategories,
  categoriesWithTags,
} from '@lib/queries/categories';

import JamAccordion from '@components/JamAccordion';
import SearchInput from '@components/SearchInput';
import Layout from '@components/Layout';
import TagFilter from '@components/TagFilter';
import { boxShadow } from '@utils/styles';
import { FaQuestionCircle, FaLock } from 'react-icons/fa';

import {
  Flex,
  Grid,
  Heading,
  Icon,
  useDisclosure,
  Box,
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

  // State
  const [filteredPosts, setFilteredPosts] = React.useState([]);
  const [showFilters, setShowFilters] = React.useState(false);
  const [selectedFilters, setSelectedFilters] = React.useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchValue, setSearchValue] = React.useState('');
  const router = useRouter();

  React.useEffect(() => {
    // do some checking here to ensure data exist
    if (isLoading === false && jamData?.jams) {
      setFilteredPosts(jamData.jams);
    }
  }, [isLoading, jamData?.jams]);

  // check if there's any tag selections coming from the router and set them
  React.useEffect(() => {
    const routeTags = router.query.tags?.split(',') || [];
    if (jamTagData?.tags && routeTags.length !== 0) {
      const queryTags = jamTagData?.tags.filter((t) =>
        routeTags.includes(t.title),
      );
      setSelectedFilters(queryTags);
    }
  }, [router.query, jamTagData?.tags]);

  // handle updating the filteredPosts with different search criteria
  React.useEffect(() => {
    if (searchValue === '' && selectedFilters.length === 0) {
      handleFilter(jamData?.jams);
    } else {
      // Allow for a search for tag
      const formattedTags = selectedFilters.map((item) => item.title);
      console.log(formattedTags);
      const queries = {
        $or: [
          { title: searchValue },
          { author: searchValue },
          {
            $and: [{ $path: 'tags.title', $val: formattedTags[0] }],
          },
        ],
      };
      const results = fuse.search(queries).map((result) => result.item);
      handleFilter(results);
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

  return (
    <Layout isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <Grid
        height="100vh"
        templateAreas={{
          base: `
            "JamSearch"
            "JamSearch"
            "Bookmarks"            
            "Notes  "            
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
          xl: '1fr 2fr 1fr',
        }}
        templateRows={{
          base: '70% repeat(4, 300px)',
          md: '80vh 200px 500px',
          xl: '2.5fr 200px 2fr',
        }}
        gap={8}
        p={8}
        ml={-3}
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
          filteredPosts={filteredPosts}
        />

        <Bookmarks />
        <Notes />
      </Grid>
    </Layout>
  );
}

// This function gets called at build time on server-side.
export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  // await queryClient.prefetchQuery('allJams', jams.get());
  await queryClient.prefetchQuery('jamTags', queryTags.getStatic);
  await queryClient.prefetchQuery('jamCategories', queryCategories.getStatic);
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
            categories={categories}
            addTag={addTag}
            removeTag={removeTag}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            color="red"
          />
        </Flex>
      )}
      {filteredPosts?.map((post) => (
        <JamAccordion color="red" width="100%" key={post._id} post={post} />
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
  categories,
  addTag,
  removeTag,
  selectedFilters,
  setSelectedFilters,
  filteredPosts,
}) {
  return (
    <Flex
      borderRadius="8px"
      boxShadow={boxShadow}
      bg="blue.200"
      display={{ md: 'none', lg: 'flex', xl: 'flex' }}
      height="auto"
      gridArea="SearchFilters"
      overflow="auto"
      p={2}
    >
      <TagFilter
        tags={tags}
        categories={categories}
        addTag={addTag}
        removeTag={removeTag}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
    </Flex>
  );
}

function Notes() {
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

function Bookmarks() {
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
