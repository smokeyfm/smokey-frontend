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
    const OpenGraphObject = `
      "@context": "http://schema.org",
      "@type": "Organization",
      "url": "http://dna.instinct.is",
      "contactPoint": [{
        "@type": "ContactPoint",
        "telephone": "+1-917-300-8103",
        "contactType": "General Inquiry"
      }]
    `;

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
          <meta charSet="utf-8" />
          <link rel="icon" href="/img/favicon.ico" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0, minimal-ui"
          />
          <title>{process.env.PAGE_TITLE}</title>
          <meta name="description" content="The Building Blocks of Material Instincts" />
          <meta name="keywords" content="" /> /
          <meta name="robots" content="noodp" />
          <link rel="canonical" href="http://dna.instinct.is" /> /
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Instinct DNA – The Building Blocks of Material Instincts"
          />
          <meta property="og:description" content="" />
          <meta property="og:url" content="http://dna.instinct.is" />
          <meta property="og:site_name" content="Instinct DNA" />
          <meta property="article:publisher" content="https://www.facebook.com/materialinstinct/" />
          <meta property="article:section" content="General" />
          <meta property="article:published_time" content="2017-09-11T15:00:03-04:00" />
          <meta property="og:image" content="public/img/open-graph-instinct-dna.jpg" />
          <meta property="og:image:width" content="406" />
          <meta property="og:image:height" content="406" />
          <script src="https://js.stripe.com/v3/" type="text/javascript"></script>
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:description" content="The Building Blocks of Material Instincts" />
          <meta name="twitter:title" content="Instinct DNA" />
          <meta name="twitter:site" content="http://dna.instinct.is" />
          <meta
            name="twitter:image"
            content="http://dna.instinct.is/img/open-graph-instinct-dna.jpg"
          />
          <meta name="twitter:creator" content="@aaronsmulktis" />
          <link rel="pingback" href="http://dna.instinct.is" />
          <link
            href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css"
            rel="stylesheet"
            type="text/css"
          />
          <script type="application/ld+json">{OpenGraphObject}</script>

          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDUqxah2mT_0iaosOBBSIKRy0lw7f6wdLA&libraries=places" />
          {/* <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-75328739-1', 'auto');
            ga('send', 'pageview');

              var _giphy_tv_tag="smoke";
            var g = document.createElement('script');
            g.type = 'text/javascript';
            g.async = true;
            g.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'giphy.com/static/js/widgets/tv.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(g, s);
          </script> */}
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
