import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Avatar,
  IconButton,
  Link,
  useBreakpointValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from '@components/Image';
import imageFetch from '@utils/image-fetch';
import { buildImageUrl } from 'cloudinary-build-url';

const ogImage1 = buildImageUrl('mediajams/og-image-base-1.jpg', {
  cloud: { cloudName: 'mediadevs' },
});

import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import {
  useBookmarksQuery,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} from '@hooks/useBookmarks';
import { useUser } from '@auth0/nextjs-auth0';

export default function JamCard({ jam }) {
  const { author } = jam;
  const { user } = useUser();
  const [isBookmarked, setBookmark] = React.useState(false);
  const gapVariant = useBreakpointValue({ base: '4px', lg: '12px' });

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
    <Flex
      w="100%"
      border="1px solid #D3DDE6"
      borderRadius="8px"
      h="200px"
      bg="white"
    >
      <Flex
        w={{ lg: '536px' }}
        direction="column"
        align="flex-start"
        m="24px 0px 24px 24px"
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
              name={author.name}
              src={imageFetch(author.image?.asset.url)}
            />
            <NextLink href={`/author/${author.slug?.current}`} passHref>
              <Link>
                <Text variant="B100" color="grey.800" fontWeight="500">
                  {author.name}
                </Text>
              </Link>
            </NextLink>
            <Text variant="B100" color="grey.600">
              1 June
            </Text>
          </Flex>
          <IconButton
            size="md"
            outline="none"
            aria-label="bookmark jam"
            bg="none"
            h="0"
            w="0"
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
            icon={isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
            onClick={handleBookmarkOnClick}
          />
        </Flex>
        <NextLink href={`/post/${jam.slug.current}`} passHref>
          <Link>
            <Heading size="H200" w="100%">
              {jam.title}
            </Heading>
          </Link>
        </NextLink>
        <Flex
          mt="16px"
          justify="flex-start"
          sx={{ gap: gapVariant }}
          wrap="wrap"
        >
          {jam.tags.map((tag) => (
            <Text key={tag._id} variant="B100" color="primary.400">
              #{tag.title}
            </Text>
          ))}
        </Flex>
      </Flex>
      <Flex m="24px 24px 24px 68px" flex="1">
        <Image
          src={jam.cover?.asset.url || '/placeholder.png'}
          width={240}
          height={148}
          borderRadius="4px!important"
          alt="feature banner of jam"
        />
      </Flex>
    </Flex>
  );
}
