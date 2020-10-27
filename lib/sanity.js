import sanityClient from '@sanity/client';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

/**
 * Datasets include 'production' and 'stage' for developement
 * Project_ID is the same for both
 */
const options = {
  dataset: publicRuntimeConfig.SANITY_DATASET,
  useCdn: publicRuntimeConfig.SANITY_DATASET === 'production',
  projectId: publicRuntimeConfig.SANITY_PROJECT_ID,
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
