import { gql } from 'graphql-request';
import { fetchGQL, fetchStaticGQL } from '@lib/fetchGraphQL';

const jamFields = gql`
  fragment jamFields on Post {
    _id
    title
    description
    publishedAt
    cover {
      asset {
        url
      }
    }
    author {
      _id
      name
      jobTitle
      image {
        asset {
          url
        }
      }
      slug {
        current
      }
      bioRaw
    }
    tags {
      _id
      title
    }
    slug {
      current
    }
    postMetadata {
      featured
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
      body
      description
      title
      ...jamFields
    }
  }
  ${jamFields}
`;

const getFeaturedJams = gql`
  {
    allPost(where: { postMetadata: { featured: { eq: true } } }) {
      author {
        name
        image {
          asset {
            url
          }
        }
        slug {
          current
        }
      }
      title
      slug {
        current
      }
      description
      tags {
        title
        _id
      }
      postMetadata {
        featured
      }
    }
  }
`;

const getJamsByAuthorId = gql`
  query PostsByAuthor($id: ID!) {
    allPost(where: { author: { _id: { eq: $id } } }) {
      slug {
        current
      }
      _id
      title
      publishedAt
      description
      tags {
        _id
        title
      }
      author {
        name
        image {
          asset {
            url
          }
        }
      }
      cover {
        asset {
          url
        }
      }
      slug {
        current
      }
      postMetadata {
        featured
      }
    }
  }
`;

export const jams = {
  get: () => fetchGQL(getAllJams),
  getByIds: (postIds) => fetchGQL(getJamsById, { postIds }),
  getStatic: () => fetchStaticGQL(getAllJams),
  getStaticWithSlug: () => fetchStaticGQL(getAllJamsWithSlug),
  getStaticBySlug: (slug) => fetchStaticGQL(getJamBySlug, { slug }),
  getFeaturedJams: () => fetchGQL(getFeaturedJams),
  getStaticFeaturedJams: () => fetchStaticGQL(getFeaturedJams),
  getJamsByAuthor: (id) => fetchGQL(getJamsByAuthorId, { id }),
};
