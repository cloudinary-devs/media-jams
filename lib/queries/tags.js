import { gql } from 'graphql-request';
import { fetchGQL, fetchStaticGQL } from '@lib/featchGraphQL';
const queryTags = gql`
  query allTags {
    allTag {
      _id
      description
      featured
      rank
      title
      category {
        _id
        title
      }
    }
  }
`;

/**
 *
 */
export const tags = {
  get: () => fetchGQL(queryTags),
  getStatic: () => fetchStaticGQL(queryTags),
};
