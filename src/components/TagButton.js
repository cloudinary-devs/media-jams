import React from 'react';
import { Button } from '@chakra-ui/react';
import { FaHashtag } from 'react-icons/fa';

export default function TagButton({ tags, tag }) {
  return (
    <Button
      onClick={() =>
        tags.some((selected) => selected === tag) ? removeTag(tag) : addTag(tag)
      }
      variant={tags.some((selected) => selected === tag) ? 'solid' : 'outline'}
      colorScheme={tags.some((selected) => selected === tag) ? 'teal' : null}
      rightIcon={<FaHashtag />}
    >
      {tag}
    </Button>
  );
}
