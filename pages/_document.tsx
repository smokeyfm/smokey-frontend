import Document, { Html, Main, NextScript, Head, DocumentContext } from "next/document";
import uaParser from "ua-parser-js";
import { Context as ResponsiveContext, MediaQueryAllQueryable } from "react-responsive";
import * as React from "react";
import { ServerStyleSheets } from "@material-ui/core/styles";

const withResponsiveContext = (App: any, req: any) => {
  const contextValue = (() => {
    if (!req) {
      // it's a static render, when no req https://github.com/vercel/next.js/issues/7791
      return;
    }
    const { device } = uaParser(req.headers["user-agent"]);
    const isMobile = device.type === "mobile";
    return { width: isMobile ? 767 : 768 };
  })();
  return (props: any) =>
    typeof window !== "undefined" ? (
      <App {...props} />
    ) : (
      <ResponsiveContext.Provider value={contextValue as MediaQueryAllQueryable}>
        <App {...props} />
      </ResponsiveContext.Provider>
    );
};
class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        // useful for wrapping the whole react tree
        enhanceApp: (App) =>
          withResponsiveContext((props: any) => sheets.collect(<App {...props} />), ctx.req)
      });

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          {/* <title>{process.env.SITE_TITLE}</title> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
