import React from 'react';
import NextLink from 'next/link';
import {
  Flex,
  Text,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';
import { GreenCheck } from '@components/Icons';

import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import Fuse from 'fuse.js';
import { tags as queryTags } from '@lib/queries/tags';
import { jams as queryJams } from '@lib/queries/jams';

import JamList from '@components/JamList';
import Banner from '@components/Banner';
import Search from '@components/Search';
import Sidebar from '@components/Sidebar';
import { MobileTopBar } from '@components/Sidebar/MobileTopBar';

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

export default function NewDashboard() {
  const [searchValue, setSearchValue] = React.useState('');
  const [selectedFilters, setSelectedFilters] = React.useState([]);
  const [filteredPosts, setFilteredPosts] = React.useState([]);
  const { data, isLoading } = useQuery('allJams', queryJams.get);
  // Sidebar State Management
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();

  const fuse = new Fuse(data?.jams, fuseOptions);

  React.useEffect(() => {
    // do some checking here to ensure data exist
    if (isLoading === false && data?.jams) {
      setFilteredPosts(data.jams);
    }
  }, [isLoading, data?.jams]);

  // handle updating the filteredPosts with different search criteria
  React.useEffect(() => {
    if (searchValue === '' && selectedFilters.length === 0) {
      handleFilter(data?.jams);
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
      // routerPushTags({ tags: selectedFilters.map((f) => f.title).join(',') });
    }
  }, [searchValue, selectedFilters, isLoading]);

  const smVariant = {
    navigation: 'drawer',
    navigationButton: true,
    defaultOpen: false,
  };
  const mdVariant = {
    navigation: 'sidebar',
    navigationButton: false,
    defaultOpen: true,
  };
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });

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
    setSelectedFilters([]);
  };

  return (
    <Flex
      bg="#F8F7FC"
      h="100vh"
      flexDirection={variants?.navigation === 'sidebar' ? 'row' : 'column'}
    >
      <Sidebar
        variants={variants}
        onClose={onClose}
        isOpen={isOpen}
        onToggle={onToggle}
        onOpen={onOpen}
      />
      <MobileTopBar
        variants={variants}
        onClose={onClose}
        isOpen={isOpen}
        onToggle={onToggle}
        onOpen={onOpen}
      />
      <Flex w="100%" height="100%" direction="column" overflowY="auto">
        <Banner />
        <Flex direction="column" w="100%">
          <Search
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            addTag={addTag}
            removeTag={removeTag}
            clearAllTags={clearAllTags}
          />
          <JamList jams={filteredPosts} />
        </Flex>
      </Flex>
    </Flex>
  );
}

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.fetchQuery('jamTags', queryTags.getStatic);
  await queryClient.setQueryData('jamTags', (old) => ({ tags: old.tags }));
  await queryClient.fetchQuery('allJams', queryJams.getStatic);
  await queryClient.setQueryData('allJams', (old) => ({ jams: old.data.jams }));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
