import React from 'react';
import { useRouter } from 'next/router';
import { MixPanelProvider, pageView } from '@lib/mixpanel';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import theme from '@theme';
import { DefaultSeo } from 'next-seo';
import { UserProvider } from '@auth0/nextjs-auth0';
import { buildImageUrl } from 'cloudinary-build-url';
import Layout from '@components/Layout';

// Fonts Import
import '@fontsource/dm-sans/700.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/montserrat/400.css';

// Initialize Sentry Error Tracking
import { initSentry } from '@lib/sentry';
initSentry();

// Create a new query client
const App = ({ Component, pageProps, err }) => {
  const queryClientRef = React.useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  const router = useRouter();
  // trigger pageView analytics on router events
  React.useEffect(() => {
    const handleRouteChange = (err, url) => {
      if (err.cancelled) return null;
      pageView(router.pathname, router.query);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const ogImage = buildImageUrl('mediajams/og-image', {
    cloud: { cloudName: 'mediadevs' },
  });

  const { user } = pageProps;

  return (
    <MixPanelProvider>
      <ChakraProvider resetCSS theme={theme}>
        <QueryClientProvider client={queryClientRef.current}>
          <Hydrate state={pageProps.dehydratedState}>
            <UserProvider user={user}>
              <DefaultSeo
                title="Front End Developer Companion to Rich Media"
                description="Media Jams offer numerous useful examples through which developers can sharpen their expertise in leveraging media for apps and tech stacks"
                url="www.mediajams.dev"
                ogImage={{
                  url: 'www.mediajams.dev',
                  title: 'Putting Media to work is hard',
                  description: '',
                  image: ogImage,
                  siteName: 'MediaJams',
                }}
              />
              <Layout>
                <Component {...pageProps} err={err} />
              </Layout>
              <ReactQueryDevtools initialIsOpen={false} />
            </UserProvider>
          </Hydrate>
        </QueryClientProvider>
      </ChakraProvider>
    </MixPanelProvider>
  );
};

export default App;
