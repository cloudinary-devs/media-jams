/**
 * GQL specific request to our proxy that will attach authorization and other headers needed
 * @param {String} operationsDoc gql query/mutation template literal
 * @param {Object} variables combine with gql request
 * @return @function Annynomous react-query is expecting a function that return a promise
 */
function fetchGQL(operationsDoc, variables = {}) {
  return fetch('/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: operationsDoc,
      variables,
    }),
  }).then((res) => {
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return res.json();
  });
}

/**
 * Idea of `StaticQGL` is to pull public content at build time
 * for the app. The `/api/graphql` proxy with accessToken check isn't available
 * during that time.
 * Use when fetching data in `getStaticProps` or `getStaticPaths`
 * @param {Object} operationsDoc query/mutation as template literal
 * @param {Object} variables variables to include with query/mutation
 */
function fetchStaticGQL(operationsDoc, variables = {}) {
  const endpoint = process.SANITY_GRAPHQL_URL;
  return fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-Role': 'public',
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables,
    }),
  }).then((res) => {
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return res.json();
  });
}

export { fetchGQL, fetchStaticGQL };
