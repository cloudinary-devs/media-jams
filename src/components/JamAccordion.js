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
import {
  useBookmarksQuery,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} from '@hooks/useBookmarks';
import { useUser } from '@auth0/nextjs-auth0';
import NextLink from 'next/link';

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
  const { data: dataBookmarks, isLoading } = useBookmarksQuery();
  const addBookmark = useAddBookmarkMutation({
    onSuccess: () => setBookmark(true),
  });
  const removeBookmark = useRemoveBookmarkMutation({
    onSuccess: () => setBookmark(true),
  });

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
      bg="white"
      allowToggle
      borderBottomWidth="0px"
      borderRadius={borderRadius || 'none'}
      defaultIndex={defaultIndex || null}
      p="0px"
      {...rest}
    >
      <AccordionItem
        _last={{ borderBottomWidth: '0px' }}
        borderRadius={borderRadius || 'none'}
      >
        {({ isExpanded }) => {
          return (
            <>
              <Flex justifyContent="space-between" p=".5rem">
                <Flex
                  ml={4}
                  align="center"
                  flex="1"
                  textAlign="left"
                  mt={1}
                  mb={1}
                  _last={{ borderBottom: 'none' }}
                >
                  <Avatar
                    size="lg"
                    name={author.name}
                    mr={4}
                    src={author.image.asset.url}
                    borderWidth="3px"
                    borderColor={`${color}.400`}
                    showBorder
                  />
                  <Flex
                    justift="center"
                    direction="column"
                    color={`${color}.400`}
                  >
                    <Link href={`/post/${post.slug.current}`}>
                      <Heading fontSize="md">{post.title}</Heading>
                    </Link>
                    <Link href={`/author/${author.slug?.current || ''}`}>
                      <Text fontSize={{ base: 'sm', md: 'sm', lg: 'sm' }}>
                        By {author.name}
                      </Text>
                    </Link>
                  </Flex>
                </Flex>

                <Flex width={20} alignItems="center">
                  {user ? (
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
                  ) : null}

                  <AccordionButton
                    as={Button}
                    bg="none"
                    outline="none"
                    variant={color}
                    justifyContent="center"
                    h="0"
                    w="0"
                    paddingLeft="0"
                    paddingRight="0"
                    paddingTop="0"
                    paddingBottom="0"
                    _focus={{
                      outline: 'none',
                      boxShadow: 'none',
                    }}
                    _hover={{
                      bg: 'none',
                    }}
                  >
                    <AccordionIcon />
                  </AccordionButton>
                </Flex>
              </Flex>

              <AccordionPanel borderRadius={borderRadius || 'none'} p="0px">
                <Flex textAlign="center" p={4} direction="column">
                  <Text fontSize="md">{post.description}</Text>
                  <Flex mt={4} color="white" alignSelf="center" flexWrap="wrap">
                    {post.tags?.slice(0, 4).map((tag) => (
                      <NextLink
                        key={tag._id}
                        href={{
                          pathname: '/post',
                          query: { tags: tag.title },
                        }}
                      >
                        <Link
                          mr={5}
                          fontSize={{ base: 'xs', md: 'xs' }}
                          _hover={{ textDecoration: 'none' }}
                          bg={`${color}.400`}
                          borderRadius={borderRadius}
                          letterSpacing="1px"
                          p={2}
                        >
                          #{tag.title}
                        </Link>
                      </NextLink>
                    ))}
                  </Flex>
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
            </>
          );
        }}
      </AccordionItem>
    </Accordion>
  );
}
