import { gql } from 'graphql-request';
import fetchGraphQL from '@lib/featchGraphQL';

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
      title
    }
    slug: slug {
      current
    }
  }
`;
const getAllJams = gql`
  query GetAllPosts {
    allPost {
      ...jamFields
    }
  }
  ${jamFields}
`;
const getJamsById = gql`
  query GetPosts($postIds: [ID!]!) {
    allPost(where: { _id: { in: $postIds } }) {
      ...jamFields
    }
  }
  ${jamFields}
`;

export const jams = {
  get: () => fetchGraphQL(getAllJams),
  getByIds: (postIds) => fetchGraphQL(getJamsById, { postIds: postIds }),
};
