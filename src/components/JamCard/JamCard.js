import {
  Box,
  Flex,
  Heading,
  Text,
  Avatar,
  Image,
  List,
  ListItem,
  Badge,
} from '@chakra-ui/react';
import format from 'date-fns/format';

const DEFAULT_TAGS_TO_SHOW = 3;

const sizes = {
  full: {
    width: 1130,
    height: 330,
  },
  half: {
    width: 540,
    height: 330,
  },
};

const JamCard = ({ jam, size: sizeKey = 'half' }) => {
  const { author, cover } = jam;
  const isFeatured = jam.postMetadata.featured;

  const firstTags = jam.tags.slice(0, DEFAULT_TAGS_TO_SHOW);
  const remainingTags = jam.tags.slice(DEFAULT_TAGS_TO_SHOW);

  const size = sizes[sizeKey];

  console.log('sizeKey', sizeKey);
  console.log('size', size);

  return (
    <Box
      position="relative"
      width="100%"
      overflow="hidden"
      height="0"
      pt={`${(size.height / size.width) * 100}%`}
      borderRadius="4"
    >
      <Image
        position="absolute"
        top="0"
        left="0"
        zIndex="0"
        width="100%"
        src={cover.asset.url}
      />
      <Flex
        direction="column"
        justifyContent="space-between"
        position="absolute"
        top="0"
        left="0"
        zIndex="1"
        width="100%"
        height="100%"
        bgGradient="linear(to-tr, rgba(27, 20, 100, 0.8) 25%, rgba(27, 20, 100, 0))"
        p="6"
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
                color="#4E380B"
                fontWeight="bold"
                textTransform="none"
                backgroundColor="#ECC503"
                px="3"
              >
                Featured Jam
              </Badge>
            </ListItem>
          )}
          <ListItem
            display="inline-block"
            mx="2"
            _first={{ marginLeft: 0 }}
            _last={{ marginRight: 0 }}
          >
            <Badge
              color="white"
              fontWeight="bold"
              textTransform="none"
              backgroundColor="#3169E1"
              px="3"
            >
              {jam.tags[0].title}
            </Badge>
          </ListItem>
        </List>
        <Box>
          <Text color="white" fontSize="24" fontWeight="bold" mb="1">
            Automatically Generate Social Sharing Images
          </Text>
          <List mb="2">
            {firstTags.map((tag) => {
              return (
                <ListItem
                  key={tag._id}
                  display="inline-block"
                  color="#D2CEFF"
                  fontSize="14"
                  fontWeight="semibold"
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
                fontSize="14"
                fontWeight="semibold"
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
              src={author.image.asset.url}
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
    </Box>
  );
};

export default JamCard;
