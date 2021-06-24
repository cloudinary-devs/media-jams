import { Flex, Avatar, Text, useToken } from '@chakra-ui/react';

import Image from '@components/Image';

/* 
TODO
- We have to pull in the styles from the FeaturedJamCard and apply the same ones to the AuthorBanner
- Once we have the banner sized properly , we can do one of two things..Either:
  - We're going to try and plug the Search and JamList component from the Dashboard and reuse them for this page (and possibly others that migth need the search)
  - Build a more specific Search component and List component for the Author Page -- and every new page that may utilzie input search
- Finally make sure the page is as responsive as the Dashboard

*/

function AuthorBanner() {}
function Search() {}
function JamList() {}

export default function AuthorPage({ author }) {
  return (
    <Flex w="100%" height="100%" direction="column" overflowY="auto">
      <Flex
        w="1000px"
        border={`2px solid ${useToken('colors', 'primary.400')}`}
        borderRadius="8px"
        h="300px"
        boxShadow={`4px 3px 0px 3px ${useToken('colors', 'primary.400')}`}
        p={5}
      >
        <Flex w="60%" direction="column" justify="space-evenly">
          <Flex align="center" justify="space-between" w="100%">
            <Flex align="center" justify="space-evenly" sx={{ gap: '8px' }}>
              <Avatar
                width="28px"
                height="28px"
                name={author.name}
                src={author.image?.asset.url}
              />
              <Text variant="B100" color="grey.800" fontWeight="500">
                {author.name}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
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
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const { authors } = require('../../lib/queries/authors');
  const { data } = await authors.getStaticAuthorBy(slug);

  return {
    props: { author: data.author[0] },
  };
}
