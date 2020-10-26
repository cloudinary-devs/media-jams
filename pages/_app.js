import { MixPanelProvider } from '../lib/mixpanel';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

import { ChakraProvider } from '@chakra-ui/core';
import theme from '@theme';
import { DefaultSeo } from 'next-seo';

const App = ({ Component, pageProps }) => {
  React.useEffect(() => {}, []);
  return (
    <MixPanelProvider>
      <ChakraProvider resetCSS theme={theme}>
        <DefaultSeo
          title="Nextjs + MDX Starter pack"
          description="This is an opinionated way to handle MDX from multiple sources in a Next project with some help styling from ChakraUI"
          url="www.whatever.com"
          ogImage={{
            url: 'www.whatever.com',
            title: 'OG Image title',
            description: 'Describe the OG image',
            image: ``,
            siteName: 'Your site name',
          }}
          twitter={{
            handle: '@domitriusclark',
            site: 'https://twitter.com/domitriusclark',
          }}
        />
        <Component {...pageProps} />
      </ChakraProvider>
    </MixPanelProvider>
  );
};

export default App;
