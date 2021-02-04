import { gql } from 'graphql-request';
import { fetchGQL, fetchStaticGQL } from '@lib/featchGraphQL';
const queryCategories = gql`
  query allCategories {
    jamCategories: allCategory {
      _id
      description
      title
    }
  }
`;

/**
 *
 */
export const categories = {
  get: () => fetchGQL(queryCategories),
  getStatic: () => fetchStaticGQL(queryCategories),
};
