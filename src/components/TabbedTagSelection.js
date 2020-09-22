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

  function Panels({ categories, tags }) {
    // Every category has a Tab.
    // Every TabPanel needs to show the proper tags for that category
    // for every category, render a TabPanel showing the tags for only that category
    console.log({ tags });
    const renderTags = (tags) => {
      for (let key in tags) {
        if (tags[key].length > 0) {
          return tagArray.map((tag) => {
            return (
              <Button
                onClick={() =>
                  searchTags.some((selected) => selected.title === tag.title)
                    ? removeTag(tag)
                    : addTag(tag)
                }
                variant={
                  searchTags.some((selected) => selected.title === tag.title)
                    ? 'solid'
                    : 'outline'
                }
                colorScheme={
                  searchTags.some((selected) => selected.title === tag.title)
                    ? 'teal'
                    : null
                }
                rightIcon={<FaHashtag />}
              >
                {tag.title}
              </Button>
            );
          });
        } else {
          return <Text>No tags yet!</Text>;
        }
      }
    };
    return categories.map((category) => (
      <TabPanel key={category._id}>{renderTags(tags)}</TabPanel>
    ));
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
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          {tabs.map((tab) => (
            <Tab>{tab.title}</Tab>
          ))}
        </TabList>
        <TabPanels>
          <Panels categories={tabs} tags={tags} />
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
