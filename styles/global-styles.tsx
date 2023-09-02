import React from "react";
import { Global, css } from "@emotion/react";

export const GlobalStyles = () => (
  <>
    <Global
      styles={css`
        html {
          overflow: hidden;
          width: 100%;
          height: 100%;
        }
        body {
          font-family: "Roboto Condensed";
          font-size: "14px";
          line-height: "16px";
          background: white;
          background-blend-mode: overlay;
          background-size: cover;
          background-position: center;
          color: hotpink !important;
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
        }
        /* * {
          font-family: Menlo, Monaco, "Lucida Console", "Liberation Mono", "DejaVu Sans Mono",
            "Bitstream Vera Sans Mono", "Courier New", monospace, serif;
        } */
        #__next {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
        }

        a {
          cursor: pointer;
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
        i {
          color: #000;
        }
        .pc-menu-item {
          color: #000;
          font-family: "Bebas Neue";
          font-size: 14px;
          margin-right: 82px !important;
        }
        .pc-menu-wrap {
          padding-bottom: 30px !important;
        }
        #__next {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }
      `}
    />
  </>
);
