import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Spacer,
  HStack,
  VStack,
  Avatar,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import format from 'date-fns/format';
import imageFetch from '@utils/image-fetch';
import Image from '@components/Image';

export default function JamContentHero({
  description,
  title,
  author,
  imageUrl,
  date,
  children,
}) {
  return (
    <Flex
      as="section"
      p={6}
      w="full"
      alignSelf="center"
      textAlign="center"
      sx={{ gap: '24px' }}
      borderRadius={{ base: '0', lg: '8px' }}
      mt={{ base: '24px', md: '32px' }}
      maxW={{ base: 'xl', md: '4xl' }}
      bg={{ lg: mode('primary.200', 'primary.800') }}
      direction="column"
    >
      <Heading as="h2" size="H300" mx={6}>
        {title}
      </Heading>
      <Flex align="center" justify="center">
        <Image
          cloudName="mediadevs"
          publicId={imageUrl || '/placeholder.png'}
          width={400}
          height={200}
          transformations={[
            {
              width: 400,
              height: 200,
              crop: 'pad',
            },
            { radius: 20 },
          ]}
          alt="Banner for a MediaJam post"
          borderRadius="8px!important"
        />
      </Flex>
      <Box alignSelf="center">
        <HStack color="grey.700" ml={{ base: '0', lg: 8 }}>
          <Avatar
            name={author.name}
            src={imageFetch(author?.image?.asset?.url, { w: 64, h: 64 })}
          />
          <Text fontSize="md">{author.name}</Text>
          <Text fontSize="md">
            <time dateTime={date}>
              &middot; {format(new Date(date), 'dd MMMM yyy')}
            </time>
          </Text>
        </HStack>
      </Box>
    </Flex>
  );
}
