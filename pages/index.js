import 'tippy.js/dist/tippy.css';
import React from 'react';
import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  List,
  ListItem,
  ListIcon,
  SimpleGrid,
  useBreakpointValue,
} from '@chakra-ui/react';

import Layout from '@components/Layout';
import JamCardList from '@components/JamCardList';
import Banner from '@components/Banner';
import Search from '@components/Search';
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

import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { useJamsQuery, useFeaturedJamsQuery } from '@hooks/useJams';
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
  const jamListColumns = useBreakpointValue({
    base: 1,
    lg: 2,
  });

  const {
    state: { searchValue, selectedTagFilters, filteredJams },
    handleFilter,
    updateSearchValue,
  } = useSearch();

  const { data: allJams, isLoading: isLoadingJams } = useJamsQuery();
  const { data: featuredJams, isLoading } = useFeaturedJamsQuery();

  const standardJams = allJams?.jams
    .filter((j) => !j.postMetadata.featured)
    .slice(0, JAMS_TO_SHOW);

  // React.useEffect(() => {
  //   // do some checking here to ensure data exist
  //   if (isLoadingJams === false && allJams?.jams) {
  //     handleFilter(allJams?.jams);
  //     loadMoreJams();
  //   }
  // }, [isLoadingJams, allJams]);

  // handle updating the filteredPosts with different search criteria
  // React.useEffect(() => {
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
          <JamCardList
            jams={featuredJams?.jams.slice(0, 1)}
            columns="1"
            cardSize={jamListColumns !== 1 ? 'large' : 'small'}
          />

          <Flex alignItems="center" mt="6" mb="6">
            <Box pr="8">
              <MediaJams width="44" mb="2" />
              <Text fontSize="20" fontWeight="bold" whiteSpace="nowrap">
                Learn Media for Apps
              </Text>
            </Box>
            <Box>
              <SimpleGrid
                as={List}
                templateColumns={{
                  base: 'repeat(6, 310px)',
                  lg: 'repeat(3, minmax(0, 310px))',
                }}
                spacing="4"
              >
                <ListItem display="flex">
                  <ListIcon as={Stack} />
                  <Box>
                    <Text fontSize="14" fontWeight="bold" mb="2">
                      Bite-size Tutorials
                    </Text>
                    <Text fontSize="12">
                      How-to learning guides, limited in scope and easy to
                      follow
                    </Text>
                  </Box>
                </ListItem>
                <ListItem display="flex">
                  <ListIcon as={Code} />
                  <Box>
                    <Text fontSize="14" fontWeight="bold" mb="2">
                      Run & Play Sandboxes
                    </Text>
                    <Text fontSize="12">
                      Learn-by-example demos, open code ready to run & modify
                    </Text>
                  </Box>
                </ListItem>
                <ListItem display="flex">
                  <ListIcon as={Author} />
                  <Box>
                    <Text fontSize="14" fontWeight="bold" mb="2">
                      Authored by Experts
                    </Text>
                    <Text fontSize="12">
                      Content represents the most advanced dev best practices
                    </Text>
                  </Box>
                </ListItem>
                <ListItem display="flex">
                  <ListIcon as={Mashups} />
                  <Box>
                    <Text fontSize="14" fontWeight="bold" mb="2">
                      Tech Stack Mashups
                    </Text>
                    <Text fontSize="12">
                      Shows media design patterns for most popular tech stacks
                    </Text>
                  </Box>
                </ListItem>
                <ListItem display="flex">
                  <ListIcon as={Video} />
                  <Box>
                    <Text fontSize="14" fontWeight="bold" mb="2">
                      Program with Media
                    </Text>
                    <Text fontSize="12">
                      Create, manage, transform, optimize & deliver
                      images/videos
                    </Text>
                  </Box>
                </ListItem>
                <ListItem display="flex">
                  <ListIcon as={Pencil} />
                  <Box>
                    <Text fontSize="14" fontWeight="bold" mb="2">
                      Practical Use-Cases
                    </Text>
                    <Text fontSize="12">
                      Solutions to media challenges encountered in building apps
                    </Text>
                  </Box>
                </ListItem>
              </SimpleGrid>
            </Box>
          </Flex>

          <Banner />

          <JamCardList
            jams={featuredJams?.jams.slice(1, 3)}
            columns={jamListColumns}
          />

          <Flex alignItems="center" mt="8">
            <Box
              flexGrow="1"
              pr={{
                md: '2em',
              }}
            >
              <Heading as="h2" fontSize="24" mb="4" color="blue.800">
                Set up an account to unlock more learning resources!
              </Heading>
              <Text>
                <Button colorScheme="blue" px="6">
                  Sign Up
                </Button>
              </Text>
            </Box>
            <Box>
              <List spacing="4">
                <ListItem fontSize="20" whiteSpace="nowrap">
                  <ListIcon as={GreenCheck} color="green.500" />
                  Create notes right in the app
                </ListItem>
                <ListItem fontSize="20" whiteSpace="nowrap">
                  <ListIcon as={GreenCheck} color="green.500" />
                  Bookmark your favorite jams
                </ListItem>
                <ListItem fontSize="20" whiteSpace="nowrap">
                  <ListIcon as={GreenCheck} color="green.500" />
                  Return to your recent jams
                </ListItem>
              </List>
            </Box>
            <Box
              pl={{
                md: '3em',
              }}
            >
              <MediaJar width="32" height="auto" />
            </Box>
          </Flex>

          <Heading as="h2" fontSize="36" color="blue.800" mt="8">
            Discover Jams
          </Heading>

          <Search
            searchValue={searchValue}
            setSearchValue={updateSearchValue}
          />

          <Heading as="h2" fontSize="36" color="blue.800" mt="8">
            Latest Jams
          </Heading>

          <JamCardList jams={standardJams} columns={jamListColumns} />
        </Flex>
      </Flex>
    </Box>
  );
}

Dashboard.getLayout = (page) => <Layout>{page}</Layout>;

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.fetchQuery('jamTags', queryTags.getStatic);
  await queryClient.setQueryData('jamTags', (old) => ({ tags: old.tags }));
  await queryClient.fetchQuery('featuredJams', queryJams.getStaticFeaturedJams);
  await queryClient.setQueryData('featuredJams', (old) => ({
    jams: old.data.jams,
  }));
  await queryClient.fetchQuery('allJams', queryJams.getStatic);
  await queryClient.setQueryData('allJams', (old) => ({ jams: old.data.jams }));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
