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
  Text,
} from '@chakra-ui/core';

import { FaHashtag } from 'react-icons/fa';

export default function TabbedTagSelection({ tabs, tags }) {
  const [searchTags, setSearchTags] = React.useState([]);

  function addTag(tag) {
    return setSearchTags((prev) => [...prev, tag]);
  }

  function removeTag(tag) {
    return setSearchTags((prev) => prev.filter((pt) => pt !== tag));
  }

  function Panels({ tags }) {
    return (
      <TabPanels>
        {tags.map((tagGroups) => (
          <TabPanel>
            {tagGroups.length >= 1 ? (
              <Wrap>
                {tagGroups.map((tag) => (
                  <Button
                    onClick={() =>
                      searchTags.some(
                        (selected) => selected.title === tag.title,
                      )
                        ? removeTag(tag)
                        : addTag(tag)
                    }
                    variant={
                      searchTags.some(
                        (selected) => selected.title === tag.title,
                      )
                        ? 'solid'
                        : 'outline'
                    }
                    colorScheme={
                      searchTags.some(
                        (selected) => selected.title === tag.title,
                      )
                        ? 'teal'
                        : null
                    }
                    rightIcon={<FaHashtag />}
                  >
                    {tag.title}
                  </Button>
                ))}
              </Wrap>
            ) : (
              <Text>No tags yet</Text>
            )}
          </TabPanel>
        ))}
      </TabPanels>
    );
  }

  return (
    <Flex
      h="xl"
      backgroundColor="rebeccapurple"
      direction="column"
      alignItems="center"
      minW="100%"
    >
      <Center mb={16}>
        <Heading mt={16} mx={16} as="h1" size="2xl">
          Find the right content for you
        </Heading>
      </Center>
      <Tabs>
        <TabList mb="1em">
          {tabs.map((tab) => (
            <Tab key={tab.id}>{tab.title}</Tab>
          ))}
        </TabList>
        <Panels tags={tags} />
      </Tabs>
    </Flex>
  );
}
