import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel="icon" href="/img/favicon.ico" />
          <meta charset="utf-8" />
          <meta name="description" content="⚕Original video radio by Aaron Smulktis" />
          <meta name="keywords" content="" />

          <meta name="robots" content="noodp" />
          <link rel="canonical" href="http://smokey.fm" />

          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Smokey.FM ⚕Original video radio by Aaron Smulktis" />
          <meta property="og:description" content="" />
          <meta property="og:url" content="http://smokey.fm" />
          <meta property="og:site_name" content="Smokey.FM" />
          <meta property="article:publisher" content="https://www.facebook.com/@by.smokey.fm/" />
          <meta property="article:section" content="General" />
          <meta property="article:published_time" content="2017-04-13T15:00:03-04:00" />
          <meta property="og:image" content="public/img/open-graph-smokey-fm.png" />
          <meta property="og:image:width" content="630" />
          <meta property="og:image:height" content="1200" />

          <script src="https://js.stripe.com/v3/" type="text/javascript"></script>

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:description" content="⚕Original video radio by Aaron Smulktis" />
          <meta name="twitter:title" content="Smokey.FM" />
          <meta name="twitter:site" content="http://smokey.fm" />
          <meta name="twitter:image" content="http://smokey.fm/img/open-graph-smokey-fm.png" />
          <meta name="twitter:creator" content="@_smokeyfm_" />

          <link rel="pingback" href="http://smokey.fm" />

          <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css" />

          <script dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TFJC7L3');`,
          }}>
          </script>

          {/* <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-75328739-1', 'auto');
            ga('send', 'pageview');
          </script> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
