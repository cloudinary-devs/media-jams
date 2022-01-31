import { Flex, List, ListItem } from '@chakra-ui/react';

import AuthorButton from '@components/AuthorButton';

const alignProp = {
  center: 'center',
  left: 'flex-start',
  right: 'flex-end',
};

const AuthorButtonList = ({
  authors = [],
  activeAuthors = [],
  align = 'center',
  onClick,
  onAuthorClick,
  ...rest
}) => {
  const activeAuthorIds = Array.isArray(activeAuthors)
    ? activeAuthors.map((author) => author._id)
    : [];
  return (
    <Flex
      as={List}
      flexWrap="wrap"
      justifyContent={alignProp[align]}
      onClick={onClick}
      {...rest}
    >
      {authors.map((author) => {
        const isActive = activeAuthorIds.includes(author._id);
        return (
          <ListItem key={author._id} m="2">
            <AuthorButton
              author={author}
              isActive={isActive}
              onClick={onAuthorClick}
            />
          </ListItem>
        );
      })}
    </Flex>
  );
};

export default AuthorButtonList;
