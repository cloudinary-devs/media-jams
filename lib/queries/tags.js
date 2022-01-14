import { gql } from 'graphql-request';
import { fetchGQL, fetchStaticGQL } from '@lib/fetchGraphQL';
const queryTags = gql`
  query AllTags {
    tags: allTag {
      _id
      description
      featured
      rank
      slug
      title
      category {
        _id
        title
      }
      icon {
        name
        provider
      }
      image {
        asset {
          url
        }
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
