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

import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { useJamsQuery, useFeaturedJamsQuery } from '@hooks/useJams';
import { useTags } from '@hooks/useTags';
import { tags as queryTags } from '@lib/queries/tags';
import { jams as queryJams } from '@lib/queries/jams';

export default function Tag({ tag }) {
  const jamListColumns = useBreakpointValue({
    base: 1,
    lg: 2,
  });

  const { data: allJams, isLoading: isLoadingJams } = useJamsQuery();

  console.log('allJams', allJams);

  return (
    <Layout>
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
            <Heading as="h2" fontSize="42" color="blue.800" my="8">
              <Text
                fontSize="inherit"
                fontWeight="black"
                as="span"
                color="secondary.600"
              >
                {tag.title}
              </Text>
              {` `}
              Jams
            </Heading>

            <JamCardList jams={allJams?.jams || []} columns={jamListColumns} />
          </Flex>
        </Flex>
      </Box>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery('jamTags', queryTags.getStatic);
  const { data: { tags } = {} } = queryClient.getQueryData('jamTags');

  await queryClient.fetchQuery('allJams', queryJams.getStatic);
  await queryClient.setQueryData('allJams', (old) => ({
    jams: old.data?.jams,
  }));

  const tag = tags.find(
    ({ title }) => encodeURIComponent(title) === params.tagSlug,
  );

  return {
    props: {
      tag,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export async function getStaticPaths() {
  const queryClient = new QueryClient();
  await queryClient.fetchQuery('jamTags', queryTags.getStatic);
  const { data: { tags } = {} } = queryClient.getQueryData('jamTags');

  const paths = tags.map(({ title }) => {
    return {
      params: {
        tagSlug: encodeURIComponent(title),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
