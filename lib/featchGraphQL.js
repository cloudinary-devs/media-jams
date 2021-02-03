/**
 * GQL specific request to our proxy that will attach authorization and other headers needed
 * @param {String} operationsDoc gql query/mutation template literal
 * @param {Object} variables combine with gql request
 * @return @function Annynomous react-query is expecting a function that return a promise
 */
function fetchGraphQL(operationsDoc, variables = {}) {
  return () =>
    fetch('/api/graphql', {
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

export default fetchGraphQL;
