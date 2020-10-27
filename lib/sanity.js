import sanityClient from '@sanity/client';

/**
 * Datasets include 'production' and 'stage' for developement
 * Project_ID is the same for both
 */
const options = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: process.env.NEXT_PUBLIC_SANITY_DATASET === 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  // useCdn == true gives fast, cheap responses using a globally distributed cache.
  // Set this to false if your application require the freshest possible. aka development
};

const client = sanityClient(options);
export const previewClient = sanityClient({
  ...options,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  ignoreBrowserTokenWarning: true,
});

export default client;
