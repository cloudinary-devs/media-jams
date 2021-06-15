import React from 'react';
import { useQuery } from 'react-query';
import { tags as queryTags } from '@lib/queries/tags';

import { Flex, Text, useToken } from '@chakra-ui/react';

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

export default function TagFilters() {
  return (
    <Flex mt="22px" w="480px">
      <Text variant="B300" color={useToken('colors', 'grey.900')}>
        Topics:
      </Text>
      <Flex w="632px" justify="space-evenly">
        <Tags />
      </Flex>
    </Flex>
  );
}
