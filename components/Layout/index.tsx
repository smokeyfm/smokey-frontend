import React from "react";
import HamburgerMenu from "../HamburgerMenu";

export const Layout = ({ children }) => {
  return (
      <div id={'outter-container'}>
          <HamburgerMenu outterContainerId={'outter-container'} pageWrapId={'page-wrap'} animationType={'fallDown'} right>
              <a id="home" className="menu-item" href="/">Home</a>
              <a id="about" className="menu-item" href="/about">About</a>
              <a id="contact" className="menu-item" href="/contact">Contact</a>
              <a  className="menu-item" href="">Settings</a>
          </HamburgerMenu>
    <main id={'page-wrap'} className={'page-wrap'} >
      {children}
      <style jsx global>{`
         .page-wrap{
         padding:4em 6em;
         height: 100%;
         background: #b4bad2;
         min-height: 100vh;
         }
         .menu-item{
         outline: none;
         }
        * {
          font-family: Menlo, Monaco, "Lucida Console", "Liberation Mono",
            "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Courier New",
            monospace, serif;
        }
        body {
          margin: 0;
          padding: 0 0;
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
      </div>
  );
};
