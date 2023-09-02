import React from "react";
import { Global, css } from "@emotion/react";

export const GlobalStyles = () => (
  <Global
    styles={css`
      @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");

      html {
        overflow: hidden;
        width: 100%;
        height: 100%;
      }

      body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        text-rendering: auto;
        // -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-display: swap;
        font-smooth: 2em;
      }

      #__next {
        margin: 0;
        padding: 0;
      }

      a {
        cursor: pointer;
        color: #22bad9;
      }

      p {
        margin: 10px 0px 20px;
      }

      article {
        margin: 0 auto;
        max-width: 650px;
      }

      svg {
        margin: 0;
      }

      select {
        font-size: 28.95px;
        line-height: 34.74px;
        border: 2px solid #000000;
        box-sizing: border-box;
        transition: background-color 0.3s;
        width: 100%;
        max-width: 400px;
        text-transform: uppercase;
        text-align-last: center;
        background: url("https://cdn1.iconfinder.com/data/icons/pinpoint-action/48/arrow-dropdown-24.png")
          no-repeat 95% 50%;
        padding: 10px 10px;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
      }

      select:active,
      select:focus {
        outline: none;
      }

      button {
        background-color: #eb8b8b;
        border: 0;
        color: white;
        width: 100%;
        max-width: 400px;
        font-size: 29.24px;
        line-height: 35.09px;
        font-weight: bold;
        padding: 10px 10px;
        cursor: pointer;
      }

      button:active {
        background-color: #f75b5b;
      }

      button:focus,
      .size-selection button:focus {
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
      .bm-overlay {
        top: 0;
      }
    `}
  />
);
