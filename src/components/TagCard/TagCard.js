import NextLink from 'next/link';
import { Flex, Box, Text, Link } from '@chakra-ui/react';

import ReactIcon from '@components/ReactIcon';

const TagCardContent = ({ tag, onClick, ...rest }) => {
  const image = tag?.image?.asset || {};
  const icon = tag.icon || { name: 'FaTag', provider: 'fa' };

  function handleOnClick(e) {
    if (typeof onClick === 'function') {
      onClick(e, {
        tag,
      });
    }
  }

  return (
    <Text
      as="span"
      display="block"
      position="relative"
      color="white"
      borderRadius="md"
      py="6"
      _hover={{
        textDecoration: 'none',
      }}
      backgroundImage={image.url}
      backgroundSize="cover"
      backgroundPosition="center center"
      backgroundColor="#1B1464"
      _after={{
        display: 'block',
        opacity: 0.8,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
        content: '""',
        backgroundColor: '#1B1464',
      }}
      overflow="hidden"
      boxShadow="0 2px 8px rgba(37, 41, 46, .4)"
      onClick={handleOnClick}
      cursor="pointer"
      {...rest}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        position="relative"
        zIndex="1"
      >
        <ReactIcon {...icon} fontSize="36" margin="0" />
        <Text fontSize="18" fontWeight="bold" mt="3">
          {tag.title}
        </Text>
      </Box>
    </Text>
  );
};

const TagCard = ({ tag, onClick, ...rest }) => {
  const hasOnClick = typeof onClick === 'function';

  if (hasOnClick) {
    return <TagCardContent tag={tag} onClick={onClick} {...rest} />;
  }

  return (
    <NextLink href={`/tags/${tag.slug?.current}`} passHref>
      <Link display="block">
        <TagCardContent tag={tag} {...rest} />
      </Link>
    </NextLink>
  );
};

export default TagCard;
