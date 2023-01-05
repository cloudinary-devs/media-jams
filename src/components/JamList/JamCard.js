import React from 'react';
import {
  Flex,
  Heading,
  Text,
  Avatar,
  Link,
  useBreakpointValue,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from '@components/Image';
import imageFetch from '@utils/image-fetch';
import format from 'date-fns/format';

export default function JamCard({ jam }) {
  const { author } = jam;
  const gapVariant = useBreakpointValue({ base: '4px', lg: '12px' });

  return (
    <LinkBox
      display="flex"
      w="100%"
      border="1px solid #D3DDE6"
      borderRadius="8px"
      h="200px"
      bg="white"
      data-testid="jam-card"
    >
      <Flex
        w={{ lg: '536px' }}
        direction="column"
        align="flex-start"
        m="24px 0px 24px 24px"
      >
        <Flex align="center" justify="space-between" w="100%">
          <Link as={NextLink} href={`/author/${author.slug?.current}`} passHref>
            <Flex
              align="center"
              justify="space-evenly"
              sx={{ gap: '8px' }}
              mb="12px"
            >
              <Avatar
                size="sm"
                name={author.name}
                src={imageFetch(author.image?.asset.url, { w: 64, h: 64 })}
              />
              <Text variant="B100" color="grey.800" fontWeight="500">
                {author.name}
              </Text>

              <Text variant="B100" color="grey.600">
                <time dateTime={jam.publishedAt}>
                  {format(new Date(jam.publishedAt), 'dd MMMM yyyy')}
                </time>
              </Text>
            </Flex>
          </Link>
        </Flex>
        <LinkOverlay href={`/post/${jam.slug.current}`}>
          <Heading size="H200" w="100%">
            {jam.title}
          </Heading>
        </LinkOverlay>
        <Flex
          mt="16px"
          justify="flex-start"
          sx={{ gap: gapVariant }}
          wrap="wrap"
        >
          {jam.tags.map((tag) => (
            <Text key={tag._id} variant="B100" color="primary.400">
              #{tag.title}
            </Text>
          ))}
        </Flex>
      </Flex>

      <Flex flex="1" align="center" justify="center" mt={2}>
        <Image
          publicId={jam.cover?.asset.url || '/placeholder.png'}
          width={300}
          height={180}
          crop="pad"
          borderRadius="8px!important"
          alt="feature banner of jam"
        />
      </Flex>
    </LinkBox>
  );
}
