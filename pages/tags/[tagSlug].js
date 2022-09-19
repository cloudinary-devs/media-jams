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
import ReactIcon from '@components/ReactIcon';

import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { useJamsQuery, useFeaturedJamsQuery, useJamTag } from '@hooks/useJams';
import { useTags } from '@hooks/useTags';
import { tags as queryTags } from '@lib/queries/tags';
import { jams as queryJams } from '@lib/queries/jams';
import { sortArrayByKey } from '@lib/util';

export default function Tag({ tagSlug }) {
  const jamListColumns = useBreakpointValue({
    base: 1,
    lg: 2,
  });

  const { data } = useJamTag(tagSlug);
  const { jams, tag } = data || {};
  const icon = tag?.icon;

  const standardJams = jams && jams.filter(j => !!j?.slug?.current);

  const sortedJams = standardJams && sortArrayByKey(standardJams, 'publishedAt', { sortOrder: 'desc' });

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
            <Heading
              display="flex"
              alignItems="center"
              as="h2"
              fontSize="42"
              color="blue.800"
              my="8"
            >
              <Text
                display="inline-flex"
                alignItems="center"
                fontSize="inherit"
                fontWeight="black"
                as="span"
                color="secondary.600"
                mr="3"
              >
                {icon && (
                  <ReactIcon {...icon} fontSize="36" margin="0" mr="3" />
                )}
                {tag.title}
              </Text>
              Jams
            </Heading>

            {sortedJams && (
              <JamCardList jams={sortedJams} columns={jamListColumns} />
            )}
          </Flex>
        </Flex>
      </Box>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const { tagSlug } = params;
  const queryClient = new QueryClient();

  await queryClient.fetchQuery(['jamTag-slug', tagSlug], () =>
    queryJams.getJamsByTagSlug(params.tagSlug),
  );
  await queryClient.setQueryData(['jamTag-slug', tagSlug], (old) => old);

  return {
    props: {
      tagSlug,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export async function getStaticPaths() {
  const queryClient = new QueryClient();
  await queryClient.fetchQuery('jamTags', queryTags.getStatic);
  const { data = {} } = queryClient.getQueryData('jamTags');
  const { tags } = data;

  const paths = tags?.map(({ title, slug }) => {
    return {
      params: {
        tagSlug: slug?.current,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
