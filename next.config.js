const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  env: {
    SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    SANITY_STUDIO_PREVIEW_SECRET: process.env.SANITY_STUDIO_PREVIEW_SECRET,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUD_NAME: process.env.CLOUD_NAME,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
    mixPanelToken: process.env.MIXPANEL_TOKEN,
  },
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };

    return config;
  },
});
