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
      height="18rem"
    >
      <TabList borderBottom="none" p={10} mb="1em">
        {tabs?.map(
          (tab, idx) =>
            tab.tags &&
            tab.tags.length > 0 && (
              <Tab colorScheme="green" fontSize={10} key={idx}>
                {tab.title}
              </Tab>
            ),
        )}
      </TabList>
      <TabPanels>
        {tabs?.map(
          (category, idx) =>
            category.tags?.length > 0 && (
              <TabPanel>
                <Wrap key={idx} w="40rem" justify="center" spacing="10px">
                  {category.tags.map((tag) => (
                    <WrapItem>
                      <TagButton
                        addTag={addTag}
                        removeTag={removeTag}
                        searchTags={searchTags}
                        icon={FaTag}
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
