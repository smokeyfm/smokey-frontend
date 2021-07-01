import React from "react";
import { LayoutProps } from "./types";
import { MobileMenu, Footer } from "../../components";
import { menusData } from "../MobileMenu/data/menusData";

export const Layout: React.FC<LayoutProps> = ({
  children
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  return (
    <main>
      <MobileMenu
        pcMenuItemClassName={"pc-menu-item"}
        outterContainerId={"outter-container"}
        pageWrapId={"page-wrap"}
        animationType={"slide"}
        menusData={menusData}
        right={false}></MobileMenu>
      {children}
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
    </main>
  );
};
