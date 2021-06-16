import React from 'react';
import { useQuery } from 'react-query';
import { tags as queryTags } from '@lib/queries/tags';

import { Button, Flex, Text, useToken } from '@chakra-ui/react';

function ShowTagsButton({ text, setText, setTags }) {
  if (text === 'Show All') {
    return (
      <Button
        onClick={() => setTags(jamTagData.tags)}
        _hover={{
          border: ' none',
          background: 'none',
          textDecoration: 'underline',
        }}
        borderRadius="4px"
        border="none"
        bg="none"
        color="primary.700"
      >
        <Text variant="B300">Show All</Text>
      </Button>
    );
  } else if (text === 'Show Less') {
    return (
      <Button
        onClick={() => setTags(featuredTags)}
        _hover={{
          border: ' none',
          background: 'none',
          textDecoration: 'underline',
        }}
        borderRadius="4px"
        border="none"
        bg="none"
        color="primary.700"
      >
        <Text variant="B300">Show Less</Text>
      </Button>
    );
  }
}

function Tags() {
  const [selectedFilters, setSelectedFilters] = React.useState([]);
  const { data } = useQuery('jamTags', queryTags.get);

  console.log(data);

  const [tags, setTags] = React.useState([]);

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

  return (
    <Flex w="100%" justify="space-around" align="center" flexWrap="wrap">
      <Text variant="B300" color={useToken('colors', 'grey.900')}>
        Topics:
      </Text>
    </Flex>
  );
}

export default function TagFilters() {
  return (
    <Flex w="100%" mt="22px" align="center" justify="space-between">
      <Flex w="70%">
        <Tags />
      </Flex>
      <Button>x Clear all tags</Button>
    </Flex>
  );
}
