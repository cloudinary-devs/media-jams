import Link from 'next/link';
import { Box, List, ListItem, Text } from '@chakra-ui/react';

import Image from '@components/Image';

const RelatedJams = ({ jams = [], title }) => {
  return (
    <Box
      maxW={{ base: 'xl', md: '7xl' }}
      px={{ base: '6', lg: '8' }}
      mx="auto"
      py="6"
    >
      <Text fontSize="2xl" fontWeight="bold" px="4" mb="6">
        Discover More{' '}
        <Text
          fontSize="inherit"
          fontWeight="black"
          as="span"
          color="secondary.600"
        >
          {title}
        </Text>{' '}
        Jams!
      </Text>
      <List
        as="ul"
        display="grid"
        gridTemplateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }}
        width="100%"
        bg="white"
        list-style="none"
      >
        {jams.map((jam) => {
          const { _id, title, cover = {}, author } = jam;
          const { asset } = cover || {};
          return (
            <ListItem
              key={_id}
              px="4"
              mb={{ base: '10', lg: '0' }}
              textAlign={{ base: 'center', lg: 'left' }}
              _last={{ marginBottom: 0 }}
            >
              <Link href={`/post/${jam.slug.current}`}>
                <a>
                  <Image
                    cloudName="mediadevs"
                    publicId={asset.url || '/placeholder.png'}
                    width={400}
                    height={200}
                    transformations={[
                      {
                        width: 400,
                        height: 200,
                        crop: 'pad',
                      },
                    ]}
                    alt=""
                  />
                  <Text as="p" fontSize="lg" fontWeight="bold" mb="2">
                    {title}
                  </Text>
                  <Text as="p" fontSize="md">
                    By {author.name}
                  </Text>
                </a>
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default RelatedJams;
