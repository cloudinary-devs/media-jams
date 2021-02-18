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
import { useQuery, useMutation } from 'react-query';
import { bookmarks as bookmarksQuery } from '@lib/queries/bookmarks';
import { useUser } from '@auth0/nextjs-auth0';

import { boxShadow } from '@utils/styles';

export default function JamAccordion({
  color,
  post,
  width,
  defaultIndex,
  ...rest
}) {
  const { author } = post;
  const { user, loading } = useUser();
  const [isBookmarked, setBookmark] = useState(false);
  const addBookmark = useMutation(
    (content_id) => bookmarksQuery.add(content_id),
    {
      onSuccess: () => {
        setBookmark(true);
      },
    },
  );
  const removeBookmark = useMutation(
    (content_id) => bookmarksQuery.remove(content_id),
    {
      onSuccess: () => {
        setBookmark(false);
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
    toggleBookmark.mutate(post._id);
  };
  return (
    <Accordion
      w={width}
      borderRadius="lg"
      boxShadow={boxShadow}
      mb={3}
      borderColor="none"
      bg="white"
      allowToggle
      defaultIndex={defaultIndex || null}
    >
      <AccordionItem p={3} borderRadius="lg">
        <Flex justifyContent="space-between">
          <Flex ml={4} align="center" flex="1" textAlign="left" mt={3}>
            <Avatar
              size="lg"
              name={author.name}
              mr={4}
              src={author.image.asset.url}
            />
            <Flex justift="center" direction="column" color={`${color}.400`}>
              <Link href={`/post/${post.slug.current}`}>
                <Heading textStyle="headline-card">{post.title}</Heading>
              </Link>
              <Text fontSize={{ base: 'sm', md: 'sm', lg: 'sm' }}>
                By {author.name}
              </Text>
              <Flex flexWrap="wrap">
                {post.tags.map((tag) => (
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
          <Flex justifyContent="space-around" width={36} alignItems="center">
            <Button
              as="a"
              colorScheme={color}
              size="sm"
              mr="3px"
              href={`/post/${post.slug.current}`}
            >
              More
            </Button>
            <IconButton
              size="sm"
              icon={isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
              onClick={handleBookmarkOnClick}
            ></IconButton>
            <AccordionButton
              as={Button}
              h="50%"
              alignSelf="center"
              borderRadius="lg"
              variant={color}
              w="30px"
              justifyContent="center"
            >
              <AccordionIcon />
            </AccordionButton>
          </Flex>
        </Flex>
        <AccordionPanel pt={4}>
          <Flex direction="column">
            <Text fontSize="sm">{post.description}</Text>
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
