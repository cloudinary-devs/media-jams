import React from 'react';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { tags as queryTags } from '@lib/queries/tags';
import { jams as queryJams } from '@lib/queries/jams';

import { Flex, useDisclosure, useBreakpointValue } from '@chakra-ui/react';
import JamList from '@components/JamList';
import Banner from '@components/Banner';
import Search from '@components/Search';
import Sidebar from '@components/Sidebar';

export default function NewDashboard() {
  const { isOpen, onToggle } = useDisclosure();
  const { data } = useQuery('allJams', queryJams.get);

  const smVariant = { navigation: 'drawer', navigationButton: true };
  const mdVariant = { navigation: 'sidebar', navigationButton: false };

  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });
  return (
    <Flex bg="#F8F7FC" h="100vh">
      <Sidebar
        variant={variants?.navigation}
        isOpen={isOpen}
        onClose={onToggle}
      />
      <Flex w="100%" height="100%" direction="column" overflowY="auto">
        <Banner />
        <Flex direction="column" w="100%">
          <Search />
          <JamList jams={data.jams} />
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
