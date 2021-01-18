import React from 'react';
import { MixPanelProvider } from '@lib/mixpanel';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@theme';
import { DefaultSeo } from 'next-seo';
import { UserProvider, useUser } from '@lib/user';
import { useImage } from 'use-cloudinary';

const App = ({ Component, pageProps }) => {
  const { user, loading } = useUser();
  const { generateImageUrl } = useImage('mediadevs');

  // this doesn't exist in our cloudinary yet, but will plugin once it does
  const ogImageConfig = {
    delivery: {
      publicId: 'mediajams/og-image',
    },
  };

  React.useEffect(() => {}, []);
  return (
    <MixPanelProvider>
      <ChakraProvider resetCSS theme={theme}>
        <UserProvider value={{ user, loading }}>
          <DefaultSeo
            title="MediaJams"
            description="A developers' premier resource for using media in web and mobile apps"
            url="www.mediajams.dev"
            ogImage={{
              url: 'www.mediajams.dev',
              title: 'Putting Media to work is hard',
              description: '',
              image: generateImageUrl(ogImageConfig),
              siteName: 'MediaJams',
            }}
          />
          <Component {...pageProps} />
        </UserProvider>
      </ChakraProvider>
    </MixPanelProvider>
  );
};

export default App;
