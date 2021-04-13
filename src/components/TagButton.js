import React from 'react';
import { Button, Text } from '@chakra-ui/react';

export default function TagButton({
  addTag,
  removeTag,
  searchTags,
  tag,
  color,
  ...rest
}) {
  return (
    <Button
      m={{ base: '4px', md: '6px' }}
      size="md"
      fontSize={{ base: '12', md: '16' }}
      colorScheme={color ? color : 'blue'}
      variant={
        searchTags.some((selected) => selected.title === tag.title)
          ? 'solid'
          : 'outline'
      }
      key={tag.toString()}
      onClick={() =>
        searchTags.some((selected) => selected.title === tag.title)
          ? removeTag(tag)
          : addTag(tag)
      }
      {...rest}
    >
      {tag.title}
    </Button>
  );
}
