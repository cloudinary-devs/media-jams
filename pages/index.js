import 'tippy.js/dist/tippy.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
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

import Layout from '@components/Layout';
import JamCardList from '@components/JamCardList';
import JamCardCollage from '@components/JamCardCollage';
import Banner from '@components/Banner';
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
import TagCardList from '@components/TagCardList';
import TagButtonList from '@components/TagButtonList';

import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { useJamsQuery, useFeaturedJamsQuery } from '@hooks/useJams';
import { useTagsQuery } from '@hooks/useTags';
import { tags as queryTags } from '@lib/queries/tags';
import { jams as queryJams } from '@lib/queries/jams';
import { sortArrayByKey } from '@lib/util';

const JAMS_TO_SHOW = 10;

export default function Dashboard() {
  const router = useRouter();

  const [displayMoreTags, setDisplayMoreTags] = useState(false);
  const handleShowMoreTags = () => setDisplayMoreTags(!displayMoreTags);

  const jamListColumns = useBreakpointValue({
    base: 1,
    lg: 2,
  });

  const { data: allJams, isLoading: isLoadingJams } = useJamsQuery();
  const { data: featuredJams, isLoading } = useFeaturedJamsQuery();
  const { data: allTags = {} } = useTagsQuery();
  const { tags } = allTags;

  const featuredTags = tags?.filter(({ featured }) => featured) || [];
  const tagsByPopularity = tags; // TODO figure out how to sort

  const standardJams = allJams?.jams.filter((j) => !j.postMetadata || !j.postMetadata.featured);

  if ( allJams?.jams ) {
    console.log('<<<')
    console.log(allJams?.jams.map(({ title }) => title));
    console.log('>>>')
  }

  const sortedJams =
    standardJams &&
    sortArrayByKey(standardJams, 'publishedAt', { sortOrder: 'desc' });

  useEffect(() => {
    router.prefetch('/search');
  }, []);

  function handleOnSearchFocus() {
    router.push('/search');
  }

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
          pb="20"
        >
          <Box
            py={{
              base: 12,
              xl: 32,
            }}
          >
            <Flex
              alignItems="center"
              flexDirection={{
                base: 'column',
                xl: 'row',
              }}
              mx={{
                base: 0,
                md: 0,
                lg: 0,
                xl: -10,
                '2xl': -20,
              }}
            >
              <Flex
                width={{
                  base: '100%',
                  xl: '50%',
                }}
                alignItems={{
                  base: 'center',
                  xl: 'flex-start',
                }}
                flexDirection="column"
                flexGrow="0"
                flexShrink="0"
                pr="2"
              >
                <MediaJams width="100%" maxWidth="24em" mb="4" />
                <Text
                  fontSize="34"
                  fontWeight="bold"
                  textAlign={{
                    base: 'center',
                    xl: 'left',
                  }}
                >
                  Learn media with easy to follow guides and examples
                </Text>
              </Flex>
              <Box
                width={{
                  base: '70%',
                  md: '70%',
                  lg: '60%',
                  xl: '50%',
                }}
                flexGrow="0"
                flexShrink="0"
                transform={{
                  base: 'scale(1.5)',
                  xl: 'scale(1.5) translate3d(12%, 0, 0)',
                }}
                pt={{
                  base: 32,
                  xl: 0,
                }}
                pb={{
                  base: 24,
                  xl: 0,
                }}
              >
                <JamCardCollage jams={featuredJams?.jams.slice(0, 3)} />
              </Box>
            </Flex>
          </Box>

          <Heading as="h2" fontSize="42" color="blue.800" mt="4">
            Discover Jams
          </Heading>

          <SearchInput onFocus={handleOnSearchFocus} />

          <Box>
            <VisuallyHidden>
              <Heading as="h3">Featured Tags</Heading>
            </VisuallyHidden>

            <TagCardList tags={featuredTags.slice(0, 3)} />

            {!displayMoreTags && (
              <Text textAlign="center">
                <Button variant="link" onClick={handleShowMoreTags}>
                  Show More Tags
                </Button>
              </Text>
            )}

            {displayMoreTags && (
              <>
                <VisuallyHidden>
                  <Heading as="h3">All Tags</Heading>
                </VisuallyHidden>
                <Box mx="-1" mt="5">
                  <TagButtonList tags={tagsByPopularity} />
                </Box>
              </>
            )}
          </Box>

          <Flex
            flexDirection={{
              base: 'column',
              lg: 'row',
            }}
            alignItems="center"
            mt="8"
          >
            <Box
              flexGrow="1"
              textAlign={{
                base: 'center',
                lg: 'left',
              }}
              pr={{
                md: '2em',
              }}
              mb={{
                base: 10,
                lg: 0,
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
              mt={{
                base: 10,
                lg: 0,
              }}
            >
              <MediaJar width="32" height="auto" />
            </Box>
          </Flex>

          <Heading as="h2" fontSize="42" color="blue.800" mt="8">
            Latest Jams
          </Heading>

          <JamCardList
            jams={sortedJams.slice(0, JAMS_TO_SHOW)}
            columns={jamListColumns}
          />

          <Text>
            <NextLink href="/posts">
              <Button as={Link} variant="link" fontSize="18">
                View All Jams
              </Button>
            </NextLink>
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}

Dashboard.getLayout = (page) => <Layout>{page}</Layout>;

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  /**
   * Fetch ALL Jams w/ metadata, excluding the content body
   */
  await queryClient.fetchQuery('allJams', async () => {
    const { data } = await queryJams.getStatic();
    return data;
  });

  /**
   * All Tags w/ metadata and associated metadata
   */
  await queryClient.fetchQuery('jamTags', async () => {
    const { data } = await queryTags.getStatic();
    return data;
  });

  /**
   * Jams marked as Featured Jams
   */
  await queryClient.fetchQuery('featuredJams', async () => {
    const {
      data: { jams = [] } = {},
    } = await queryJams.getStaticFeaturedJams();
    return { jams };
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
