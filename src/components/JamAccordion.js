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
import { useEffect, useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { bookmarks } from '@lib/queries/bookmarks';
import { useFetchUser } from '@lib/user';

import { boxShadow } from '@utils/styles';

export default function JamAccordion({
  color,
  post,
  width,
  defaultIndex,
  ...rest
}) {
  const { author } = post;
  const { user, loading } = useFetchUser();
  const [isBookmarked, setBookmark] = useState(false);
  useEffect(() => {
    if (!loading && user) {
      const { data } = useQuery('bookmarks', bookmarks.get);
      const postIds = data?.bookmarks?.map(({ content_id }) => content_id);
    }
  }, [user, loading]);
  return (
    <Accordion
      w={width}
      borderRadius="lg"
      boxShadow={boxShadow}
      mb={3}
      borderColor="none"
      bg="white"
      allowToggle
      defaultIndex={defaultIndex ? defaultIndex : null}
      {...rest}
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
                    key={tag}
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
            />
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
