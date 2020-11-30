import React from 'react';
import { Tag, TagLabel, Button } from '@chakra-ui/react';

export default function TagButton({
  addTag,
  removeTag,
  searchTags,
  tag,
  icon,
}) {
  return (
    <Button
      size="sm"
      as={Tag}
      colorScheme="green"
      fontSize={10}
      _hover={{
        cursor: 'pointer',
      }}
      key={tag.toString()}
      onClick={() =>
        searchTags.some((selected) => selected === tag)
          ? removeTag(tag)
          : addTag(tag)
      }
      variant={
        searchTags.some((selected) => selected === tag) ? 'solid' : 'outline'
      }
      leftIcon={icon}
    >
      <TagLabel>{tag}</TagLabel>
    </Button>
  );
}
