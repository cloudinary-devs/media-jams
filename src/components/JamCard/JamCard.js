import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Flex,
  Heading,
  Text,
  Avatar,
  Image,
  Icon,
  Link,
  List,
  ListItem,
  Badge,
  IconButton,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import format from 'date-fns/format';
import { useInView } from 'react-intersection-observer';
import imageFetch from '@utils/image-fetch';
import ReactIcon from '@components/ReactIcon';

const DEFAULT_TAGS_TO_SHOW = 3;

const jamCardSizes = {
  large: {
    width: 1130,
    height: 330,
  },
  small: {
    width: 1640,
    height: 1002,
  },
};

const authorAvatarSize = {
  width: 500,
  height: 500,
};

const JamCard = ({ jam, size: sizeKey = 'small' }) => {
  const { author, cover } = jam;
  const isFeatured = jam.postMetadata?.featured;
  const [images, setImages] = useState();
  const tags = jam.tags?.filter((tag) => !!tag);
  const firstTags = tags?.slice(0, DEFAULT_TAGS_TO_SHOW);
  const remainingTags = tags?.slice(DEFAULT_TAGS_TO_SHOW);
  const size = jamCardSizes[sizeKey];

  // If the value resets from outside of the component, we want to make sure it's updated
  // to reflect the new value

  const { ref: jamCardRef, inView, entry } = useInView();

  useEffect(() => {
    if (!inView) return;
    setImages({
      background: cover?.asset?.url,
      author: author?.image?.asset?.url,
    });
  }, [inView]);

  return (
    <Box
      ref={jamCardRef}
      position="relative"
      width="100%"
      overflow="hidden"
      height="0"
      pt={`${(size.height / size.width) * 100}%`}
      borderRadius="4"
      backgroundColor="#6347e2"
    >
      <Link
        as={NextLink}
        href={`/post/${jam.slug.current}`}
        passHref
        display="block"
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        backgroundImage={
          images?.background &&
          imageFetch(images.background, { w: size.width, h: size.height })
        }
        backgroundSize="cover"
        backgroundPosition="center center"
      >
        <Flex
          direction="column"
          justifyContent="space-between"
          position="absolute"
          top="0"
          left="0"
          zIndex="1"
          width="100%"
          height="100%"
          bgGradient="linear(to-tr, rgba(27, 20, 100, .9) 25%, rgba(27, 20, 100, 0))"
          p={{
            base: 4,
            md: 6,
          }}
        >
          <List>
            {isFeatured && (
              <ListItem
                display="inline-block"
                mx="2"
                _first={{ marginLeft: 0 }}
                _last={{ marginRight: 0 }}
              >
                <Badge
                  display="flex"
                  alignItems="center"
                  color="#4E380B"
                  fontSize={{
                    base: 10,
                    md: 12,
                  }}
                  fontWeight="bold"
                  lineHeight={{
                    base: 5,
                    md: 7,
                  }}
                  textTransform="none"
                  backgroundColor="#ECC503"
                  px={{
                    base: 2,
                    md: 3,
                  }}
                >
                  <Icon as={FaStar} mr="1" />
                  Featured Jam
                </Badge>
              </ListItem>
            )}
            <ListItem
              display="inline-block"
              mx={{
                sm: 1,
                md: 2,
              }}
              _first={{ marginLeft: 0 }}
              _last={{ marginRight: 0 }}
            >
              <Badge
                display="flex"
                alignItems="center"
                color="white"
                fontSize={{
                  base: 10,
                  md: 12,
                }}
                fontWeight="bold"
                lineHeight={{
                  base: 5,
                  md: 7,
                }}
                textTransform="none"
                backgroundColor="#3169E1"
                px={{
                  base: 2,
                  md: 3,
                }}
              >
                {jam.tags[0]?.icon && (
                  <ReactIcon
                    {...(jam.tags[0].icon || { name: 'FaTag', provider: 'fa' })}
                    mr="1"
                  />
                )}
                {jam.tags[0]?.title}
              </Badge>
            </ListItem>
          </List>
          <Box>
            <Text
              color="white"
              fontSize={{
                base: 20,
                md: 24,
              }}
              fontWeight="bold"
              mb={{
                base: 0.5,
                md: 1,
              }}
            >
              {jam.title}
            </Text>
            <List
              lineHeight={{
                base: 4,
                md: 8,
              }}
              mb={{
                base: 2,
                md: 4,
              }}
            >
              {firstTags.map((tag) => {
                return (
                  <ListItem
                    key={tag._id}
                    display="inline-block"
                    color="#D2CEFF"
                    fontSize={{
                      base: 10,
                      md: 14,
                    }}
                    fontWeight="semibold"
                    lineHeight="inherit"
                    mx="2"
                    _first={{ marginLeft: 0 }}
                    _last={{ marginRight: 0 }}
                  >
                    #{tag.title}
                  </ListItem>
                );
              })}
              {remainingTags.length > 0 && (
                <ListItem
                  display="inline-block"
                  color="#D2CEFF"
                  fontSize={{
                    base: 10,
                    md: 14,
                  }}
                  fontWeight="semibold"
                  lineHeight="inherit"
                  ml="2"
                >
                  + {remainingTags.length} more
                </ListItem>
              )}
            </List>
            <Flex>
              <Avatar
                size="md"
                name={author.name}
                src={
                  images?.author &&
                  imageFetch(images.author, {
                    w: authorAvatarSize.width,
                    h: authorAvatarSize.height,
                  })
                }
                mr="4"
              />
              <Flex direction="column" justifyContent="center">
                <Text color="white" fontSize="16" fontWeight="bold" mb="1">
                  {author.name}
                </Text>
                <Text color="#D2CEFF" fontSize="11" fontWeight="semibold">
                  {format(new Date(jam.publishedAt), 'MMMM d, yyyy')}
                </Text>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Link>
    </Box>
  );
};

export default JamCard;
