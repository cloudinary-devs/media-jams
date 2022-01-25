import 'tippy.js/dist/tippy.css';
import { useState, useEffect } from 'react';
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
import ReactIcon from '@components/ReactIcon';

import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { useJamsLazyQuery, useFeaturedJamsQuery } from '@hooks/useJams';
import { useTags } from '@hooks/useTags';
import useLazyQuery from '@hooks/useLazyQuery';
import useOnLoad from '@hooks/useOnLoad';
import { useSearch } from '@components/SearchProvider';

export default function Dashboard() {
  const jamListColumns = useBreakpointValue({
    base: 1,
    lg: 2,
  });

  const {
    jams,
    state: { searchValue, selectedTagFilters, filteredJams },
    handleFilter,
    updateSearchValue,
    isLoading,
    isActiveSearch,
  } = useSearch();

  const hasJams = Array.isArray(jams) && jams.length > 0;

  // const tags = useTags();

  // const featuredTags = tags.filter(({ featured }) => featured);
  // const tagsByPopularity = tags; // TODO figure out how to sort

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
          <Heading as="h1" fontSize="42" color="blue.800" mt="4">
            Search Jams
          </Heading>

          <SearchInput focusOnLoad={true} setSearchValue={updateSearchValue} />

          {isActiveSearch && searchValue.length < 3 && (
            <Text>Keep typing...</Text>
          )}

          {!isLoading && hasJams && (
            <>
              <Heading as="h2" fontSize="42" color="blue.800" mt="8">
                Results
              </Heading>
              <JamCardList jams={jams} columns={jamListColumns} />
            </>
          )}

          {(isLoading || !hasJams) && (
            <Box>
              <Heading as="h2" fontSize="42" color="blue.800" mt="8">
                Discover Jams
              </Heading>
            </Box>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

Dashboard.getLayout = (page) => <Layout>{page}</Layout>;
