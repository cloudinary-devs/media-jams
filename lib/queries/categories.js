import { gql } from 'graphql-request';
import { fetchGQL, fetchStaticGQL } from '@lib/fetchGraphQL';
const queryCategoriesWithTags = gql`
  query MyQuery {
    jamCategories: allCategory {
      _id
      title
    }
    tags: allTag {
      name: title
      category {
        title
      }
    }
  }
`;
const queryCategories = gql`
  query AllCategories {
    jamCategories: allCategory {
      _id
      description
      title
    }
    categoryTags: allTag {
      name: title
      category {
        _id
        title
      }
    }
  }
`;

export const categoriesWithTags = (jamCategories, tags) => {
  return tags.reduce(
    (acc, tag) => {
      tag.category.map((cat) => {
        const coreCategory = acc.find((c) => c.title === cat.title);
        coreCategory.tags.push(tag.name);
        return cat;
      });
      return acc;
    },
    jamCategories.map((c) => {
      c.tags = [];
      return c;
    }),
  );
};

/**
 *
 */
export const categories = {
  get: () => fetchGQL(queryCategories),
  getStatic: () => fetchStaticGQL(queryCategories),
};
