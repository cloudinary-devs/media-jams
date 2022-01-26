import { List, ListItem, SimpleGrid } from '@chakra-ui/react';

import TagCard from '@components/TagCard';

const TagCardList = ({ tags = [] }) => {
  return (
    <SimpleGrid
      as={List}
      templateColumns={{
        base: 'auto',
        lg: 'repeat(3, minmax(0, 310px))',
      }}
      spacing="4"
    >
      {tags.slice(0, 3).map((tag) => {
        return (
          <ListItem key={tag._id}>
            <TagCard tag={tag} />
          </ListItem>
        );
      })}
    </SimpleGrid>
  );
};

export default TagCardList;
