import React from "react";
import styled from "@emotion/styled";
import { ClassNames } from "@emotion/react";
import { LayoutProps } from "./types";
import { Column, Footer } from "../Footer/Footer";

import {
  Container,
  Content,
  CameraIcon,
  FacebookIcon,
  PlayIcon,
  CircleIcon,
  Logo
} from "./Layout.styles";

type LogoTypeFC = {
  imageFile: string;
  isDark?: boolean;
};

export const MyLogo = ({ imageFile, isDark }: LogoTypeFC) => (
  <Logo src={imageFile} isDark={isDark || false} />
);

const iconLinks = [
  {
    icon: <CameraIcon src={"/camera.png"} />,
    url: ""
  },
  {
    icon: <FacebookIcon src={"/facebook.png"} />,
    url: ""
  },
  {
    icon: <PlayIcon src={"/play.png"} />,
    url: ""
  },
  {
    icon: <CircleIcon src={"/circle.png"} />,
    url: ""
  }
];
const columns: Column[] = [
  {
    title: "Contact Info",
    descriptions: [
      "4920 S. Soto  St.\n" + "Vernon, CA, 90058",
      "+1 (310) 715-1370",
      "ecom@polclothing.com"
    ],
    iconLinks
  },
  {
    title: "Information",
    links: [
      {
        text: "accessibility statement",
        url: ""
      },
      {
        text: "CA Privacy Right",
        url: ""
      },
      {
        text: "Prop 65",
        url: ""
      },
      {
        text: "Rewards",
        url: ""
      },
      { text: "Returns / exchanges / damages", url: "/privacy" },
      { text: "Terms of Use & Privacy Policy", url: "/terms" },
      { text: "contact us", url: "/contact" }
    ]
  },
  {
    title: "My Account",
    links: [
      {
        text: "Customer Info",
        url: ""
      },
      { text: "Addresses", url: "" },
      { text: "Orders", url: "" },
      { text: "My Cart", url: "" },
      { text: "WishList", url: "" }
    ]
  },
  {
    title: "About Us",
    descriptions: [
      "POL Clothing is a wholesale supplier to boutiques all over the world. POL focuses on coming together at the crossroads of fashion and business and creating styles inspired by the world around us."
    ]
  }
];
// export const Container = styled.main`
//   flex: 1;
//   overflow: scroll;
//   scrollbar-width: none;
//   &::-webkit-scrollbar {
//     display: none;
//   }
// `;
// export const Content = styled.div`
//   flex: 1;
//   overflow: scroll;
// `;
export const Layout: React.FC<LayoutProps> = ({
  children
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  return (
    <Container>
      <Content>
        {children}
        <ClassNames>
          {({ css, cx }) => (
            <Footer
              classes={{
                root: css`
                  background-color: #000;
                `
              }}
              footerData={{
                logo: <MyLogo imageFile="/logo.png" isDark={false} />,
                columns,
                mobileIconLinks: iconLinks
              }}
            />
          )}
        </ClassNames>
      </Content>
    </Container>
  );
};
