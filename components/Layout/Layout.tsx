import React from "react";
import { LayoutProps } from "./types";
import { MobileMenu, Footer } from "../../components";

export const Layout: React.FC<LayoutProps> = ({
  children
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  return (
    <main>
      <MobileMenu
        outterContainerId={"outter-container"}
        pageWrapId={"page-wrap"}
        animationType={"slide"}
        right>
        <a id="home" className="menu-item" href="/">
          Home
        </a>
        <a id="about" className="menu-item" href="/about">
          About
        </a>
        <a id="contact" className="menu-item" href="/contact">
          Contact
        </a>
        <a className="menu-item" href="">
          Settings
        </a>
      </MobileMenu>
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
      <style jsx global>{`
        * {
          font-family: Menlo, Monaco, "Lucida Console", "Liberation Mono", "DejaVu Sans Mono",
            "Bitstream Vera Sans Mono", "Courier New", monospace, serif;
        }
        body {
          margin: 0;
          padding: 0;
        }

        a {
          color: #22bad9;
        }
        p {
          font-size: 14px;
          line-height: 24px;
        }
        article {
          margin: 0 auto;
          max-width: 650px;
        }
        button {
          align-items: center;
          background-color: #22bad9;
          border: 0;
          color: white;
          display: flex;
          padding: 5px 7px;
          transition: background-color 0.3s;
        }
        button:active {
          background-color: #1b9db7;
        }
        button:disabled {
          background-color: #b5bebf;
        }
        button:focus {
          outline: none;
        }
      `}</style>
    </main>
  );
};