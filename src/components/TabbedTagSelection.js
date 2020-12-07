import React from 'react';

import {
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

import TagButton from '@components/TagButton';
import { FaTag } from 'react-icons/fa';

export default function TabbedTagSelection({
  tabs,
  addTag,
  removeTag,
  searchTags,
}) {
  return (
    <Tabs
      border="2px solid black"
      borderRadius="6px"
      boxShadow="0px 9px 38px 0px rgba(0,0,0,0.75)"
      isFitted
    >
      <TabList borderBottom="none" mb="1em">
        {tabs?.map(
          (tab) =>
            tab.tags &&
            tab.tags.length > 0 && (
              <Tab colorScheme="green" fontSize={15} key={tab._id}>
                {tab.title}
              </Tab>
            ),
        )}
      </TabList>
      <TabPanels>
        {tabs?.map(
          (category) =>
            category.tags?.length > 0 && (
              <TabPanel key={category._id}>
                <Wrap
                  key={category._id}
                  w="40rem"
                  justify="center"
                  spacing="10px"
                >
                  {category.tags.map((tag) => (
                    <WrapItem key={tag._id}>
                      <TagButton
                        addTag={addTag}
                        removeTag={removeTag}
                        searchTags={searchTags}
                        icon={<FaTag />}
                        tag={tag}
                      />
                    </WrapItem>
                  ))}
                </Wrap>
              </TabPanel>
            ),
        )}
      </TabPanels>
    </Tabs>
  );
}
