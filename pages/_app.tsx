import * as React from "react";
import type { AppProps /*, AppContext */ } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "../config/auth";
import { MobileMenu } from "../components";
import PageHeader from "../components/PageHeader";
import styled from "@emotion/styled";
import "swiper/swiper-bundle.min.css";
import { menusData } from "../components/MobileMenu/data/menusData";
import "./app.css"

// Styles
import { ThemeProvider } from "@emotion/react";
import { theme } from "../styles/theme";
import { GlobalStyles } from "../styles/global-styles";
import { pxIpone } from "../utils";

const queryClient = new QueryClient();
const CustomIcon = styled.img`
  width: ${pxIpone(37)};
  height: auto;
`;
const MenuFooter = styled.div`
  position: fixed;
  bottom: 0;
`;
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
              menuFooter={() => (
                <MenuFooter>
                  <div>Privacy Policy - Terms & Conditions - RETURN POLICY</div>
                  <div>All Materials Copyright © 2021 POL Clothing</div>
                </MenuFooter>
              )}
              showMenuHeader={true}
              customBurgerIcon={<CustomIcon src={"/BURGER.png"} />}
              pcMenuItemClassName={"pc-menu-item"}
              pcWrapClassName={'pc-wrap'}
              outterContainerId={"outter-container"}
              pageWrapId={"page-wrap"}
              animationType={"slide"}
              menusData={menusData}
              right={false}>

            </MobileMenu>
            <Component {...pageProps} />
          </ThemeProvider>
        </Hydrate>
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
