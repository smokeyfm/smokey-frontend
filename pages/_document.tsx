import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta charset="utf-8" />
          <link rel="icon" href="/img/favicon.ico">
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0, minimal-ui">
          <title>DNA Frontend - Instinct.is</title>
          <meta name="description" content="The Building Blocks of Material Instincts">
          <meta name="keywords" content="">

          <meta name="robots" content="noodp">
          <link rel="canonical" href="http://dna.instinct.is">

          <!-- Article -->
          <meta property="og:locale" content="en_US">
          <meta property="og:type" content="website">
          <meta property="og:title" content="Instinct DNA – The Building Blocks of Material Instincts">
          <meta property="og:description" content="">
          <meta property="og:url" content="http://dna.instinct.is">
          <meta property="og:site_name" content="Instinct DNA">
          <meta property="article:publisher" content="https://www.facebook.com/materialinstinct/">
          <meta property="article:section" content="General">
          <meta property="article:published_time" content="2017-09-11T15:00:03-04:00">
          <meta property="og:image" content="public/img/open-graph-instinct-dna.jpg">
          <meta property="og:image:width" content="406">
          <meta property="og:image:height" content="406">

          <script src="https://js.stripe.com/v3/" type="text/javascript"></script>

          <meta name="twitter:card" content="summary">
          <meta name="twitter:description" content="The Building Blocks of Material Instincts">
          <meta name="twitter:title" content="Instinct DNA">
          <meta name="twitter:site" content="http://dna.instinct.is">
          <meta name="twitter:image" content="http://dna.instinct.is/img/open-graph-instinct-dna.jpg">
          <meta name="twitter:creator" content="@aaronsmulktis">

          <link rel="pingback" href="http://dna.instinct.is" />

          <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css">

          <script type="application/ld+json">
            {
              "@context": "http://schema.org",
              "@type": "Organization",
              "url": "http://dna.instinct.is",
              "contactPoint": [{
                "@type": "ContactPoint",
                "telephone": "+1-917-300-8103",
                "contactType": "General Inquiry"
              }]
            }
          </script>

          <script>
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
          </script>
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
