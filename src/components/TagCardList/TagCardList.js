import { List, ListItem, SimpleGrid } from '@chakra-ui/react';

import TagCard from '@components/TagCard';

const TagCardList = ({ tags = [], onClick, onTagClick, ...rest }) => {
  return (
    <SimpleGrid
      as={List}
      templateColumns={{
        base: 'auto',
        lg: 'repeat(3, 1fr)',
      }}
      spacing="4"
      onClick={onClick}
      {...rest}
    >
      {tags.slice(0, 3).map((tag) => {
        return (
          <ListItem key={tag._id}>
            <TagCard tag={tag} onClick={onTagClick} />
          </ListItem>
        );
      })}
    </SimpleGrid>
  );
};

export default TagCardList;
