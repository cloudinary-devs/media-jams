function fetchGraphQL(operationsDoc, variables = {}) {
  return fetch('/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: operationsDoc,
      variables,
    }),
  }).then((res) => res.json());
}

export default fetchGraphQL;
