import React from 'react';
import {
  Flex,
  Heading,
  Text,
  Avatar,
  Link,
  LinkBox,
  LinkOverlay,
  useBreakpointValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import format from 'date-fns/format';
import imageFetch from '@utils/image-fetch';

export default function MobileJamCard({ jam }) {
  const gapVariant = useBreakpointValue({ base: '0px 8px', lg: '12px' });

  return (
    <LinkBox
      display="flex"
      w="100%"
      border="1px solid #D3DDE6"
      borderRadius="8px"
      h="200px"
      bg="white"
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
              src={imageFetch(jam?.author.image?.asset.url, { w: 64, h: 64 })}
            />
            <Link as={NextLink} href={`/author/${jam.author.slug?.current}`} passHref>
              <Text variant="B100" color="grey.800" fontWeight="500">
                {jam.author.name}
              </Text>
            </Link>
            <Text variant="B100" color="grey.600">
              <time dateTime={jam.publishedAt}>
                {format(new Date(jam.publishedAt), 'dd MMMM yyy')}
              </time>
            </Text>
          </Flex>
        </Flex>
        <Flex mt={2} w="100%">
          <LinkOverlay href={`/post/${jam.slug.current}`}>
            <Heading
              size="H200"
              textOverflow="ellipsis"
              h="85px"
              overflow="hidden"
            >
              {jam.title}
            </Heading>
          </LinkOverlay>
        </Flex>
        <Flex
          w="100%"
          mt="2px"
          justify="flex-start"
          sx={{ gap: gapVariant }}
          wrap="wrap"
        >
          {jam.tags.slice(0, 4).map((tag) => (
            <Text variant="B100" color="primary.400">
              #{tag.title}
            </Text>
          ))}
        </Flex>
      </Flex>
    </LinkBox>
  );
}
