import React from 'react';
import {
  Flex,
  Heading,
  Text,
  Avatar,
  LinkBox,
  LinkOverlay,
  useToken,
  Link,
  HStack,
} from '@chakra-ui/react';
import format from 'date-fns/format';
import NextLink from 'next/link';
import Image from '@components/Image';
import imageFetch from '@utils/image-fetch';
import { Star } from '@components/Icons';

function JamListCard({ jam }) {
  const grey = useToken('colors', 'grey.300');

  return (
    <LinkBox
      display="flex"
      bg="white"
      border={`1px solid ${grey}`}
      w="268px"
      h="364px"
      borderRadius="8px"
      flexDirection="column"
    >
      <Image
        src={jam.cover?.asset.url || '/placeholder.png'}
        width={286}
        height={160}
        borderRadiusTopRight="8px!important"
        borderRadiusTopLeft="8px!important"
        objectFit="cover"
        alt="feature banner of jam"
      />
      <Flex
        align="center"
        justify="space-between"
        w="100%"
        p="0px 20px 0px 16px"
      >
        <Flex
          align="center"
          justify="space-evenly"
          sx={{ gap: '8px' }}
          mb="12px"
          mt="24px"
        >
          <Avatar
            width="28px"
            height="28px"
            name={jam?.author.name}
            src={imageFetch(jam?.author.image?.asset.url, { w: 64, h: 64 })}
          />
          <Link as={NextLink} href={`/author/${jam?.author.slug?.current}`} passHref>
            <Text variant="B100" color="grey.800" fontWeight="500">
              {jam?.author.name}
            </Text>
          </Link>
          <Text variant="B100" color="grey.600">
            <time dateTime={jam.publishedAt}>
              {format(new Date(jam.publishedAt), 'dd MMMM yyy')}
            </time>
          </Text>
        </Flex>
      </Flex>
      <Flex p={5}>
        <LinkOverlay href={`/post/${jam.slug.current}`}>
          <Heading
            size="H200"
            w="200px"
            textOverflow="ellipsis"
            h="85px"
            overflow="hidden"
          >
            {jam.title}
          </Heading>
        </LinkOverlay>
      </Flex>
    </LinkBox>
  );
}

export default function FeaturedJamList({ jams }) {
  return (
    <Flex
      w={{ base: '100vw', lg: '100%' }}
      position={{ base: 'relative', md: 'initial' }}
      left={{ base: '50%', md: '0' }}
      right={{ base: '50%', md: '0' }}
      ml={{ base: '-50vw', md: 0 }}
      mr={{ base: '-50vw', md: 0 }}
      mb="24px"
      border={{
        base: 'none',
        lg: `2px solid ${useToken('colors', 'primary.400')}`,
      }}
      borderTop={{
        base: `2px solid ${useToken('colors', 'primary.400')}`,
        md: 'inherit',
      }}
      borderBottom={{
        base: `2px solid ${useToken('colors', 'primary.400')}`,
        md: 'inherit',
      }}
      borderRadius={{ base: '0px', lg: '8px' }}
      h={{ base: '464px', lg: '464px' }}
      boxShadow={{
        base: 'none',
        lg: `4px 3px 0px 3px ${useToken('colors', 'primary.400')}`,
      }}
      direction="column"
      p="0px 24px 24px 24px"
    >
      <Flex align="center">
        <Star mr="8px" />
        <Heading size="H200" mt="16px" mb="16px">
          Featured Jams
        </Heading>
      </Flex>

      <HStack w="100%" gap="28px" overflowX="scroll">
        {jams?.map((jam) => (
          <JamListCard key={jam._id} jam={jam} />
        ))}
      </HStack>
    </Flex>
  );
}
