import React from 'react';
import {
  Flex,
  LinkBox,
  LinkOverlay,
  Heading,
  Text,
  Avatar,
  useToken,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import format from 'date-fns/format';
import Image from '@components/Image';
import imageFetch from '@utils/image-fetch';

export default function FeaturedJamCard({ jam }) {
  return (
    <LinkBox
      display="flex"
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
              src={imageFetch(jam?.author.image?.asset.url, { w: 64, h: 64 })}
            />
            <Link
              as={NextLink}
              href={`/author/${jam?.author.slug?.current}`}
              passHref
            >
              <Text variant="B100" color="grey.800" fontWeight="500">
                {jam?.author.name}
              </Text>
            </Link>

            <Text variant="B100" color="grey.600">
              <time dateTime={jam.publishedAt}>
                {format(new Date(jam.publishedAt), 'dd MMMM yyyy')}
              </time>
            </Text>
          </Flex>
        </Flex>
        <LinkOverlay href={`/post/${jam.slug.current}`}>
          <Heading letterSpacing="-0.01em" size="H300" w="100%">
            {jam.title}
          </Heading>
        </LinkOverlay>
        <Flex mt="62px" justify="flex-start" sx={{ gap: '12px' }}>
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
          width={400}
          height={294}
          crop="pad"
          borderRadius="8px!important"
          alt="feature banner of jam"
        />
      </Flex>
    </LinkBox>
  );
}
