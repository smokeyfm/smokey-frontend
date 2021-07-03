import * as React from "react";
import type { AppProps /*, AppContext */ } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "../config/auth";
import { MobileMenu } from "../components";
import PageHeader from "../components/PageHeader";
import "swiper/swiper-bundle.min.css";
import { menusData } from "../components/MobileMenu/data/menusData";

// Styles
import { ThemeProvider } from "@emotion/react";
import { theme } from "../styles/theme";
import { GlobalStyles } from "../styles/global-styles";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <PageHeader />
            <MobileMenu
              pcMenuItemClassName={"pc-menu-item"}
              outterContainerId={"outter-container"}
              pageWrapId={"page-wrap"}
              animationType={"slide"}
              menusData={menusData}
              right={false}></MobileMenu>
            <Component {...pageProps} />
          </ThemeProvider>
        </Hydrate>
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
