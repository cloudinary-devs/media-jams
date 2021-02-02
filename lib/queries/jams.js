import { gql } from 'graphql-request';
import fetchGraphQL from '@lib/featchGraphQL';

const getJamsById = gql`
  query GetPosts($postIds: [ID!]!) {
    allPost(where: { _id: { in: $postIds } }) {
      _id
      title
      description
      slug: slug {
        current
      }
    }
  }
`;

export const jams = {
  getByIds: (postIds) => () => fetchGraphQL(getJamsById, { postIds: postIds }),
};
