import { AppProps, AppContext } from "next/app";
import Page from "../components/Page";
import Providers from "./providers"; // Import the new Providers component

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Page>
        <Component {...pageProps} />
      </Page>
    </Providers>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }: AppContext) {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  // Assuming ctx.query is an object. Replace 'any' with a more specific type if possible.
  pageProps.query = ctx.query;

  return { pageProps };
};

export default MyApp;
