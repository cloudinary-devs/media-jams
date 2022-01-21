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

### Current Stack

1. Vercel
   - Hosting
   - Deployment and Preview
   - Domain
   - 2 seprate projects Media Jams and the content studio
   - Generated webhooks when Sanity Content is published to start a new build
1. Next.js
   - Meida Jams Site and api fuctions
1. Sanity IO
   - Content Management System
   - Prod dataset and Staging datasets
   - [Studio](./studio/README.md)
1. Auth0
   - Authentication for all accounts including Authors and Modorators
   - Custom Flows to assgin author and moderator roles allowing access to Sanity Studio
   - And To update profile information
   - This profile is currently separte from the Authors 'published' information for Jams
1. Github
   - Repository hosting
   - `main` is the deployed live version of Media Jams
   - `dev` is the working branch that uses Prod Data from Sanity & Hasura https://stage.mediajams.dev/
     - Workflow:
       - Feature Branch from `dev`
       - Work with staging data locally for both the studio and jams site
       - Pull Request back to `dev`
       - Once merged the published `dev` [branch](https://stage.mediajams.dev/) will reflect what the live site will.
       - Pull Request `dev` to `main`. This will promote any changes in `dev` to the live site.
       - **This also includes any data format / changes in the sanity schema** specificly for the GraphQL Endpoints from [Sanity](.github/workflows/studio.yml)
   - Testing
     - Github actions run `yarn test` on push
     - Setup with Jest, Test-library, mocks
     - Minimal to little coverage at the moment
1. Hasura
   - Used to aggregate multiple sources of data for Media Jams
   - Connects to Postgres for persitant storage of:
     - user bookmarks
     - user notes
   - Sanity GQL is also proxied through Hasura
   - Endpoints are Authenticated with Auth0 permissions and roles
   - Stage and Prod endpoints available
1. SendGrid
   - Email Provider
   - Currently tasked with content updates for creators and modorators
   - Notifications are sent out when the workflow state of a Media Jams is changed. Either to the author for changes, or to the moderation group for requests.
1. MixPanel
   - Analytics
   - Concentration on traffic and time spend on Jams
   - Search queries are recored and ranked
   - Overall time spend on a Jam, if read completely, and interaction with the CodeSandbox
1. CodeSandbox
   - Jams have an interactive project element to them specificly using CodeSandbox
   - Using a Custom MDX component in the Jam Content it's rendered as an iFrame with specific attributes.
     - Including using MirrorCode and 'click to load' to help reduce the time to interact
     - Options include having a specific file and | or preview panel open.

### Inviting Authors

1. As an admin log into auth0.com
2. Add User.
   - name, email, and set password to a default (we'll have them reset this shortly)
3. Once Added, open their user profile in auth0 and add 'creator' role.
4. Finally. Go to [Media Jams Login](https://mediajams.dev/api/auth/login)
   - Click 'forget' password
   - Use email previous registred in previous step.
   - This will send them a 'welcome' email asking them to pick a new password for their Media Jams account.
5. Once done. They can login [Media Jams Login](https://mediajams.dev/api/auth/login) and will see a 'MDE Studio' link under the 'More' tab on the sidebar. 👍
