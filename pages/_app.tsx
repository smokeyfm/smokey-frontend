import React, { useEffect, useState } from "react";
import type { AppProps /*, AppContext */ } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "../config/auth";
import { MainMenu, Header, ComingSoon } from "../components";
import styled from "@emotion/styled";
import "swiper/swiper-bundle.min.css";
import { menusData } from "../components/MainMenu/data/menusData";
import "./app.css";
import { useRouter } from "next/router";
import Head from "next/head";
import * as tracking from "../config/tracking";

// Styles
import { ThemeProvider } from "@emotion/react";
import { theme } from "../styles/theme";
import { GlobalStyles } from "../styles/global-styles";
import { pxIphone } from "../utils";
import "../styles/fonts.css";
import "../public/fonts/black-tie/black-tie.css";
import "swiper/swiper.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../components/Terms/ElectronicSignaturesModal.css";
import "../components/Terms/FinancialPrivacyModal.css";
import "./app.css";

import { AppWrapper } from "./_app.styles";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [wholesale, setWholesale] = useState(true);
  const router = useRouter();
  const isMaint = process.env.IS_MAINT_MODE;

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      tracking.trackPageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const renderContent = (theme: any) => {
    // const darkMode = (process.env.IS_DARK_MODE === "true");
    const darkMode = theme.isDarkMode ? theme.isDarkMode : false;

    if (isMaint && isMaint === "true") {
      return <ComingSoon />;
    }

    return (
      <AppWrapper>
        <Header darkMode={darkMode} />
        <MainMenu
          showMenuHeader
          customBurgerIcon={<i className="btb bt-bars" />}
          pcMenuItemClassName={"pc-menu-item"}
          pcWrapClassName={"pc-menu-wrap"}
          outterContainerId={"outter-container"}
          pageWrapId={"page-wrap"}
          animationType={"slide"}
          menusData={menusData}
          right={false}
        />
        <Component {...pageProps} wholesale={wholesale} />
      </AppWrapper>
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme}>
            <GlobalStyles theme={theme} />
            <Head>
              <title>{process.env.PAGE_TITLE}</title>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0, minimal-ui"
              />
            </Head>
            {renderContent(theme)}
          </ThemeProvider>
        </Hydrate>

        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
