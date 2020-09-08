import sanityClient from '@sanity/client';
import toMarkdown from '@sanity/block-content-to-markdown';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';

import Code from '@components/Code';
import { Chakra } from '@components/Chakra';

const components = { code: Code };

const sanity = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: true,
});

// get all [posts] return _id
const postsQuery = `*[_type == "post"]{_id, "slug": slug.current}`;
// query by unique slug as a param
const singlePostQuery = `*[_type == "post" && slug.current == $slug] {
  _id,
  title,
  "slug": slug.current,
  author-> {
  name
	},
	_updatedAt,
body
}[0]
`;

export default function Post({ post }) {
  const content = hydrate(post.content, { components });

  return (
    <Chakra evaluateThemeLazily>
      <h1>{post.title}</h1>
      {content}
    </Chakra>
  );
}

export const getStaticPaths = async () => {
  // Get the paths we want to pre-render based on posts
  const posts = await sanity.fetch(postsQuery);
  const paths = posts.map(({ _id, slug }) => ({
    params: { slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This function gets called at build time on server-side.
export const getStaticProps = async ({ params: { slug } }) => {
  const { title, body } = await sanity.fetch(singlePostQuery, {
    slug,
  });
  // const bodyMarkdown = toMarkdown(body);

  const mdx = await renderToString(body, { components }, null);
  return {
    props: {
      post: {
        content: mdx,
        title: title,
      },
    },
  };
};
