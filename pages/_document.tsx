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
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://instinct.is";
    const siteTitle =
      process.env.NEXT_PUBLIC_PAGE_TITLE ||
      process.env.NEXT_PUBLIC_SITE_TITLE ||
      "Instinct";
    const siteDesc =
      process.env.NEXT_PUBLIC_PAGE_DESC ||
      process.env.NEXT_PUBLIC_SITE_DESC ||
      "Instinct is a digital agency that helps brands and businesses create meaningful relationships with their customers.";
    const sitePhone = process.env.NEXT_PUBLIC_PHONE || "+1-917-300-8103";
    const ogImgPath =
      process.env.NEXT_PUBLIC_OG_IMG_PATH ||
      "/images/open-graph-instinct-dna.png";
    const ogImgWidth = process.env.NEXT_PUBLIC_OG_IMG_WIDTH || "600";
    const ogImgHeight = process.env.NEXT_PUBLIC_OG_IMG_HEIGHT || "529";
    const twitterSlug = process.env.NEXT_PUBLIC_TWITTER_SLUG || "aaronsmulktis";
    const facebookSlug =
      process.env.NEXT_PUBLIC_FACEBOOK_SLUG || "materialinstinct";

    const OpenGraphObject = `
      "@context": "http://schema.org",
      "@type": "Organization",
      "url": "https://${process.env.NEXT_PUBLIC_APP_URL},
      "contactPoint": [{
        "@type": "ContactPoint",
        "telephone": "${sitePhone}",
        "contactType": "General Inquiry"
      }]
    `;

    const FacebookPixelObject = `
      <!-- Meta Pixel Code -->
      <script>
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${tracking.FB_PIXEL_ID}');
      fbq('track', 'PageView');
      </script>
      <noscript><img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=${tracking.FB_PIXEL_ID}&ev=PageView&noscript=1"
      /></noscript>
      <!-- End Meta Pixel Code -->
    `;

    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content={siteDesc} />
          <meta name="keywords" content="" />
          <meta name="robots" content="noodp" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={process.env.NEXT_PUBLIC_PAGE_TITLE} />
          <meta property="og:site_name" content={process.env.NEXT_PUBLIC_SITE_TITLE} />
          <meta property="og:description" content={process.env.NEXT_PUBLIC_PAGE_DESC} />
          <meta property="og:url" content={process.env.NEXT_PUBLIC_APP_URL} />
          <meta property="article:publisher" content={process.env.NEXT_PUBLIC_FACEBOOK_URL} />
          <meta property="article:section" content="General" />
          <meta property="article:published_time" content="2017-04-15T15:00:03-04:00" />
          {/* CHANGEME */}
          <meta property="og:image" content="public/img/open-graph-instinct-dna.jpg" />
          <meta property="og:image:width" content="406" />
          <meta property="og:image:height" content="406" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:description" content={process.env.NEXT_PUBLIC_PAGE_DESC} />
          <meta name="twitter:title" content={process.env.NEXT_PUBLIC_SITE_TITLE} />
          <meta name="twitter:site" content={process.env.NEXT_PUBLIC_APP_URL} />
          {/* CHANGEME */}
          <meta
            name="twitter:image"
            content={`${process.env.NEXT_PUBLIC_APP_URL}/img/open-graph-instinct-dna.jpg`}
          />

          <meta name="twitter:creator" content={`@${twitterSlug}`} />

          <link rel="icon" href="/img/favicon.ico" />
          <link rel="canonical" href={process.env.NEXT_PUBLIC_APP_URL} />
          <link rel="pingback" href={process.env.NEXT_PUBLIC_APP_URL} />
          <link
            href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css"
            rel="stylesheet"
            type="text/css"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          ></link>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <script type="application/ld+json">{OpenGraphObject}</script>
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
          <script src="https://js.stripe.com/v3/" type="text/javascript"></script>
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
                  'send_page_view': true,
                  'debug_mode': ${tracking.GA_DEBUG_MODE},
                });
              `
            }}
          />
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDUqxah2mT_0iaosOBBSIKRy0lw7f6wdLA&libraries=places" />
          <script dangerouslySetInnerHTML={{ __html: FacebookPixelObject }} />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${tracking.FB_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
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
