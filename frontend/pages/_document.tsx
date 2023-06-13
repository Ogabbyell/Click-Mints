import { Html, Head, Main, NextScript } from 'next/document'
import Navbar from '../components/navbar';


function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Navbar />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
