import { setConfig } from 'next/config';
import config from './next.config';
// Make sure you can use "publicRuntimeConfig" within tests.
setConfig(config);

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

// helpers
global.sleep = function (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Copied over from example.
// https://github.com/HospitalRun/components/pull/117/commits/210d1b74e4c8c14e1ffd527042e3378bba064ed8
window.matchMedia = jest.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // deprecated
  removeListener: jest.fn(), // deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

// Specificlly to address Next/Image
// https://github.com/vercel/next.js/discussions/18373
process.env = {
  ...process.env,
  __NEXT_IMAGE_OPTS: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [],
    domains: ['res.cloudinary.com'],
    path: '/_next/image',
    loader: 'default',
  },
};
