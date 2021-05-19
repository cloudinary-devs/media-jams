import hydrate from 'next-mdx-remote/hydrate';
import { Badge, Box, chakra, Flex } from '@chakra-ui/react';
import { SkipNavContent, SkipNavLink } from '@chakra-ui/skip-nav';
import PageTransition from '@components/PageTransition';
import TableOfContent from '@components/TableOfContents';
import MDXComponents from '@components/MDXComponents';

function useHeadingFocusOnRouteChange() {
  const router = useRouter();

  React.useEffect(() => {
    const onRouteChange = () => {
      const [heading] = Array.from(document.getElementsByTagName('h1'));
      heading?.focus();
    };
    router.events.on('routeChangeComplete', onRouteChange);
    return () => {
      router.events.off('routeChangeComplete', onRouteChange);
    };
  }, []);
}

// This glob is what will be used to generate static routes
const contentPath = 'src/documentation';
export const contentGlob = `${contentPath}/**/*.mdx`;

export default function Data({ mdxSource, frontMatter }) {
  const headings = [];
  const content = hydrate(mdxSource, { components: MDXComponents });

  return (
    <>
      <SkipNavLink zIndex={20}>Skip to Content</SkipNavLink>
      <Box as="main" className="main-content" w="full" maxW="8xl" mx="auto">
        <Box display={{ md: 'flex' }}>
          {/* {sidebar || null} */}
          <Box flex="1" minW="0">
            <SkipNavContent />
            <Box id="content" px={5} mx="auto" minH="76vh">
              <Flex>
                <Box
                  minW="0"
                  flex="auto"
                  px={{ base: '4', sm: '6', xl: '8' }}
                  pt="10"
                >
                  <PageTransition style={{ maxWidth: '48rem' }}>
                    <chakra.h1 tabIndex={-1} outline={0} apply="mdx.h1">
                      {frontMatter.title}
                    </chakra.h1>
                    {content}
                    <Box pb="20"></Box>
                  </PageTransition>
                </Box>
                <TableOfContent
                  visibility={headings.length === 0 ? 'hidden' : 'initial'}
                  headings={headings}
                />
              </Flex>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
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
