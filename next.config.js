module.exports = {
  env: {
    SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.SANITY_DATASET,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUD_NAME: process.env.CLOUD_NAME,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
    fathomSiteId: process.env.FATHOM_SITE_ID,
    fathomIncludedDomains: ['https://poc-media-jams.vercel.app/'],
  },
};
