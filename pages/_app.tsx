import { AppProps, AppContext } from "next/app";
import Page from "../components/Page";
import Providers from "./providers"; // Import the new Providers component

interface ExtendedPageProps extends AppProps {
  query?: Record<string, any>; // or another specific type you want
}
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Page>
        <Component {...pageProps} />
      </Page>
    </Providers>
  );
}

// MyApp.getInitialProps = async function ({ Component, ctx }: AppContext) {
//   let pageProps: ExtendedPageProps;

//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx);
//   }

//   // Assuming ctx.query is an object. Replace 'any' with a more specific type if possible.
//   pageProps.query = ctx.query;

//   return { pageProps };
// };

MyApp.getInitialProps = async function (appContext: AppContext) {
  const { Component, ctx } = appContext;

  let fetchedPageProps = {};

  if (Component.getInitialProps) {
    fetchedPageProps = await Component.getInitialProps(ctx);
  }

  // This is our ExtendedPageProps object
  const pageProps: ExtendedPageProps = {
    Component,
    router: appContext.router!,
    pageProps: {
      ...fetchedPageProps,
      query: ctx.query,
    },
  };

  return { pageProps };
};

export default MyApp;
