import {
  Avatar,
  Flex,
  Text,
  Grid,
  Image,
  Heading,
  useDisclosure,
} from '@chakra-ui/react';

import { useQuery } from 'react-query';

import { jams } from '@lib/queries/jams';

import Layout from '@components/Layout';
import JamAccordion from '@components/JamAccordion';

export default function AuthorPage({ author }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data } = useQuery(
    `${author?.name}'s Jams`,
    () => jams.getJamsByAuthor(author._id),
    {
      enabled: !!author,
    },
  );

  return (
    <Layout isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <Flex overflow="auto" w="100%" direction="column" gap={2} p={12}>
        <Flex w="50%" alignSelf="center" bg="white" h={72} borderRadius="8px">
          <Image
            borderTopLeftRadius="8px"
            borderBottomLeftRadius="8px"
            h="100%"
            width="30%"
            alt={author?.name}
            src={author?.image.asset.url}
          />
          <Flex p={8}>
            <Heading>{author?.name}</Heading>
          </Flex>
        </Flex>

        <Flex wrap="wrap" justify="space-evenly" align="center">
          {data?.allPost?.map((post) => (
            <JamAccordion
              color="blue"
              shadow
              width="30%"
              key={post._id}
              post={post}
              defaultIndex={[0]}
              borderRadius="lg"
              mt={10}
            />
          ))}
        </Flex>
      </Flex>
    </Layout>
  );
}

export async function getStaticPaths() {
  const { authors } = require('../../lib/queries/authors');
  const { data } = await authors.getSlugs();
  return {
    paths:
      data.allAuthor
        ?.filter((author) => author.slug)
        .map(({ slug }) => ({ params: { slug: slug.current } })) || [],
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const { authors } = require('../../lib/queries/authors');
  const { data } = await authors.getStatic();

  const author = data.allAuthor.filter((author) => {
    if (author.slug) {
      return author?.slug.current === slug;
    }
  });

  return {
    props: { author: author[0] },
  };
}
