import React from 'react';
import {
  Box,
  Text,
  Heading,
  Stack,
  Flex,
  Avatar,
  Link,
  useColorModeValue,
  createStandaloneToast,
  Spacer,
  IconButton,
  Button,
  Image,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import format from 'date-fns/format';
import {
  useBookmarkedJamsQuery,
  useRemoveBookmarkMutation,
} from '@hooks/useBookmarks';

import { SearchFieldInput } from './SearchFieldInput';
import { Trashcan } from '@components/Icons';

import Fuse from 'fuse.js';

const fuseOptions = {
  threshold: 0.35,
  location: 0,
  distance: 100,
  minMatchCharLength: 1,
  includeScore: true,
  useExtendedSearch: true,
  isCaseSensitive: true,
  keys: ['title', 'tags.title', 'author.name'],
};

const EmptyBookmarks = ({ user }) => (
  <Stack
    spacing={16}
    px={6}
    py={8}
    direction="column"
    textAlign="center"
    alignItems="center"
  >
    {user ? (
      <>
        <Box size="xs">
          <Image src="/emptyBookmarks.svg" alt="bookmarks empty" />
        </Box>
        <Heading size="H200" color="primary.900">
          You don't have any bookmarks
        </Heading>
      </>
    ) : (
      <>
        <Box size="xs">
          <Image src="/emptyBookmarks.svg" alt="bookmarks empty" />
        </Box>
        <Heading size="H200" color="primary.900">
          You need to sign up to add articles
        </Heading>
        <Button as="a" size="md" colorScheme="primary" href="/api/auth/signup">
          Sign Up
        </Button>
      </>
    )}
  </Stack>
);

export const BookmarkJamCard = ({ jam, ...props }) => {
  const toast = createStandaloneToast();
  const removeBookmark = useRemoveBookmarkMutation({
    onSuccess: () => {
      // toast message
      toast({
        title: `Bookmark: ${jam.title} removed.`,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    },
  });
  const { author, publishedAt } = jam;
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
      <Stack
        direction="row"
        spacing="4"
        spacing={{ base: '1', md: '2' }}
        alignItems="center"
      >
        <Avatar
          width="20px"
          height="20px"
          name={author.name}
          src={author.image?.asset.url}
        />
        <NextLink href={`/author/${author.slug?.current}`} passHref>
          <Link>
            <Text fontSize="md" variant="B500" color="gray.800">
              {author.name}
            </Text>
          </Link>
        </NextLink>
        <Text fontSize="md" color="gray.600">
          <time dateTime={publishedAt}>
            &middot; {format(new Date(publishedAt), 'dd MMMM')}
          </time>
        </Text>
        <Spacer />
        <IconButton
          onClick={() => removeBookmark.mutate(jam)}
          variant="ghost"
          aria-label="Remove Bookmark"
          icon={<Trashcan />}
        />
      </Stack>
      <Flex paddingTop={{ base: 0, md: '2' }} alignItems="start">
        <Heading size="H100">{jam.title}</Heading>
      </Flex>
    </Box>
  );
};

const Bookmarks = ({ user = null }) => {
  const [filteredJams, setFilteredJams] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const { isLoading, data: bookmarkedJams } = useBookmarkedJamsQuery();
  React.useEffect(() => {
    console.log(isLoading);
    if (!searchValue) {
      handleFilter(bookmarkedJams);
    } else {
      const queries = {
        $or: [
          { title: searchValue },
          {
            $path: ['author.name'],
            $val: searchValue,
          },
          {
            $path: 'tags.title',
            $val: searchValue,
          },
        ],
      };
      const results = fuse.search(queries).map((result) => result.item);
      handleFilter(results);
    }
  }, [searchValue, bookmarkedJams]);
  // Set Fuse
  const fuse = new Fuse(bookmarkedJams, fuseOptions);
  const onChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };
  const handleFilter = (data) => {
    setFilteredJams(data);
  };

  return (
    <Flex
      width={{ base: 'full' }}
      direction="column"
      px={{ base: 3, md: 6 }}
      pb={8}
      overflowY="auto"
    >
      {/* check user
        no jams and nothing in the search show empty
     */}
      {!user || (filteredJams?.length === 0 && !searchValue) ? (
        <EmptyBookmarks user={user} />
      ) : (
        <Stack>
          <SearchFieldInput value={searchValue} onChange={onChange} mb={6} />
          {filteredJams?.map((jam) => (
            <BookmarkJamCard key={jam._id} jam={jam} />
          ))}
        </Stack>
      )}
    </Flex>
  );
};

export default Bookmarks;
