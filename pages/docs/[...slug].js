import hydrate from 'next-mdx-remote/hydrate';
import { Box, chakra } from '@chakra-ui/react';
import PageTransition from '@components/PageTransition';

import MDXComponents from '@components/MDXComponents';

// This glob is what will be used to generate static routes
const contentPath = 'src/documentation';
export const contentGlob = `${contentPath}/**/*.mdx`;

export default function Data({ mdxSource, frontMatter }) {
  const content = hydrate(mdxSource, { components: MDXComponents });

  return (
    <Box pt={3} px={5} mt="4.5rem" mx="auto" maxW="64rem" minH="76vh">
      <PageTransition>
        <chakra.h1 tabIndex={-1} outline={0} apply="mdx.h1">
          {frontMatter.title}
        </chakra.h1>
        {content}
      </PageTransition>
    </Box>
  );
}

export async function getStaticPaths() {
  const path = require('path');
  const glob = require('fast-glob');

  const getFileSlug = (filePath) => {
    const filename = filePath.replace(`${contentPath}/`, '');
    const slug = filename.replace(new RegExp(path.extname(filePath) + '$'), '');
    return slug;
  };

  const files = glob.sync(contentGlob);

  const paths = files.map((file) => {
    return {
      params: {
        slug: getFileSlug(file).split('/'),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const fs = require('fs');
  const path = require('path');
  const glob = require('fast-glob');
  const files = glob.sync(contentGlob);
  const renderToString = require('next-mdx-remote/render-to-string');

  const matter = require('gray-matter');

  const pathRegex = new RegExp(`^${contentPath}/${path.join(...slug)}.mdx$`);
  const fullPath = files.find((file) => pathRegex.test(file));

  if (!fullPath) {
    console.warn('No MDX file found for slug');
  }

  const mdxSource = await fs.promises.readFile(fullPath);
  const { content, data } = matter(mdxSource);

  const mdx = await renderToString(content, {
    components: MDXComponents,
    scope: data,
  });

  return {
    props: {
      mdxSource: mdx,
      frontMatter: data,
    },
  };
}
