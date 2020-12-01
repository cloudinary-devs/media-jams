import React from 'react';

import {
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Wrap,
  Button,
  Text,
} from '@chakra-ui/react';

import { FaHashtag } from 'react-icons/fa';

function Panels({ tabs, searchTags, addTag, removeTag }) {
  return (
    <TabPanel>
      {tabs?.map((category, idx) => {
        return (
          category.tags?.length > 0 && (
            <Wrap key={idx} w="xl" spacing="20px">
              {category.tags.map(({ title, _id }) => (
                <Button
                  size="md"
                  colorScheme="blue"
                  fontSize={10}
                  key={_id.toString()}
                  onClick={() =>
                    searchTags.some((selected) => selected === title)
                      ? removeTag(title)
                      : addTag(title)
                  }
                  variant={
                    searchTags.some((selected) => selected === title)
                      ? 'solid'
                      : 'outline'
                  }
                  rightIcon={<FaHashtag />}
                >
                  {title}
                </Button>
              ))}
            </Wrap>
          )
        );
      })}
    </TabPanel>
  );
}

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
      height="20rem"
    >
      <TabList borderBottom="none" p={10} mb="1em">
        {tabs?.map((tab, idx) => {
          if (tab.tags && tab.tags.length > 0) {
            return (
              <Tab fontSize={10} key={idx}>
                {tab.title}
              </Tab>
            );
          } else {
            return;
          }
        })}
      </TabList>
      <Panels
        addTag={addTag}
        removeTag={removeTag}
        searchTags={searchTags}
        tabs={tabs}
      />
    </Tabs>
  );
}
