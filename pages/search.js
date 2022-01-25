import 'tippy.js/dist/tippy.css';
import { useState } from 'react';
import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Link,
  List,
  ListItem,
  ListIcon,
  SimpleGrid,
  useBreakpointValue,
  Image,
  VisuallyHidden,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import Layout from '@components/Layout';
import JamCardList from '@components/JamCardList';
import JamCardCollage from '@components/JamCardCollage';
import Banner from '@components/Banner';
import Search from '@components/Search';
import SearchInput from '@components/SearchInput';
import {
  GreenCheck,
  Author,
  Close,
  Stack,
  Code,
  Mashups,
  Video,
  Pencil,
} from '@components/Icons';
import MediaJams from '@components/MediaJams';
import MediaJar from '@components/MediaJar';
import ReactIcon from '@components/ReactIcon';

import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { useJamsQuery, useFeaturedJamsQuery } from '@hooks/useJams';
import { useTags } from '@hooks/useTags';
import { useSearch } from '@components/SearchProvider';
import { tags as queryTags } from '@lib/queries/tags';
import { jams as queryJams } from '@lib/queries/jams';

const fuseOptions = {
  threshold: 0.35,
  location: 0,
  distance: 100,
  minMatchCharLength: 3,
  shouldSort: true,
  includeScore: true,
  useExtendedSearch: true,
  keys: ['title', 'tags.title', ['author', 'name']],
};

const JAMS_TO_SHOW = 10;

export default function Dashboard() {
  // const [displayMoreTags, setDisplayMoreTags] = useState(false);
  // const handleShowMoreTags = () => setDisplayMoreTags(!displayMoreTags);

  const jamListColumns = useBreakpointValue({
    base: 1,
    lg: 2,
  });

  // const {
  //   state: { searchValue, selectedTagFilters, filteredJams },
  //   handleFilter,
  //   updateSearchValue,
  // } = useSearch();

  // console.log('searchValue', searchValue)

  const { data: allJams, isLoading: isLoadingJams } = useJamsQuery();
  console.log('allJams', allJams);
  // const { data: featuredJams, isLoading } = useFeaturedJamsQuery();
  // const tags = useTags();

  // const featuredTags = tags.filter(({ featured }) => featured);
  // const tagsByPopularity = tags; // TODO figure out how to sort

  // const standardJams = allJams?.jams
  //   .filter((j) => !j.postMetadata.featured)
  //   .slice(0, JAMS_TO_SHOW);

  // useEffect(() => {
  //   // do some checking here to ensure data exist
  //   if (isLoadingJams === false && allJams?.jams) {
  //     handleFilter(allJams?.jams);
  //     loadMoreJams();
  //   }
  // }, [isLoadingJams, allJams]);

  // handle updating the filteredPosts with different search criteria
  // useEffect(() => {
  //   if (searchValue === '' && selectedTagFilters.length === 0) {
  //     handleFilter(allJams?.jams);
  //   } else {
  //     // Allow for a search for tag
  //     const formattedTags = selectedTagFilters.map((item) => item.title);

  //     const queries = {
  //       $or: [
  //         {
  //           title: searchValue,
  //         },
  //         {
  //           $path: ['author.name'],
  //           $val: searchValue,
  //         },
  //         {
  //           $path: ['tags.title'],
  //           $val: searchValue,
  //         },
  //       ],
  //       $and: [],
  //     };

  //     // Add an $and with the tag title if we have an active topic

  //     if (formattedTags.length > 0) {
  //       formattedTags.forEach((tag) => {
  //         queries.$and.push({
  //           $path: 'tags.title',
  //           $val: `'${tag}`, // the ' in front adds exact match
  //         });
  //       });
  //     }
  //     async function initFuse() {
  //       const Fuse = (await import('fuse.js')).default;
  //       const fuse = new Fuse(allJams?.jams, fuseOptions);
  //       const results = fuse.search(queries).map((result) => result.item);

  //       handleFilter(results);
  //     }
  //     initFuse();
  //     // routerPushTags({ tags: selectedFilters.map((f) => f.title).join(',') });
  //   }
  // }, [searchValue, selectedTagFilters, isLoadingJams]);

  return (
    <Box w="100%" height="100%" overflowY="auto">
      <Flex direction="column" w="100%">
        <Flex
          w={{ base: '90%', lg: '884px' }}
          mt="26px"
          mb="50px"
          alignSelf="center"
          h="100%"
          direction="column"
          justify="space-around"
          sx={{ gap: '24px' }}
        >
          <Heading as="h2" fontSize="42" color="blue.800" mt="4">
            Discover Jams
          </Heading>

          <SearchInput focusOnLoad={true} />

          {/* <Search
            searchValue={searchValue}
            setSearchValue={updateSearchValue}
          /> */}

          <Heading as="h2" fontSize="42" color="blue.800" mt="8">
            Latest Jams
          </Heading>
          {Array.isArray(allJams?.jams) && (
            <JamCardList jams={allJams.jams} columns={jamListColumns} />
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

Dashboard.getLayout = (page) => <Layout>{page}</Layout>;
