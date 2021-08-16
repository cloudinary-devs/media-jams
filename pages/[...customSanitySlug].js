import React, { Component } from 'react';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { Flex, Spacer, Box, useDisclosure, Heading } from '@chakra-ui/react';
import Layout from '@components/Layout';
import PageSections from '@components/PageSections';

import { routes as queryRoutes } from '@lib/queries/routes';

function CustomSanity({ slug }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  // TODO: can not for the life figure out why this is
  // double nested {data: {data : {route []}}}
  const {
    data: { data },
  } = useQuery(['routes', slug], () => queryRoutes.getStaticPage(slug), {
    enabled: false,
  });
  return (
    <Layout isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <Flex
        bg="white"
        direction="column"
        width="100%"
        height="100%"
        overflow="auto"
        px={{ base: 2, md: 8 }}
      >
        {data?.route && (
          <>
            <Heading py={{ base: 2, md: 8 }}>
              {data.route[0].page.title}
            </Heading>
            <PageSections sections={data.route[0].page.content} />
          </>
        )}
        <Spacer minH={{ base: 10, md: 18 }} />
      </Flex>
    </Layout>
  );
}

export async function getStaticPaths() {
  const queryClient = new QueryClient();
  const { data } = await queryClient.fetchQuery(
    'routes_path',
    queryRoutes.getStatic,
  );

  // Get the paths we want to pre-render based on pages from Sanity
  // slug as an array, bc Next will urlEncode the '/' before passing it to getStaticProps if it's a String
  const paths = data?.routes.map((route) => {
    return {
      params: {
        customSanitySlug: `${route['slug']['current']}`.split('/'),
      },
    };
  });

  // Fallback to 404 if path does not exist
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const queryClient = new QueryClient();
  // params contains the page slug as an Array.
  // If the route is like /terms-and-stuff, then params.id is 1
  const slug = params.customSanitySlug.join('/');
  // const result = await queryRoutes.getStaticPage(slug);
  await queryClient.prefetchQuery(['routes', slug], () =>
    queryRoutes.getStaticPage(slug),
  );

  // Pass page data to the customSanity via props
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      slug,
    },
  };
}

export default CustomSanity;
