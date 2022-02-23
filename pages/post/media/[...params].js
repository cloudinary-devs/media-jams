import React, { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
import JamList from '@components/JamList';
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
        <JamList jams={[jam]} />
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
