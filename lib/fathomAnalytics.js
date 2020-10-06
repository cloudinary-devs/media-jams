import * as Fathom from 'fathom-client';
import getConfig from 'next/config';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
export const fathomAnalytics = (router) => {
  // Initialize Fathom when the app loads
  Fathom.load(publicRuntimeConfig.fathomSiteId, {
    includedDomains: publicRuntimeConfig.fathomIncludedDomains,
  });

  function onRouteChangeComplete() {
    Fathom.trackPageview();
  }
  // Record a pageview when route changes
  router.events.on('routeChangeComplete', onRouteChangeComplete);

  // Unassign event listener
  return () => {
    router.events.off('routeChangeComplete', onRouteChangeComplete);
  };
};
