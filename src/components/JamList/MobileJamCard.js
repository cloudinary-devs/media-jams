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
      overflow={{ base: 'scroll', md: 'none' }}
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
              src={jam?.author.image?.asset.url}
            />
            <NextLink href={`/author/${jam?.author.slug?.current}`} passHref>
              <Link>
                <Text variant="B100" color="grey.800" fontWeight="500">
                  {jam?.author.name}
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
        <Flex justify="space-between" w="100%">
          <NextLink href={`/post/${jam.slug.current}`} passHref>
            <Link>
              <Heading
                size="H200"
                w="215px"
                textOverflow="ellipsis"
                h="85px"
                overflow="hidden"
              >
                {jam.title}
              </Heading>
            </Link>
          </NextLink>
          <Image
            src={jam.cover?.asset.url || '/placeholder.png'}
            width={80}
            height={80}
            borderRadius="4px!important"
            objectFit="cover"
          />
        </Flex>
        <Flex
          w="85%"
          mt="16px"
          justify="flex-start"
          sx={{ gap: gapVariant }}
          wrap="nowrap"
          textOverflow="ellipsis"
        >
          {jam.tags.slice(0, 4).map((tag) => (
            <Text variant="B100" color="primary.400">
              #{tag.title}
            </Text>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}