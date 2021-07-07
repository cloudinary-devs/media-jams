import React from 'react';
import {
  Box,
  Text,
  Heading,
  Stack,
  Flex,
  Avatar,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  useColorModeValue,
  useToken,
  VStack,
  Spacer,
} from '@chakra-ui/react';
import { Search as SearchIcon } from '@components/Icons';
import { useQuery } from 'react-query';
import { authors } from '@lib/queries/authors';

import { SocialHandlesCollection } from '@components/AuthorBanner';

import Fuse from 'fuse.js';

const fuseOptions = {
  threshold: 0.35,
  location: 0,
  distance: 100,
  minMatchCharLength: 2,
  includeScore: true,
  useExtendedSearch: true,
  isCaseSensitive: true,
  keys: ['name'],
};

export const SearchField = ({ searchValue, onChange, ...props }) => {
  return (
    <InputGroup
      size="md"
      bg="#FFFFFF"
      borderRadius="8px"
      border="1px solid #D3DDE6"
      {...props}
    >
      <InputLeftElement pointerEvents="none">
        <SearchIcon opacity={0.82} />
      </InputLeftElement>
      <Input
        value={searchValue}
        onChange={onChange}
        placeholder="Search"
        bg="whiteAlpha.400"
        border={0}
        focusBorderColor="whiteAlpha.800"
        _placeholder={{
          fontFamily: 'DM Sans',
          fontSize: '16px',
          color: useToken('colors', 'grey.700'),
        }}
      />
    </InputGroup>
  );
};

export const AuthorCard = ({ author, ...props }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.700')}
      border="1px solid #D3DDE6"
      borderRadius="8px"
      maxWidth="2xl"
      marginTop={2}
      p={{ base: '2', md: '3' }}
      shadow={{ md: 'base' }}
      {...props}
    >
      <Flex direction="row" spacing={{ base: '1', md: '2' }}>
        <Avatar
          width="48px"
          height="48px"
          name={author.name}
          src={author.image?.asset.url}
        />
        <VStack alignItems="flex-start" ml="2">
          <Link href={`/author/${author.slug?.current}`}>
            <Heading as="h5" size="H100">
              {author.name}
            </Heading>
          </Link>
          <Text variant="B200">{author.jobTitle}</Text>
        </VStack>
        <Spacer />
        <Flex
          direction={{ base: 'column', md: 'row' }}
          paddingTop={{ base: 0, md: '2' }}
          justifyContent="space-around"
        >
          <SocialHandlesCollection
            socialHandles={author?.socialHandles}
            color="grey.600"
            website={false}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

const AuthorsPanel = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [filteredAuthors, setFilteredAuthors] = React.useState([]);
  const { data, isLoading } = useQuery(`authors`, () => authors.get());

  React.useEffect(() => {
    if (!data?.authors) return;
    if (!searchValue) {
      handleFilter(data?.authors);
    } else {
      const queries = {
        $or: [
          {
            $path: ['name'],
            $val: searchValue,
          },
        ],
      };
      const results = fuse.search(queries).map((result) => result.item);
      handleFilter(results);
    }
  }, [searchValue, data]);

  const fuse = new Fuse(data?.authors, fuseOptions);

  const onChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleFilter = (data) => setFilteredAuthors(data);
  if (isLoading) {
    return <span>Loading...</span>;
  }
  return (
    <Flex
      width={{ base: 'full' }}
      direction="column"
      px={{ base: 3, md: 6 }}
      pb={8}
      overflowY="auto"
    >
      <Stack>
        <SearchField value={searchValue} onChange={onChange} mb={6} />
        {filteredAuthors.map((author) => (
          <AuthorCard author={author} />
        ))}
      </Stack>
    </Flex>
  );
};

export default AuthorsPanel;
