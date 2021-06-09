import * as React from "react";
import type { AppProps /*, AppContext */ } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";
import { Header } from "../components";

// Styles
import { ThemeProvider } from "@emotion/react";
import { theme } from "../styles/theme";
import { GlobalStyles } from "../styles/global-styles";
import { MainMenu, Footer } from "../components";
import { BurgerIconStyles } from "../components/MainMenu/types/BurgerIconProps";
import AccountBalanceOutlinedIcon from "@material-ui/icons/AccountBalanceOutlined";
import HomeIcon from "@material-ui/icons/Home";
import { menuItem } from "../components/MainMenu/types";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);
  const menusdata = [
    {
      name: "home",
      key: "home",
      icon: () => <HomeIcon style={{ color: "#fff", fontSize: "25px" }} />,
      children: [
        {
          icon: () => (
            <AccountBalanceOutlinedIcon
              style={{ marginRight: "10px", color: "#fff", fontSize: "25px" }}
            />
          ),
          name: "home-sub1",
          key: "home-sub1"
        },
        { name: "home-sub2", key: "home-sub2" }
      ]
    },
    { name: "contact", key: "contact", children: [{ name: "contact-sub1", key: "contact-sub1" }] },
    { name: "setting", key: "setting", children: [{ name: "setting-sub1", key: "setting-sub1" }] }
  ];
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Header />
          <MainMenu
            pcWrapClassName={"pcWrap"}
            pcMenuItemClassName={"pcMenuItem"}
            menusData={menusdata}
            outterContainerId={"__next"}
            styles={{ bmMenuWrap: { top: 0, backgroundColor: "#ccc" } } as BurgerIconStyles}
            pageWrapId={"page-wrap"}
            animationType={"slide"}
            onMenuItemClick={(keypath, key) => {
              console.log("kp", keypath);
              console.log("key", key);
            }}
            right={false}></MainMenu>
          <div id={"page-wrap"}>
            <Component {...pageProps} />
            <Footer
              showContact={true}
              showLegal={true}
              showSocial={true}
              styles={{ color: "#000", backgroundColor: "#183558", padding: "100px 0" }}
              links={[
                {
                  type: "legal",
                  text: "hello world",
                  url: "http://localhost:3000",
                  icon: () => <i className="fa fa-facebook-official icon" aria-hidden="true"></i>
                },
                {
                  type: "contact",
                  text: "hello world",
                  url: "http://localhost:3000",
                  icon: () => <i className="fa fa-facebook-official icon" aria-hidden="true"></i>
                },
                {
                  type: "social",
                  text: "hello world",
                  url: "http://localhost:3000",
                  icon: () => <i className="fa fa-facebook-official icon" aria-hidden="true"></i>
                },
                {
                  type: "social",
                  text: "hello world",
                  url: "http://localhost:3000",
                  icon: () => <i className="fa fa-facebook-official icon" aria-hidden="true"></i>
                },
                {
                  type: "social",
                  text: "hello world",
                  url: "http://localhost:3000",
                  icon: () => <i className="fa fa-facebook-official icon" aria-hidden="true"></i>
                }
              ]}
            />
            <style jsx>{`
              .icon {
                margin-right: 10px;
              }
            `}</style>
            <style jsx global>
              {`
                .pcWrap {
                  padding: 10px 0px 10px 100px;
                  background-color: #5788ff;
                  width: 100%;
                  height: 80px;
                }
                .pcMenuItem {
                  margin-right: 30px;
                  color: #fff;
                  height: 80px;
                  font-size: 30px;
                  position: relative;
                }
              `}
            </style>
          </div>
        </ThemeProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
