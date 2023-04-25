// Use the SentryWebpack plugin to upload the source maps during build step
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const { withSentryConfig } = require('@sentry/nextjs');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const {
  NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
  VERCEL_GITHUB_COMMIT_SHA,
  SANITY_GRAPHQL_URL,
} = process.env;

const COMMIT_SHA = VERCEL_GITHUB_COMMIT_SHA;

process.env.SENTRY_DSN = SENTRY_DSN;
const basePath = '';

const defaultConfig = {
  productionBrowserSourceMaps: true,
  env: {
    NEXT_PUBLIC_COMMIT_SHA: COMMIT_SHA,
    SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    SANITY_STUDIO_PREVIEW_SECRET: process.env.SANITY_STUDIO_PREVIEW_SECRET,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUD_NAME: process.env.CLOUD_NAME,
    SANITY_GRAPHQL_URL: SANITY_GRAPHQL_URL,
  },
  images: {
    domains: ['res.cloudinary.com', 'cdn.sanity.io'],
    unoptimized: true,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
    mixPanelToken: process.env.MIXPANEL_TOKEN,
  },
  async headers() {
    return [
      {
        // enabling CORs for in studio subscription to changes
        source: '/post/liveEdit/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
  async redirects() {
    const customPeriodRewrites = [
      '/post/create-a-restaurant-qr-code-menu-in-next.js',
      '/post/blur-faces-in-images-in-next.js',
      "/post/create-a-youtube-like-'click-to-unmute'-feature-in-nuxt.js",
      '/post/create-a-contact-card-barcode-generator-in-next.js',
      '/post/create-custom-video-ads-with-text-and-image-in-next.js',
    ];

    return [
      ...customPeriodRewrites.map((path) => ({
        source: `${path}(.*)`,
        destination: path.replace(/\./g, '-'),
        permanent: false,
      })),
      {
        source: '/post/:path*',
        destination: 'https://cloudinary.com/blog/guest_post/:path*',
        permanent: false,
      },
      {
        source: '/author/:path*',
        destination: 'https://cloudinary.com/blog/author/:path*',
        permanent: true,
      },
      {
        source: '/',
        destination: 'https://cloudinary.com/blog',
        permanent: true,
      },
      {
        source: '/docs/:path*',
        destination: 'https://cloudinary.com',
        permanent: true,
      },
    ];
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    // SVG LOADER
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  basePath,
};

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

/**
 * Export w/ defaultConfig
 */
// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withBundleAnalyzer(
  withSentryConfig(defaultConfig, SentryWebpackPluginOptions),
);
