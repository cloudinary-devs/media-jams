import React, { Component } from 'react';
import { Flex, Input, Box, useDisclosure } from '@chakra-ui/react';
import NextSeo from 'next-seo';
import Layout from '@components/Layout';
import PageSections from '@components/PageSections';

import routesQuery from '@lib/queries/routes';

function CustomSanity({ route }) {
  const { page } = route;
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Layout isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      {page.title}
    </Layout>
  );
}

export async function getStaticPaths() {
  const { data } = await routesQuery.getStatic();

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
  // params contains the page slug as an Array.
  // If the route is like /terms-and-stuff, then params.id is 1
  const slug = params.customSanitySlug.join('/');
  const result = await routesQuery.getStaticPage(slug);

  // Pass page data to the customSanity via props
  return { props: { route: result?.data?.route[0] } };
}

export default CustomSanity;
