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
import { useJamsQuery } from '@hooks/useJams';
import { jams as queryJams } from '@lib/queries/jams';
import { sortArrayByKey } from '@lib/util';

export default function AllPosts() {
  const jamListColumns = useBreakpointValue({
    base: 1,
    lg: 2,
  });

  const { data: allJams } = useJamsQuery();
  const { jams } = allJams;

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
            <Heading as="h2" fontSize="42" color="blue.800" my="8">
              All Jams
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

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery('allJams', queryJams.getStatic);
  await queryClient.setQueryData('allJams', (old) => ({ jams: old.data.jams }));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
