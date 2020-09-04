import { GraphQLClient } from 'graphql-request';
import sanityClient from '@sanity/client';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';

import Code from '@components/Code';
import { Chakra } from '@components/Chakra';

const components = { code: Code };

const sanityClient = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: true,
});

// get all [posts] return _id
const postsQuery = `*[_type == "post"] { _id }`;

const singlePostQuery = `*[_type == "movie" && _id == $id] {
  _id,
  title,
  overview,
  releaseDate,
  poster,
  "cast": castMembers[] {
    _key,
    characterName,
    "person": person-> {
      _id,
      name,
      image
    }
  }
}[0]
`;

export default function BlogPost({ blog }) {
  const content = hydrate(blog.content, components);

  return (
    <Chakra evaluateThemeLazily>
      <div>
        <h1>{blog.title}</h1>
        {content}
      </div>
    </Chakra>
  );
}

export async function getStaticPaths() {
  const { blogPosts } = await graphcms.request(`
     {
      blogPosts {
        slug
      }
     }
  `);

  return {
    paths: blogPosts.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const { blogPost } = await graphcms.request(
    `
    query BlogPost($slug: String!) {
      blogPost(where: { slug: $slug}) {
        title        
        content
        tags
        description
      }
    }
    `,
    {
      slug,
    },
  );

  const mdx = await renderToString(blogPost.content, components, null);

  return {
    props: {
      blog: {
        content: mdx,
        title: blogPost.title,
        description: blogPost.description,
        tags: blogPost.tags,
      },
    },
  };
}
