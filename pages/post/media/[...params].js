import React, { useState, useEffect } from 'react';
import { Flex, Heading, Box } from '@chakra-ui/react';
import JamList from '@components/JamList';
import JamContentHero from '@components/JamContentHero';
import { postBySlug } from '@lib/api';

export default function PostMedia({ jam }) {
  return (
    <Flex direction="column" w="100%">
      <Flex
        direction="column"
        w="100%"
        w={{ base: '90%', lg: '884px' }}
        mt="26px"
        mb="50px"
        alignSelf="center"
        h="100%"
        direction="column"
        justify="space-around"
        sx={{ gap: '24px' }}
      >
        <Box>
          <Heading as="h4" size="md">
            Jam Card
          </Heading>
          <JamList jams={[jam]} />
        </Box>
        <Box>
          <Heading as="h4" size="md">
            Hero Banner
          </Heading>
          <JamContentHero
            author={jam.author}
            description={jam.description}
            title={jam.title}
            imageUrl={jam.coverImage}
            date={jam.updatedAt}
          />
        </Box>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = async ({
  params: {
    params: [slug, draftPostId],
  },
  preview = false,
  req,
  res,
}) => {
  const {
    _id = null,
    body,
    slug: { current },
    ...restJam
  } = await postBySlug(slug, preview);
  return {
    props: {
      preview,
      jam: {
        _id,
        slug: { current },
        publishedAt: Date.now(),
        ...restJam,
      },
    },
  };
};
