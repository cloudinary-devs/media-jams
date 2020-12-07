import sanityClient from '@sanity/client';
import {
  groq,
  createClient,
  createImageUrlBuilder,
  createPortableTextComponent,
  createPreviewSubscriptionHook,
  createCurrentUserHook,
} from 'next-sanity';

/**
 * Datasets include 'production' and 'stage' for developement
 * Project_ID is the same for both
 */
const options = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  // useCdn == true gives fast, cheap responses using a globally distributed cache.
  // Set this to false if your application require the freshest possible. aka development
};

// Set up the live preview subsscription hook
export const usePreviewSubscription = createPreviewSubscriptionHook(options);
// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(options);
// Set up Portable Text serialization
export const PortableText = createPortableTextComponent({
  ...options,
  // Serializers passed to @sanity/block-content-to-react
  // (https://github.com/sanity-io/block-content-to-react)
  serializers: {},
});

const client = sanityClient(options);

export const previewClient = (token = process.env.SANITY_API_TOKEN) =>
  sanityClient({
    ...options,
    useCdn: false,
    token: token,
  });

export default client;
