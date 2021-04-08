import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';

class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Bangers&family=Roboto&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <ColorModeScript defaultMode="system" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
