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
import NextLink from 'next/link';
import Image from '@components/Image';

import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import {
  useBookmarksQuery,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} from '@hooks/useBookmarks';
import { useUser } from '@auth0/nextjs-auth0';

export default function FeaturedJamCard({ jam }) {
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
      border={`2px solid ${useToken('colors', 'primary.400')}`}
      borderRadius="8px"
      h={{ base: '250px', lg: '300px' }}
      boxShadow={`4px 3px 0px 3px ${useToken('colors', 'primary.400')}`}
    >
      <Flex
        w={{ lg: '436px' }}
        direction="column"
        align="flex-start"
        m="24px 0px 24px 24px"
      >
        <Flex
          align="center"
          justify="center"
          w="120px"
          h="24px"
          bg="#FFFBEA"
          mt="24px"
        >
          <Text color="#B9850D" variant="B200" fontWeight="500">
            Featured Jam
          </Text>
        </Flex>
        <Flex align="center" justify="space-between" w="100%" mt="24px">
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
        <NextLink href={`/post/${jam.slug.current}`} passHref>
          <Link>
            <Heading letterSpacing="-0.01em" size="H300" w="100%">
              {jam.title}
            </Heading>
          </Link>
        </NextLink>
        <Flex mt="72px" justify="flex-start" sx={{ gap: '12px' }}>
          {jam.tags.map((tag) => (
            <Text variant="B100" color="primary.400">
              #{tag.title}
            </Text>
          ))}
        </Flex>
      </Flex>
      <Flex m="24px 24px 24px 68px" flex="1">
        <Image
          src={jam.cover?.asset.url || '/placeholder.png'}
          width={352}
          height={252}
          borderRadius="8px!important"
          objectFit="cover"
        />
      </Flex>
    </Flex>
  );
}
