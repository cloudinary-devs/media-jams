import React from 'react';

import { Wrap, Heading, Button } from '@chakra-ui/core';

import { FaHashtag } from 'react-icons/fa';

export default function CategoryTagList({
  addTag,
  removeTag,
  categories,
  selectedFilters,
  filteredTagResults,
}) {
  console.log(filteredTagResults);
  return categories.map((category) => (
    <>
      {category.tags?.length >= 1 && (
        <>
          <Heading fontSize="16px">{category.title}</Heading>
          <Wrap spacing="3px">
            {filteredTagResults.map((tag) => {
              return (
                <Button
                  key={tag.toString()}
                  size="sm"
                  fontSize="10px"
                  onClick={() =>
                    selectedFilters.some((selected) => selected === tag)
                      ? removeTag(tag)
                      : addTag(tag)
                  }
                  variant={
                    selectedFilters.some((selected) => selected === tag)
                      ? 'solid'
                      : 'outline'
                  }
                  colorScheme={
                    selectedFilters.some((selected) => selected === tag)
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
        </>
      )}
    </>
  ));
}
