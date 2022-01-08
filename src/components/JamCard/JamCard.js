import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Box,
  Flex,
  Heading,
  Text,
  Avatar,
  Image,
  List,
  ListItem,
  Badge,
  IconButton,
} from '@chakra-ui/react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import format from 'date-fns/format';

import {
  useBookmarksQuery,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} from '@hooks/useBookmarks';

const DEFAULT_TAGS_TO_SHOW = 3;

const sizes = {
  full: {
    width: 1130,
    height: 330,
  },
  half: {
    width: 540,
    height: 330,
  },
};

const JamCard = ({ jam, size: sizeKey = 'half' }) => {
  const { author, cover } = jam;
  const isFeatured = jam.postMetadata.featured;

  const firstTags = jam.tags.slice(0, DEFAULT_TAGS_TO_SHOW);
  const remainingTags = jam.tags.slice(DEFAULT_TAGS_TO_SHOW);

  const size = sizes[sizeKey];

  const {
    data: bookmarksData = {},
    isLoading: bookmarksIsLoading,
    refetch: bookmarksRefetch,
  } = useBookmarksQuery();
  const { bookmarks = [] } = bookmarksData;
  const isBookmarked = !!bookmarks.find(
    ({ content_id }) => content_id === jam._id,
  );

  const [isBookmarkedLocal, setIsBookmarkedLocal] = useState(false);

  const addBookmark = useAddBookmarkMutation();
  const removeBookmark = useRemoveBookmarkMutation();

  // If the value resets from outside of the component, we want to make sure it's updated
  // to reflect the new value

  useEffect(() => {
    if (isBookmarked !== isBookmarkedLocal) {
      setIsBookmarkedLocal(isBookmarked);
    }
  }, [isBookmarked]);

  /**
   * onBookmarkClick
   */

  function onBookmarkClick(e) {
    e.preventDefault();
    if (!isBookmarked) {
      setIsBookmarkedLocal(true);
      addBookmark.mutate(jam);
    } else {
      setIsBookmarkedLocal(false);
      removeBookmark.mutate(jam);
    }
  }

  return (
    <Box
      position="relative"
      width="100%"
      overflow="hidden"
      height="0"
      pt={`${(size.height / size.width) * 100}%`}
      borderRadius="4"
    >
      <Image
        position="absolute"
        top="0"
        left="0"
        zIndex="0"
        width="100%"
        src={cover.asset.url}
      />
      <Box position="absolute" top="6" right="6" zIndex="2">
        <IconButton
          color="white"
          size="sm"
          outline="none"
          p="0"
          aria-label="bookmark jam"
          borderRadius="100%"
          mr="-2"
          mt="-2"
          bg="grey.900"
          _hover={{
            bg: 'primary.500',
            transition: 'none',
          }}
          _active={{
            bg: 'grey.900',
            transition: 'none',
          }}
          icon={isBookmarkedLocal ? <FaBookmark /> : <FaRegBookmark />}
          onClick={onBookmarkClick}
          disabled={bookmarksIsLoading}
        />
      </Box>
      <Link href={`/post/${jam.slug.current}`}>
        <a>
          <Flex
            direction="column"
            justifyContent="space-between"
            position="absolute"
            top="0"
            left="0"
            zIndex="1"
            width="100%"
            height="100%"
            bgGradient="linear(to-tr, rgba(27, 20, 100, 0.8) 25%, rgba(27, 20, 100, 0))"
            p="6"
          >
            <List>
              {isFeatured && (
                <ListItem
                  display="inline-block"
                  mx="2"
                  _first={{ marginLeft: 0 }}
                  _last={{ marginRight: 0 }}
                >
                  <Badge
                    color="#4E380B"
                    fontWeight="bold"
                    textTransform="none"
                    backgroundColor="#ECC503"
                    px="3"
                  >
                    Featured Jam
                  </Badge>
                </ListItem>
              )}
              <ListItem
                display="inline-block"
                mx="2"
                _first={{ marginLeft: 0 }}
                _last={{ marginRight: 0 }}
              >
                <Badge
                  color="white"
                  fontWeight="bold"
                  textTransform="none"
                  backgroundColor="#3169E1"
                  px="3"
                >
                  {jam.tags[0].title}
                </Badge>
              </ListItem>
            </List>
            <Box>
              <Text color="white" fontSize="24" fontWeight="bold" mb="1">
                Automatically Generate Social Sharing Images
              </Text>
              <List mb="2">
                {firstTags.map((tag) => {
                  return (
                    <ListItem
                      key={tag._id}
                      display="inline-block"
                      color="#D2CEFF"
                      fontSize="14"
                      fontWeight="semibold"
                      mx="2"
                      _first={{ marginLeft: 0 }}
                      _last={{ marginRight: 0 }}
                    >
                      #{tag.title}
                    </ListItem>
                  );
                })}
                {remainingTags.length > 0 && (
                  <ListItem
                    display="inline-block"
                    color="#D2CEFF"
                    fontSize="14"
                    fontWeight="semibold"
                    ml="2"
                  >
                    + {remainingTags.length} more
                  </ListItem>
                )}
              </List>
              <Flex>
                <Link href={`/author/${author.slug?.current}`}>
                  <Avatar
                    size="md"
                    name={author.name}
                    src={author.image.asset.url}
                    mr="4"
                  />
                </Link>
                <Flex direction="column" justifyContent="center">
                  <Text color="white" fontSize="16" fontWeight="bold" mb="1">
                    {author.name}
                  </Text>
                  <Text color="#D2CEFF" fontSize="11" fontWeight="semibold">
                    {format(new Date(jam.publishedAt), 'MMMM d, yyyy')}
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </a>
      </Link>
    </Box>
  );
};

export default JamCard;
