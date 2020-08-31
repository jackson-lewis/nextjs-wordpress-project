import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <Html lang="en-GB">
        <Head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link href="https://fonts.gstatic.com/" rel="preconnect"></link>
            <link href="https://fonts.gstatic.com/" rel="dns-prefetch"></link>
            <link rel="preload" href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;600&display=swap" as="style" onLoad="this.onload=null;this.rel='stylesheet'"></link>
            {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}