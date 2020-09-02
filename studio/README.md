# Media Jams Studio

Content Management for Media Jams

## Sanity CMS

- Currently deployed [Default Sanity Studio](https://mediajams.sanity.studio/)

### Custom Workflows

### Preview Draft

### [GraphQL](https://www.sanity.io/docs/graphql)

- Requires a separate deployment `sanity graphql deploy` on scheme changes. Is **NOT** automattic
- Available options
  - `--tag beta` having versioned gql endpoints available
  - `--playground` or `--no-playground` for enabling the gql-playground
  - `--dataset stage` specific sanity defined datasets
- QueryURL format `https://<yourProjectId>.api.sanity.io/v1/graphql/<dataset>/<tag>`
  - Endpoint production https://5ad74sb4.api.sanity.io/v1/graphql/production/default
  - Endpoint for staging n/a
