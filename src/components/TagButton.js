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
      size="lg"
      as={Tag}
      colorScheme="green"
      fontSize={16}
      _hover={{
        cursor: 'pointer',
      }}
      key={tag.toString()}
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
      leftIcon={icon}
    >
      <TagLabel>{tag.title}</TagLabel>
    </Button>
  );
}
