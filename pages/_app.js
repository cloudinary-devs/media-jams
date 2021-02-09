import React from 'react';
import { MixPanelProvider } from '@lib/mixpanel';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@theme';
import { DefaultSeo } from 'next-seo';
import { UserProvider, useUser } from '@lib/user';
import { buildImageUrl } from 'cloudinary-build-url';

import { initSentry } from '@lib/sentry';
//initialize Sentry
initSentry();

const App = ({ Component, pageProps, err }) => {
  const { user, loading } = useUser();
  const ogImage = buildImageUrl('mediajams/og-image', {
    cloud: { cloudName: 'mediadevs' },
  });

  React.useEffect(() => {}, []);
  return (
    <MixPanelProvider>
      <ChakraProvider resetCSS theme={theme}>
        <UserProvider value={{ user, loading }}>
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
        </UserProvider>
      </ChakraProvider>
    </MixPanelProvider>
  );
};

export default App;
