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
import { SidePanelProvider } from '@components/SidePanelProvider';
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

  const ogImage = buildImageUrl('mediajams/open-graph-base.jpg', {
    cloud: { cloudName: 'mediadevs' },
  });

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);
  const { user, nav } = pageProps;

  return (
    <MixPanelProvider>
      <ChakraProvider resetCSS theme={theme}>
        <QueryClientProvider client={queryClientRef.current}>
          <Hydrate state={pageProps.dehydratedState}>
            <UserProvider user={user}>
              <SidePanelProvider nav={nav}>
                <DefaultSeo
                  title="Front End Developer Companion to Rich Media"
                  description="Media Jams offer numerous useful examples through which developers can sharpen their expertise in leveraging media for apps and tech stacks"
                  url="www.mediajams.dev"
                  openGraph={{
                    url: 'www.mediajams.dev',
                    title: 'Putting Media to work is hard',
                    description: '',
                    images: [
                      {
                        url: ogImage,
                        width: 1200,
                        height: 630,
                        alt:
                          'Discover Top practices and tools applying media technology with Media Jams',
                      },
                    ],
                    siteName: 'MediaJams',
                  }}
                />
                {getLayout(<Component {...pageProps} err={err} />)}
                <ReactQueryDevtools initialIsOpen={false} />
              </SidePanelProvider>
            </UserProvider>
          </Hydrate>
        </QueryClientProvider>
      </ChakraProvider>
    </MixPanelProvider>
  );
};

export default App;
