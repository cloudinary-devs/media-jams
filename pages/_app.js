import React from 'react';
import { MixPanelProvider } from '@lib/mixpanel';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import theme from '@theme';
import { DefaultSeo } from 'next-seo';
import { UserProvider } from '@auth0/nextjs-auth0';
import { buildImageUrl } from 'cloudinary-build-url';

//initialize Sentry
import { initSentry } from '@lib/sentry';
initSentry();

// Create a new query client
const App = ({ Component, pageProps, err }) => {
  const queryClientRef = React.useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

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
              <Component {...pageProps} err={err} />
              <ReactQueryDevtools initialIsOpen={false} />
            </UserProvider>
          </Hydrate>
        </QueryClientProvider>
      </ChakraProvider>
    </MixPanelProvider>
  );
};

export default App;
