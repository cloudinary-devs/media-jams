import React from 'react';
import {
  LinkBox,
  LinkOverlay,
  Text,
  Heading,
  Stack,
  Flex,
  Avatar,
  useColorModeValue,
  useMediaQuery,
  VStack,
  Spacer,
  HStack,
} from '@chakra-ui/react';
import imageFetch from '@utils/image-fetch';
import NextLink from 'next/link';
import { useJamsQuery } from '@hooks/useJams';
import { useAuthorsQuery } from '@hooks/useAuthors';

import { SocialHandlesCollection } from '@components/AuthorBanner';
import { SearchFieldInput } from './SearchFieldInput';
import { LoadingSkeleton } from './LoadingSkeleton';

import Fuse from 'fuse.js';
import { useSidePanel } from '@components/SidePanelProvider';

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

export const AuthorCard = ({ author, ...props }) => {
  const { onClose } = useSidePanel();
  const isMobile = useMediaQuery('(min-width: 30em)');
  return (
    <LinkBox
      onClick={() => {
        if (isMobile) {
          return onClose;
        }
      }}
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
          name={author.name}
          src={imageFetch(author.image?.asset.url, { w: 64, h: 64 })}
        />
        <VStack alignItems="flex-start" ml="2">
          <LinkOverlay href={`/author/${author.slug?.current}`}>
            <Heading as="h5" size="H100">
              {author.name}
            </Heading>
          </LinkOverlay>
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
    </LinkBox>
  );
};

const AuthorsPanel = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [filteredAuthors, setFilteredAuthors] = React.useState([]);
  const { data, isLoading } = useAuthorsQuery();
  const { data: allJamData } = useJamsQuery();

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
  }, [searchValue, data, allJamData]);
  const fuse = new Fuse(data?.authors, fuseOptions);

  const onChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleFilter = (data) => {
    setFilteredAuthors(
      data.filter((author) => {
        return allJamData?.jams.some((jam) => jam.author._id === author._id);
      }),
    );
  };
  return (
    <Flex
      width={{ base: 'full' }}
      direction="column"
      px={{ base: 3, md: 6 }}
      pb={8}
      overflowY="auto"
    >
      <Stack>
        <SearchFieldInput value={searchValue} onChange={onChange} mb={2} />
        <LoadingSkeleton isLoading={isLoading}>
          <HStack mb={2}>
            <Text variant="B200">{data?.authors?.length} Authors</Text>
          </HStack>
        </LoadingSkeleton>
        {filteredAuthors.map((author) => (
          <AuthorCard key={author._id} author={author} />
        ))}
      </Stack>
    </Flex>
  );
};

export default AuthorsPanel;
