import { Flex, List, ListItem } from '@chakra-ui/react';

import TagButton from '@components/TagButton';

const alignProp = {
  center: 'center',
  left: 'flex-start',
  right: 'flex-end',
};

const TagButtonList = ({
  tags = [],
  activeTags = [],
  align = 'center',
  onClick,
  onTagClick,
  ...rest
}) => {
  const activeTagIds = Array.isArray(activeTags)
    ? activeTags.map((tag) => tag._id)
    : [];
  return (
    <Flex
      as={List}
      flexWrap="wrap"
      justifyContent={alignProp[align]}
      onClick={onClick}
      {...rest}
    >
      {tags.map((tag) => {
        const isActive = activeTagIds.includes(tag._id);
        return (
          <ListItem key={tag._id} m="2">
            <TagButton tag={tag} isActive={isActive} onClick={onTagClick} />
          </ListItem>
        );
      })}
    </Flex>
  );
};

export default TagButtonList;
