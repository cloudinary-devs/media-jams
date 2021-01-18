import React from 'react';

import {
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Wrap,
  WrapItem,
  useBreakpointValue,
} from '@chakra-ui/react';

import TagButton from '@components/TagButton';
import { FaTag } from 'react-icons/fa';

export default function TabbedTagSelection({
  tabs,
  addTag,
  removeTag,
  searchTags,
}) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  // For Mobile display only 3 tabs vs 5 on desktop
  // Ideally these will be wieghted and can be filtered on that
  const tabList = isMobile ? tabs.slice(0, 3) : tabs;
  return (
    <Tabs
      border="2px solid black"
      alignSelf="center"
      borderRadius="6px"
      boxShadow={isMobile ? null : '0px 9px 38px 0px rgba(0,0,0,0.75)'}
      maxW={'42rem'}
      isFitted={!isMobile}
    >
      <TabList borderBottom="none" mb="1em">
        {tabList?.map(
          (tab) =>
            tab.tags?.length > 0 && (
              <Tab fontSize={[18, 15]} key={tab._id}>
                {tab.title}
              </Tab>
            ),
        )}
      </TabList>
      <TabPanels>
        {tabs?.map(
          (category) =>
            category.tags?.length > 0 && (
              <TabPanel alignSelf="center" key={category._id}>
                <Wrap key={category._id} justify="center" spacing="10px">
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
