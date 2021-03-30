import { gql } from 'graphql-request';
import { fetchGQL, fetchStaticGQL } from '@lib/fetchGraphQL';

const getAuthorSlugs = gql`
  {
    allAuthor {
      _id
      slug {
        current
      }
    }
  }
`;

const getAuthors = gql`
  {
    allAuthor {
      _id
      name
      slug {
        current
      }
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
    }
  }
`;

export const authors = {
  get: () => fetchGQL(getAuthors),
  getStatic: () => fetchStaticGQL(getAuthors),
  getSlugs: () => fetchStaticGQL(getAuthorSlugs),
};
