import React from 'react';
import NextLink from 'next/link';
import {
  SimpleGrid,
  IconButton,
  Link,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  useToken,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';
import {
  Author,
  Close,
  GreenCheck,
  Stack,
  Code,
  Mashups,
  Video,
  Pencil,
} from '@components/Icons';

import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import Fuse from 'fuse.js';
import { tags as queryTags } from '@lib/queries/tags';
import { jams as queryJams } from '@lib/queries/jams';

import { Flex, useDisclosure, useBreakpointValue } from '@chakra-ui/react';
import JamList from '@components/JamList';
import Banner from '@components/Banner';
import Search from '@components/Search';
import Sidebar from '@components/Sidebar';
import { MobileTopBar } from '@components/Sidebar/MobileTopBar';

function Tag() {}

// Banner
function Feature({ children, ...rest }) {
  return (
    <Flex w="auto" align="center" {...rest}>
      <GreenCheck />
      <Text variant="B400" color="grey.700" pl={3}>
        {children}
      </Text>
    </Flex>
  );
}

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
  const { isOpen, onToggle } = useDisclosure();

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

  const smVariant = { navigation: 'drawer', navigationButton: true };
  const mdVariant = { navigation: 'sidebar', navigationButton: false };
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
    <Input
      bg="#FFFFFF"
      w="100%"
      h="56px"
      border="2px solid #88B1FC"
      borderRadius="8px"
      boxSizing="border-box"
      p="0px 16px"
      mt="24px"
      placeholder="Search by tag, title, keyword, author, etc..."
      _placeholder={{
        fontFamily: 'DM Sans',
        fontSize: '16px',
        lineHeight: '152%',
        color: useToken('colors', 'grey.700'),
      }}
    />
  );
}

// Page
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
export default function NewDashboard() {
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  return (
    <Flex direction="column" bg="#F8F7FC">
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
      <Flex
        w="100%"
        height="100%"
        overflowY="auto"
        direction="column"
        alignItems="center"
        justify="center"
      >
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
