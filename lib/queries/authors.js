import { gql } from 'graphql-request';
import { fetchGQL, fetchStaticGQL } from '@lib/fetchGraphQL';

const getAuthors = gql`
  {
    allAuthor {
      name
      jobTitle
      image {
        asset {
          url
        }
      }
      socialHandles {
        twitter
        github
        website
      }
      bioRaw
    }
  }
`;

export const authors = {
  get: () => fetchGQL(getAuthors),
  getStatic: () => fetchStaticGQL(getAuthors),
};
