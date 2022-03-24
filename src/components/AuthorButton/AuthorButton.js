import NextLink from 'next/link';
import { Link, Text, Icon } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';

import ReactIcon from '@components/ReactIcon';

const AuthorButtonContent = ({
  author,
  isLink,
  isActive,
  onClick,
  ...rest
}) => {
  function handleOnClick(e) {
    if (typeof onClick === 'function') {
      onClick(e, {
        author,
      });
    }
  }

  const ButtonProps = {
    backgroundColor: '#1B1464',
    bgGradient: 'linear(to-tr, rgba(27, 20, 100, 1) 25%, rgba(49, 41, 133, 1))',
    boxShadow: '0 2px 4px rgba(37, 41, 46, .4)',
  };

  if (isActive) {
    ButtonProps.backgroundColor = '#3169E1';
    ButtonProps.bgGradient =
      'linear(to-tr, rgba(49, 105, 225, 1) 25%, rgba(88, 137, 241, 1))';
    ButtonProps.boxShadow =
      '0 2px 4px rgb(37 41 46 / 40%), 0 0 10px rgb(49 105 225 / 50%)';
  }

  return (
    <Text
      as="button"
      display="flex"
      alignItems="center"
      color="white"
      fontSize="15"
      fontWeight="bold"
      borderRadius="md"
      _hover={{
        textDecoration: 'none',
      }}
      px="5"
      py="3"
      cursor="pointer"
      onClick={handleOnClick}
      {...ButtonProps}
      {...rest}
    >
      <Icon as={FaUser} fontSize="14" mr="3" />
      {author.name}
    </Text>
  );
};

const AuthorButton = ({ author, isActive, onClick }) => {
  const hasOnClick = typeof onClick === 'function';

  if (hasOnClick) {
    return (
      <AuthorButtonContent
        author={author}
        isActive={isActive}
        onClick={onClick}
      />
    );
  }

  return (
    <NextLink href={`/author/${author.slug?.current}`} passHref>
      <Link display="block">
        <AuthorButtonContent isActive={isActive} author={author} />
      </Link>
    </NextLink>
  );
};

export default AuthorButton;
