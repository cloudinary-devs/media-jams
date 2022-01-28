import NextLink from 'next/link';
import { Link, Text } from '@chakra-ui/react';

import ReactIcon from '@components/ReactIcon';

const TagButtonContent = ({ tag, isLink, isActive, onClick, ...rest }) => {
  const icon = tag.icon || { name: 'FaTag', provider: 'fa' };

  function handleOnClick(e) {
    if (typeof onClick === 'function') {
      onClick(e, {
        tag,
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
      as="span"
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
      <ReactIcon {...icon} fontSize="14" mr="3" />
      {tag.title}
    </Text>
  );
};

const TagButton = ({ tag, isActive, onClick }) => {
  const hasOnClick = typeof onClick === 'function';

  if (hasOnClick) {
    return <TagButtonContent tag={tag} isActive={isActive} onClick={onClick} />;
  }

  return (
    <NextLink href={`/tags/${tag.slug?.current}`} passHref>
      <Link display="block">
        <TagButtonContent isActive={isActive} tag={tag} />
      </Link>
    </NextLink>
  );
};

export default TagButton;
