# Media Jams

- [Studio](./studio/README.md)

## Development

### Setup

1. Copy local environment variables `cp .env.example .env.local` and fill out with Sanity Studio Project Id and DataSet. These can be found within the Sanity Studio settings after logging in.
1. Install dependencies for project and local version of studio. `yarn && cd ./studio $$ yarn`
1. Run NextJS development `yarn dev`
   - Project will start up at `http://localhost:3000`
1. Second terminal run the studio locally if desired, but not requried, content is pulled from the CMS. `yarn studio`
   - Studio will start up at `http://localhost:3333/desk`
