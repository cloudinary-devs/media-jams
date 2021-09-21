import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Stack,
  Spacer,
  HStack,
  VStack,
  Avatar,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import format from 'date-fns/format';
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
    <Box as="section" mt={{ base: '24px', md: '32px' }}>
      <Box
        maxW={{ base: 'xl', md: '7xl' }}
        mx="auto"
        px={{ base: '6', md: '8' }}
      >
        <Flex
          direction={{ base: 'column-reverse', lg: 'row' }}
          mb={{ base: 4, lg: 8 }}
        >
          <VStack
            bg={{ base: 'none', lg: mode('primary.200', 'primary.800') }}
            flex="1"
            maxW={{ lg: 'xl' }}
            pt="6"
            borderStartRadius={{ base: '0', lg: '8px' }}
          >
            <Heading as="h2" size="H400" ml={{ base: '0', lg: 8 }}>
              {title}
            </Heading>
            <Spacer />
            <Box alignSelf="start">
              <HStack
                color="grey.700"
                ml={{ base: '0', lg: 8 }}
                mb={{ base: '0', lg: 8 }}
              >
                <Avatar name={author.name} src={author?.image?.asset?.url} />
                <Text fontSize="md">{author.name}</Text>
                <Text fontSize="md">
                  <time dateTime={date}>
                    &middot; {format(new Date(date), 'dd MMMM')}
                  </time>
                </Text>
              </HStack>
            </Box>
          </VStack>
          <Stack flex="1" marginBottom="-8px">
            <Image
              cloudName="mediadevs"
              publicId={imageUrl || '/placeholder.png'}
              width={800}
              height={500}
              alt="Banner Image for Jam"
              borderEndRadius={{ base: '0', lg: '8px' }}
              borderTopStartRadius={{ base: '8px', lg: 0 }}
              borderTopRadius={{ base: '8px', lg: null }}
            />
          </Stack>
        </Flex>
      </Box>
    </Box>
  );
}
