import React from 'react';
import {
  Flex,
  Heading,
  Text,
  Avatar,
  IconButton,
  useToken,
  Link,
} from '@chakra-ui/react';

import Image from '@components/Image';

import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import {
  useBookmarksQuery,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} from '@hooks/useBookmarks';
import { useUser } from '@auth0/nextjs-auth0';

export default function FeaturedJamCard({ jam }) {
  const { author } = jam;
  const { user } = useUser();
  const [isBookmarked, setBookmark] = React.useState(false);

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
      setBookmark(postIds.includes(post._id));
    }
  }, [dataBookmarks, isLoading]);

  const handleBookmarkOnClick = () => {
    const toggleBookmark = isBookmarked ? removeBookmark : addBookmark;
    toggleBookmark.mutate(post);
  };

  return (
    <Flex
      w="100%"
      border={`2px solid ${useToken('colors', 'primary.400')}`}
      borderRadius="8px"
      h={{ base: '250px', lg: '300px' }}
      boxShadow={`4px 3px 0px 3px ${useToken('colors', 'primary.400')}`}
      p={5}
    >
      <Flex w="60%" direction="column" justify="space-evenly">
        <Flex align="center" justify="space-between" w="100%">
          <Flex align="center" justify="space-evenly" sx={{ gap: '8px' }}>
            <Avatar
              width="28px"
              height="28px"
              name={author.name}
              src={author.image?.asset.url}
            />
            <Link href={`/author/${author.slug?.current}`}>
              <Text variant="B100" color="grey.800" fontWeight="500">
                {author.name}
              </Text>
            </Link>
            <Text variant="B100" color="grey.600">
              1 June
            </Text>
          </Flex>
          <IconButton
            size="sm"
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
        <Link href={`/post/${jam.slug.current}`}>
          <Heading size="H300" w="100%">
            {jam.title}
          </Heading>
        </Link>
        <Flex justify="flex-start" sx={{ gap: '12px' }}>
          {jam.tags.map((tag) => (
            <Text variant="B100" color="primary.400">
              #{tag.title}
            </Text>
          ))}
        </Flex>
      </Flex>
      <Flex align="center" justify="flex-end" flex="1">
        <Image
          src={jam.cover?.asset.url || '/placeholder.png'}
          width={400}
          height={278}
          borderRadius="8px!important"
          pl="16px!important"
        />
      </Flex>
    </Flex>
  );
}
