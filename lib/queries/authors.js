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

const getAuthorBy = gql`
  query AuthorBy($slug: String!) {
    author: allAuthor(where: { slug: { current: { eq: $slug } } }) {
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
      bioRaw
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
      bioRaw
    }
  }
`;

export const authors = {
  get: () => fetchGQL(getAuthors),
  getStatic: () => fetchStaticGQL(getAuthors),
  getSlugs: () => fetchStaticGQL(getAuthorSlugs),
  getStaticAuthorBy: (slug) => fetchStaticGQL(getAuthorBy, { slug }),
};
