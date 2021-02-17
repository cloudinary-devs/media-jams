import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Button,
  Flex,
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
          <Flex flex="1" textAlign="left">
            <Avatar
              boxShadow={boxShadow}
              size="lg"
              name={author.name}
              mr={4}
              src={author.image.asset.url}
            />
            <Flex direction="column">
              <Heading
                fontSize={{ base: '.8rem', md: '1rem', lg: '1.125rem' }}
                textStyle="headline-card"
              >
                {post.title}
              </Heading>
              <Text fontSize={{ base: 'sm', md: 'sm', lg: 'md' }}>
                By {author.name}
              </Text>
              <Flex flexWrap="wrap">
                {post.tags.map((tag) => (
                  <Text
                    key={tag._id}
                    mr={2}
                    color={`${color}.400`}
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
              p={3}
              mr={2}
              href={`/post/${post.slug.current}`}
            >
              More
            </Button>
            <IconButton
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
            <Text fontSize={{ base: 'sm', lg: 'md', xl: 'md' }}>
              {post.description}
            </Text>
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
