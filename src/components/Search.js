import React, { useState } from 'react';
import Fuse from 'fuse.js';

import { Flex, Stack, Input } from '@chakra-ui/core';

const fuseOptions = {
  threshold: 0.35,
  location: 0,
  distance: 100,
  minMatchCharLength: 1,
  shouldSort: true,
  includeScore: true,
  useExtendedSearch: true,
  keys: ['title', 'tags'],
};

export default function Search({ posts, tagList, handleFilter }) {
  const [searchValue, setSearchValue] = useState('');

  const fuse = new Fuse(posts, fuseOptions);

  React.useEffect(() => {
    if (searchValue === '') {
      handleFilter(posts);
    } else {
      // Allow for a search for tag

      const formattedTitle = searchValue.length ? [{ title: searchValue }] : [];
      const queries = {
        $or: [
          { title: searchValue },
          {
            $and: [...formattedTitle],
          },
        ],
      };
      const results = fuse.search(queries).map((result) => result.item);
      handleFilter(results);
    }
  }, [searchValue]);

  const onChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <Stack
      direction="column"
      w={['100%', '75%', '50%']}
      align="center"
      spacing={[6, 8, 10]}
    >
      <Input value={searchValue} onChange={onChange} />
    </Stack>
  );
}
