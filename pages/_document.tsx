import Document, { Html, Main, NextScript, Head, DocumentContext } from "next/document";
import uaParser from "ua-parser-js";
import { Context as ResponsiveContext, MediaQueryAllQueryable } from "react-responsive";
import * as React from "react";
import { ServerStyleSheets } from "@material-ui/core/styles";
import * as tracking from "../config/tracking";

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
    const sheet = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          // useful for wrapping the whole react tree
          enhanceApp: (App) =>
            withResponsiveContext((props: any) => sheet.collect(<App {...props} />), ctx.req)
        });

      // Run the parent `getInitialProps`, it now includes the custom `renderPage`
      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      Object.seal(sheet);
    }
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
          <script
            async
            src={"https://www.googletagmanager.com/gtag/js?id=" + tracking.GA_TRACKING_CODE}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', "${tracking.GA_TRACKING_CODE}", {
                  'send_page_view': false,
                  'debug_mode': ${tracking.GA_DEBUG_MODE},
                });
              `
            }}
          />
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
