import sanityClient from '@sanity/client';

const options = {
  // Find your project ID and dataset in `sanity.json` in your studio project
  dataset: 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  // useCdn == true gives fast, cheap responses using a globally distributed cache.
  // Set this to false if your application require the freshest possible. aka development
};

const client = sanityClient(options);

export const previewClient = sanityClient({
  ...options,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export default client;
