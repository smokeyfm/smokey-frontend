import React from "react";
import { Global, css } from '@emotion/react'                                                                                                                                                                                                                                                                                       
export const Layout = ({ children }) => {
  return (
    <main>
      {children}
      <Global
      styles={css`
      @font-face {
        font-family:'james';
        src: url('fonts/JamesFajardo.eot');
        src: url('fonts/JamesFajardo.eot?#iefix') format('embedded-opentype'),
            //  url('fonts/JamesFajardo.woff2') format('woff2'),
             url('fonts/JamesFajardo.woff') format('woff'),
             url('fonts/JamesFajardo.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
      body {
        margin: 0;
        // padding: 25px 50px;
        padding: 1px 0px;
        //background: url(img/stars.png);
        //background-repeat: no-repeat;
        //background-size: cover;
        // animation:spin 30s linear infinite;
    
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
      `}
    />
    </main>
  );
};
