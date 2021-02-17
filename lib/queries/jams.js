import { gql } from 'graphql-request';
import { fetchGQL, fetchStaticGQL } from '@lib/featchGraphQL';

const jamFields = gql`
  fragment jamFields on Post {
    _id
    title
    description
    author {
      name
      image {
        asset {
          url
        }
      }
    }
    tags {
      _id
      title
    }
    slug: slug {
      current
    }
  }
`;
const getAllJams = gql`
  query GetAllPosts {
    jams: allPost {
      ...jamFields
    }
  }
  ${jamFields}
`;
const getAllJamsWithSlug = gql`
  query GetAllPostsWithSlug {
    jams: allPost {
      _id
      slug: slug {
        current
      }
    }
  }
`;
const getJamsById = gql`
  query GetPosts($postIds: [ID!]!) {
    allPost(where: { _id: { in: $postIds } }) {
      ...jamFields
    }
  }
  ${jamFields}
`;

const getJamBySlug = gql`
  query GetPostBySlug($slug: String!) {
    jams: allPost(where: { slug: { current: { eq: $slug } } }) {
      _id
      _updatedAt
      bodyRaw
      description
      featured
      title
      ...jamFields
    }
  }
  ${jamFields}
`;

export const jams = {
  get: () => fetchGQL(getAllJams),
  getByIds: (postIds) => fetchGQL(getJamsById, { postIds }),
  getStatic: () => fetchStaticGQL(getAllJams),
  getStaticWithSlug: () => fetchStaticGQL(getAllJamsWithSlug),
  getStaticBySlug: (slug) => fetchStaticGQL(getJamBySlug, { slug }),
};
