import React from 'react';
import {
  Box,
  LinkBox,
  LinkOverlay,
  Flex,
  Heading,
  Text,
  Avatar,
  IconButton,
  useToken,
  Link,
  useBreakpointValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import format from 'date-fns/format';
import Image from '@components/Image';
import imageFetch from '@utils/image-fetch';

import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import {
  useBookmarksQuery,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} from '@hooks/useBookmarks';
import { useUser } from '@auth0/nextjs-auth0';

export default function MobileFeaturedJamCard({ jam }) {
  const { author } = jam;
  const { user } = useUser();
  const [isBookmarked, setBookmark] = React.useState(false);
  const gapVariant = useBreakpointValue({ base: '0px 8px', lg: '12px' });

  const { data: dataBookmarks, isLoading } = useBookmarksQuery();

  const addBookmark = useAddBookmarkMutation({
    onMutate: () => setBookmark(true),
  });
  const removeBookmark = useRemoveBookmarkMutation({
    onMutate: () => setBookmark(false),
  });

  React.useEffect(() => {
    if (user && dataBookmarks) {
      const postIds = dataBookmarks?.bookmarks?.map(
        ({ content_id }) => content_id,
      );
      setBookmark(postIds?.includes(jam._id));
    }
  }, [dataBookmarks, isLoading]);

  const handleBookmarkOnClick = () => {
    const toggleBookmark = isBookmarked ? removeBookmark : addBookmark;
    toggleBookmark.mutate(jam);
  };
  return (
    <LinkBox
      href={`/author/${jam?.author.slug?.current}`}
      w="100%"
      border={`2px solid ${useToken('colors', 'primary.400')}`}
      borderRadius="8px"
      h="200px"
      boxShadow={`4px 3px 0px 3px ${useToken('colors', 'primary.400')}`}
    >
      <Flex
        w="100%"
        direction="column"
        align="flex-start"
        m="10px 16px 14px 16px"
      >
        <Flex
          align="center"
          justify="center"
          w="100px"
          h="18px"
          bg="#FFFBEA"
          mb={2}
        >
          <Text color="#B9850D" variant="B200" fontWeight="500">
            Featured Jam
          </Text>
        </Flex>
        <Flex align="center" justify="space-between" w="100%">
          <Flex
            align="center"
            justify="space-evenly"
            sx={{ gap: '8px' }}
            mb="12px"
          >
            <Avatar
              width="28px"
              height="28px"
              name={author.name}
              src={imageFetch(author.image?.asset.url)}
            />
            <NextLink href={`/author/${jam?.author.slug?.current}`} passHref>
              <Link>
                <Text variant="B100" color="grey.800" fontWeight="500">
                  {author.name}
                </Text>
              </Link>
            </NextLink>
            <Text variant="B100" color="grey.600">
              <time dateTime={jam.publishedAt}>
                {format(new Date(jam.publishedAt), 'dd MMMM yyy')}
              </time>
            </Text>
          </Flex>
          <IconButton
            position="relative"
            zIndex="1"
            size="md"
            outline="none"
            bg="none"
            h="0"
            w="0"
            mr={8}
            paddingLeft="0"
            paddingRight="0"
            paddingTop="0"
            paddingBottom="0"
            _focus={{
              boxShadow: 'none',
            }}
            _hover={{
              bg: 'none',
            }}
            aria-label="bookmark jam"
            icon={isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
            onClick={handleBookmarkOnClick}
          />
        </Flex>
        <Flex mt={1} w="100%">
          <LinkOverlay href={`/post/${jam.slug.current}`}>
            <Heading
              size="H200"
              textOverflow="ellipsis"
              h="85px"
              overflow="hidden"
            >
              {jam.title}
            </Heading>
          </LinkOverlay>
        </Flex>
        <Flex
          w="100%"
          justify="flex-start"
          sx={{ gap: gapVariant }}
          wrap="wrap"
        >
          {jam.tags.slice(0, 4).map((tag) => (
            <Text variant="B100" color="primary.400">
              #{tag.title}
            </Text>
          ))}
        </Flex>
      </Flex>
    </LinkBox>
  );
}
