import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Button,
  Flex,
  Link,
  Heading,
  Text,
  Avatar,
  AccordionIcon,
  IconButton,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { bookmarks as bookmarksQuery } from '@lib/queries/bookmarks';
import { useUser } from '@auth0/nextjs-auth0';

import { boxShadow } from '@utils/styles';

export default function JamAccordion({
  color,
  post,
  width,
  defaultIndex,
  borderRadius,
  w,
  shadow,
  ...rest
}) {
  const { author } = post;
  const { user, loading } = useUser();
  const [isBookmarked, setBookmark] = useState(false);
  const queryClient = useQueryClient();
  const addBookmark = useMutation((post) => bookmarksQuery.add(post._id), {
    onMutate: async (post) => {
      await queryClient.cancelQueries('bookmarks');
      await queryClient.cancelQueries('bookmark jams');
      const previousBookmarkIds = queryClient.getQueryData('bookmarks');
      const previousBookmarkedPosts = queryClient.getQueryData('bookmark jams');

      console.log(previousBookmarkedPosts);

      let newBookmarkedPosts;

      if (previousBookmarkedPosts.length === 0) {
        queryClient.setQueryData('bookmark jams', { allPost: [post] });
      } else {
        newBookmarkedPosts = [...previousBookmarkedPosts.allPost, post];
        queryClient.setQueryData('bookmark jams', {
          allPost: newBookmarkedPosts,
        });
      }

      console.log('Query data set!');

      return previousBookmarkIds;
    },
    // On failure, roll back to the previous value
    onError: (err, variables, previousBookmarkIds) =>
      // TODO: Revisit and add a toast on failure and rollback
      queryClient.setQueryData('bookmarks', previousBookmarkIds),
    // After success or failure, refetch the bookmarks and bookmark jams queries
    onSuccess: () => {
      setBookmark(true);
      queryClient.invalidateQueries('bookmarks');

      console.log('Queries successfully refreshed');
    },
  });
  const removeBookmark = useMutation(
    (post) => bookmarksQuery.remove(post._id),
    {
      onMutate: async (post) => {
        await queryClient.cancelQueries('bookmarks');
        await queryClient.cancelQueries('bookmark jams');
        const previousBookmarkIds = queryClient.getQueryData('bookmarks');
        const previousBookmarks = queryClient.getQueryData('bookmark jams');

        const newBookmarkedPosts = previousBookmarks.allPost.filter(
          (data) => data._id !== post._id,
        );

        if (newBookmarkedPosts.length > 0) {
          queryClient.setQueryData('bookmark jams', {
            allPost: newBookmarkedPosts,
          });
        } else {
          queryClient.setQueryData('bookmark jams', []);
        }

        return previousBookmarkIds;
      },
      // On failure, roll back to the previous value
      onError: (err, variables, previousBookmarkIds) =>
        // TODO: Revisit and add a toast on failure and rollback
        queryClient.setQueryData('bookmarks', previousBookmarkIds),
      // After success or failure, refetch the bookmarks and bookmark jams queries
      onSuccess: () => {
        setBookmark(false);
        queryClient.invalidateQueries('bookmarks');
      },
    },
  );
  const { data: dataBookmarks, isLoading } = useQuery(
    'bookmarks',
    bookmarksQuery.get,
    {
      enabled: !loading && !!user,
    },
  );

  useEffect(() => {
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
    <Accordion
      w={width || w}
      boxShadow={shadow ? boxShadow : 'none'}
      borderColor="none"
      bg="white"
      allowToggle
      borderRadius={borderRadius || 'none'}
      defaultIndex={defaultIndex || null}
      p="0px"
      {...rest}
    >
      <AccordionItem borderRadius={borderRadius || 'none'}>
        <Flex justifyContent="space-between" p={4}>
          <Flex ml={4} align="center" flex="1" textAlign="left" mt={3}>
            <Avatar
              size="lg"
              name={author.name}
              mr={4}
              src={author.image.asset.url}
            />
            <Flex justift="center" direction="column" color={`${color}.400`}>
              <Link href={`/post/${post.slug.current}`}>
                <Heading fontSize="lg">{post.title}</Heading>
              </Link>
              <Text fontSize={{ base: 'sm', md: 'sm', lg: 'sm' }}>
                By {author.name}
              </Text>
              <Flex flexWrap="wrap">
                {post.tags?.map((tag) => (
                  <Text
                    key={tag._id}
                    mr={2}
                    fontSize={{ base: '9px', md: '14px' }}
                  >
                    # {tag.title}
                  </Text>
                ))}
              </Flex>
            </Flex>
          </Flex>
          <Flex justifyContent="space-around" width={24} alignItems="center">
            {user ? (
              <IconButton
                size="sm"
                outline="none"
                bg="none"
                _hover={{
                  bg: 'none',
                }}
                icon={isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                onClick={handleBookmarkOnClick}
              ></IconButton>
            ) : null}

            <AccordionButton
              as={Button}
              h="50%"
              bg="none"
              outline="none"
              alignSelf="center"
              borderRadius="lg"
              variant={color}
              w="5px"
              justifyContent="center"
              _hover={{
                bg: 'none',
              }}
            >
              <AccordionIcon />
            </AccordionButton>
          </Flex>
        </Flex>
        <AccordionPanel borderRadius={borderRadius || 'none'} p="0px">
          <Flex p={4} direction="column">
            <Text fontSize="sm">{post.description}</Text>
          </Flex>
          <Button
            as={Link}
            href={`/post/${post.slug.current}`}
            minW="100%"
            borderTopRightRadius="0px"
            borderTopLeftRadius="0px"
            colorScheme={color}
            color="white"
            textDecoration="none"
            _hover={{
              textDecoration: 'none',
            }}
          >
            Learn
          </Button>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
