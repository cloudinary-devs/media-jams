import React from 'react';
import { Flex, useDisclosure, useBreakpointValue } from '@chakra-ui/react';
import Banner from '@components/Banner';
import Search from '@components/Search';
import Sidebar from '@components/Sidebar';

import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { tags as queryTags } from '@lib/queries/tags';

export default function NewDashboard() {
  const { isOpen, onToggle } = useDisclosure();
  const smVariant = { navigation: 'drawer', navigationButton: true };
  const mdVariant = { navigation: 'sidebar', navigationButton: false };
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });
  return (
    <Flex bg="#F8F7FC">
      <Sidebar
        variant={variants?.navigation}
        isOpen={isOpen}
        onClose={onToggle}
      />

      <Flex w="100%" height="100%" direction="column">
        <Banner />
        <Flex direction="column" w="100%">
          <Search />
        </Flex>
      </Flex>
    </Flex>
  );
}

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('jamTags', queryTags.getStatic);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
