import { Flex } from '@chakra-ui/react';
import Layout from '@components/Layout';

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
    <Layout>
      <Flex w="100%" height="100%" direction="column" overflowY="auto">
        <AuthorBanner />
        <Search />
        <JamList />
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
