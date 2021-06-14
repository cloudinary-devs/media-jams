import React from 'react';
import { Flex, Input, Text, useToken } from '@chakra-ui/react';

import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { tags as queryTags } from '@lib/queries/tags';

function SideStrip() {
  return (
    <Flex
      direction="column"
      w="80px"
      h="100vh"
      opacity="0.12"
      bg="#FFFFFF"
    ></Flex>
  );
}

function SideNav() {
  return <Flex w="480px" h="100vh"></Flex>;
}

function Tag() {}

function Tags() {
  const [selectedFilters, setSelectedFilters] = React.useState([]);
  const { data: jamTagData } = useQuery('jamTags', queryTags.get);

  function addTag(tag) {
    return setSelectedFilters((prev) => [...prev, tag]);
  }

  function removeTag(tag) {
    return setSelectedFilters((prev) => prev.filter((pt) => pt !== tag));
  }

  const clearAllTags = () => {
    routerPushTags();
    setSelectedFilters([]);
  };

  return jamTagData?.tags
    ? jamTagData?.tags
        .slice(0, 8)
        .map((tag) => <Text variant="B300">{tag.title}</Text>)
    : null;
}

export default function NewDashboard() {
  return (
    <Flex bg="#F8F7FC">
      <Flex
        w="480px"
        background="linear-gradient(180deg, #8472DF 0%, #7BCCFF 100%)"
      >
        <SideStrip />
        <SideNav />
      </Flex>
      <Flex
        w="100%"
        height="100%"
        overflow="auto"
        direction="column"
        alignItems="center"
      >
        <Input
          bg="#FFFFFF"
          w="888px"
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
        <Flex mt="22px" width="888px">
          <Text variant="B300" color={useToken('colors', 'grey.900')}>
            Topics:{' '}
          </Text>
          <Flex w="632px" justify="space-evenly">
            <Tags />
          </Flex>
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
