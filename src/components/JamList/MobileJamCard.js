import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Avatar,
  IconButton,
  Link,
  LinkBox,
  LinkOverlay,
  useBreakpointValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from '@components/Image';
import format from 'date-fns/format';
import imageFetch from '@utils/image-fetch';

import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import {
  useBookmarksQuery,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} from '@hooks/useBookmarks';
import { useUser } from '@auth0/nextjs-auth0';

export default function MobileJamCard({ jam }) {
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
      display="flex"
      w="100%"
      border="1px solid #D3DDE6"
      borderRadius="8px"
      h="200px"
      bg="white"
    >
      <Flex
        w="100%"
        direction="column"
        align="flex-start"
        m="16px 16px 14px 16px"
      >
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
              name={jam?.author.name}
              src={imageFetch(jam?.author.image?.asset.url)}
            />
            <NextLink href={`/author/${jam.author.slug?.current}`} passHref>
              <Link>
                <Text variant="B100" color="grey.800" fontWeight="500">
                  {jam.author.name}
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
            mb={3}
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
        <Flex mt={2} w="100%">
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
          mt="2px"
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
