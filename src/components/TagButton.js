import React from 'react';
import { Tag, TagLabel, Button } from '@chakra-ui/react';

export default function TagButton({ addTag, removeTag, searchTags, tag }) {
  return (
    <Button
      size="sm"
      fontSize={10}
      border="none"
      color={
        searchTags.some((selected) => selected.title === tag.title)
          ? 'white'
          : 'black'
      }
      _hover={{
        cursor: 'pointer',
        bg: 'blue.400',
        color: 'white',
      }}
      key={tag.toString()}
      onClick={() =>
        searchTags.some((selected) => selected.title === tag.title)
          ? removeTag(tag)
          : addTag(tag)
      }
      bg={
        searchTags.some((selected) => selected.title === tag.title)
          ? 'blue.400'
          : 'none'
      }
    >
      {tag.title}
    </Button>
  );
}
