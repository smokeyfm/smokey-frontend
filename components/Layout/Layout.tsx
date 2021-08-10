import React from "react";
import { ClassNames } from "@emotion/react";
import { LayoutProps } from "./types";
import { Header } from "../../components";
import { Foot } from "../../components";
import { Column } from "../Foot/Foot";

import {
  Container,
  Content,
  CameraIcon,
  FacebookIcon,
  PlayIcon,
  CircleIcon,
  Logo
} from "./Layout.styles";

const MyLogo: React.FC = () => <Logo>POL</Logo>;

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
      "4920 S.Soto  St.\n" + "Vernon, CA,90058",
      "+1(310)715-1370",
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

export const Layout: React.FC<LayoutProps> = ({
  children
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  return (
    <>
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
    </>
  );
};
