const { gql } = require('graphql-request');
const { fetchGQL, fetchStaticGQL } = require('../fetchGraphQL');

const queryRouteBySlug = gql`
  query RouteBySlug($slug: String!) {
    route: allRoute(where: { slug: { current: { eq: $slug } } }) {
      _id
      _updatedAt
      disallowRobots
      includeInSitemap
      page {
        _id
        title
        _updatedAt
        content {
          _key
          _type
          heading
          label
          textRaw
        }
      }
      slug {
        current
      }
    }
  }
`;

const queryRoutes = gql`
  query allRoutes {
    routes: allRoute {
      _id
      slug {
        current
      }
    }
  }
`;

/**
 * CommonJS exported to be able to leverage in the next.config.js
 */
module.exports = {
  getStatic: () => fetchStaticGQL(queryRoutes),
  getStaticPage: (slug) => fetchStaticGQL(queryRouteBySlug, { slug }),
};
