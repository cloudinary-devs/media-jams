import React from 'react';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Wrap,
  Button,
  Heading,
} from '@chakra-ui/core';

import { FaHashtag } from 'react-icons/fa';

import Fuse from 'fuse.js';

export default function SearchDrawer({
  categories,
  addTag,
  removeTag,
  searchTags,
  isOpen,
  onClose,
  finalFocusRef,
  placement,
}) {
  // Create a fuse search config to fuzzy search tags

  // Hold onto the base state of "categories" and give the UI something to filter

  // Render the filtered items similarly to how we handle posts

  return (
    <Drawer
      isOpen={isOpen}
      placement={placement}
      onClose={onClose}
      finalFocusRef={finalFocusRef}
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filter</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Filter tags, keywords, & authors...." />
            {categories.map((category) => (
              <>
                {category.tags?.length >= 1 && (
                  <>
                    <Heading fontSize="16px">{category.title}</Heading>
                    <Wrap spacing="3px">
                      {category.tags?.map((tag) => (
                        <Button
                          key={tag.toString()}
                          size="sm"
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
                      ))}
                    </Wrap>
                  </>
                )}
              </>
            ))}
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
