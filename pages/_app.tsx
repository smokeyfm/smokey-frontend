import * as React from "react";
import type { AppProps /*, AppContext */ } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "../config/auth";
import { MainMenu, Header, ComingSoon } from "../components";
import styled from "@emotion/styled";
import "swiper/swiper-bundle.min.css";
import { menusData } from "../components/MainMenu/data/menusData";
import "./app.css";
import { useRouter } from "next/router";
import * as tracking from "../config/tracking";

// Styles
import { ThemeProvider } from "@emotion/react";
import { theme } from "../styles/theme";
import { GlobalStyles } from "../styles/global-styles";
import { pxIphone } from "../utils";
import "../styles/fonts.css";
import "../public/fonts/black-tie/black-tie.css";
import "swiper/swiper.scss";
import "./app.css";

const queryClient = new QueryClient();
const CustomIcon = styled.img`
  width: ${pxIphone(37)};
  height: auto;
`;
export default function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  const router = useRouter();

  React.useEffect(() => {
    const handleRouteChange = (url: string) => {
      tracking.trackPageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const isMaint = process.env.IS_MAINT_MODE;

  const renderHomeContent = () => {
    if (isMaint && isMaint === "true") {
      return <ComingSoon />;
    }

    return (
      <>
        <Header />
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
        <Component {...pageProps} />
      </>
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            {renderHomeContent()}
          </ThemeProvider>
        </Hydrate>
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
