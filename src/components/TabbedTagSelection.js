import React from 'react';
import {
  Flex,
  Center,
  Heading,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Wrap,
  Button,
} from '@chakra-ui/core';

import { FaHashtag } from 'react-icons/fa';

export default function TabbedTagSelection({ tags, tabs }) {
  const [searchTags, setSearchTags] = React.useState([]);

  function addTag(tag) {
    return setSearchTags((prev) => [...prev, tag]);
  }

  function removeTag(tag) {
    return setSearchTags((prev) => prev.filter((pt) => pt !== tag));
  }

  return (
    <Flex direction="column" alignItems="center">
      <Center mb={16}>
        <Heading mt={16} mx={16} as="h1" size="2xl">
          Find the right content for you
        </Heading>
      </Center>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          {tabs.map((tab) => (
            <Tab>{tab}</Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel>
            <Wrap spacing={8}>
              {tags.map((tag) => {
                return (
                  <Button
                    onClick={() =>
                      searchTags.some((selected) => selected === tag)
                        ? removeTag(tag)
                        : addTag(tag)
                    }
                    variant={
                      searchTags.some((selected) => selected === tag)
                        ? 'solid'
                        : 'outline'
                    }
                    colorScheme={
                      searchTags.some((selected) => selected === tag)
                        ? 'teal'
                        : null
                    }
                    rightIcon={<FaHashtag />}
                  >
                    {tag}
                  </Button>
                );
              })}
            </Wrap>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
