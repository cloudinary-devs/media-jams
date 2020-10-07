import * as Fathom from 'fathom-client';
import { Router } from 'next/router';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

// Record a pageview when route changes
export const fathomRouteChange = () => {
  return Router.events.on('routeChangeComplete', (url) => {
    console.info('Route updated: ', url);
    Fathom.trackPageview();
  });
};
export const fathomRouteCleanup = () => {
  Router.events.off('routeChangeComplete');
};
export const fathomAnalyticsInit = () => {
  // Initialize Fathom when the app loads
  Fathom.load(publicRuntimeConfig.fathomSiteId, {
    includedDomains: publicRuntimeConfig.fathomIncludedDomains,
  });
};
