import React from 'react';
import { Tag, TagLabel, Button } from '@chakra-ui/react';

export default function TagButton({ addTag, removeTag, searchTags, tag }) {
  return (
    <Button
      size="lg"
      as={Tag}
      colorScheme="green"
      fontSize={16}
      _hover={{
        cursor: 'pointer',
        bg: 'red.400',
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
          ? 'red.400'
          : 'none'
      }
    >
      {tag.title}
    </Button>
  );
}
