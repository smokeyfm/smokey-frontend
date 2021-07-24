import React from "react";
import styled from "@emotion/styled";
import { ClassNames } from "@emotion/react";
import { LayoutProps } from "./types";
import { Column, Foot } from "../Foot/Foot";
import { pxIpone } from "../../utils";
const Logo = styled.img`
  width: 181px;
  height: auto;
  margin-bottom: 60px;
  @media (max-width: 375px) {
    width: ${pxIpone(80)};
    margin-bottom: 14.68vw;
    height: auto;
  }
  @media (max-width: 750px) {
  }
`;
const MyLogo: React.FC = () => <Logo src={"/LOGO.png"}></Logo>;
const CameraIcon = styled.img`
  width: 11px;
  height: auto;
  margin-right: 3.88px;
  @media (max-width: 375px) {
    width: 5.522vw;
    height: auto;
    margin-right: 2.069vw;
  }
  @media (max-width: 750px) {
    width: 5.522vw;
    height: auto;
    margin-right: 2.069vw;
  }
`;
const FacebookIcon = styled.img`
  width: 6.81px;
  height: auto;
  margin-right: 3.88px;
  @media (max-width: 375px) {
    width: 3.634vw;
    height: auto;
    margin-right: 2.069vw;
  }
  @media (max-width: 750px) {
    width: 3.634vw;
    height: auto;
    margin-right: 2.069vw;
  }
`;
const PlayIcon = styled.img`
  width: 12.29px;
  height: auto;
  margin-right: 3.88px;
  @media (max-width: 375px) {
    width: 6.557vw;
    height: auto;
    margin-right: 2.069vw;
  }
  @media (max-width: 750px) {
    width: 6.557vw;
    height: auto;
    margin-right: 2.069vw;
  }
`;
const CircleIcon = styled.img`
  width: 10.35px;
  height: auto;
  @media (max-width: 375px) {
    width: 5.522vw;
    height: auto;
  }
  @media (max-width: 750px) {
    width: 5.522vw;
    height: auto;
  }
`;
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
      { text: "Returns / exchanges / damages", url: "" },
      { text: "Terms of Use & Privacy Policy", url: "" },
      { text: "contact us", url: "" }
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
export const Container = styled.main`
  flex: 1;
  overflow: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const Content = styled.div`
  flex: 1;
  overflow: scroll;
`;
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
            <Foot
              classes={{
                root: css`
                  background-color: #000;
                `
              }}
              footerData={{ logo: <MyLogo />, columns, mobileIconLinks: iconLinks }}
            />
          )}
        </ClassNames>
      </Content>
    </Container>
  );
};
