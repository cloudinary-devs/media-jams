import React from 'react';
import { Button } from '@chakra-ui/react';

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
      size="sm"
      fontSize={9}
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
